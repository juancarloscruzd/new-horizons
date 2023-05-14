# Pasos para setup del ambiente

## 1. Crear la instancia de RDS
* Instanciar una base de datos RDS MySQL 5.7 con acceso público
* Copiar el usuario, password y endpoint
* Conectar a la base de datos a través de cliente MySQL y crear la base de datos ```newhorizons```
```sql
CREATE DATABASE newhorizons;
```

## 2. Ajustar la configuración de los servicios
Reemplazar el RDS_ENDPOINT y el RDS_PASSWORD de la instanacia de RDS en el archivo ```./src/main/resources/application-prod.yml``` de cada servicio

## 2. Construir las imagenes 

### employees
Instalar Maven, JDK previamente
```bash
cd ./employees
mvn clean install
docker build -t employees .
docker tag employees juancarloscruzd/employees
docker push juancarloscruzd/employees
```

### terms
```bash
cd ./terms
mvn clean install
docker build -t terms .
docker tag terms juancarloscruzd/terms
docker push juancarloscruzd/terms
```

### products
```bash
cd ./products
mvn clean install
docker build -t products .
docker tag products juancarloscruzd/products
docker push juancarloscruzd/products
```

### web-client
Instalar Node v16 previamente
```bash
cd ./web-client
yarn run build
docker build -t web-client .
docker tag web-client juancarloscruzd/web-client
docker push juancarloscruzd/terms
```
En este caso, estamos usando una configuración de proxy_pass con nginx para evitar problemas de CORS entre la comunicación del frontend y el backend

```
...
upstream products {
    server products:8080;
}
...

server {
  ...
    location /api/new-horizons/services/products {
        proxy_redirect off;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_pass http://products/api/new-horizons/services/products;
    }
    ...
}
```

## 2. Crear Docker compose con la estructura de los contenedores y sus configuraciones
```
version: '3'
services:
  database:
    image: mysql:5.7
    environment:
      - MYSQL_DATABASE=newhorizons
      - MYSQL_ROOT_PASSWORD=root
    cap_add:
      - SYS_NICE
 ;   ports:
      - "3306:3306"
  employees:
    image: employees:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    depends_on:
      - database
  products:
    image: products:latest
    ports:
      - "8081:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    depends_on:
      - database
  terms:
    image: terms:latest
    ports:
      - "8082:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    depends_on:
      - database
  web-client:
    image: web-client:latest
    ports:
      - "80:80"
    depends_on:
      - employees
      - products
      - terms
      - database
```


## 4. Crear las instancias de EC2
* Instanciar las imagenes y obtener la IP pública
* Definir el grupo de seguridad y abrir el puerto 80
* Conectarse a las máquinas virtuales

## 5. Ejecutar el comando de docker-compose en cada instancia
Previamente hay que instalar docker-compose en cada instancia
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```
sudo chmod +x /usr/local/bin/docker-compose
```
```
docker-compose --version
```

Para la ejecución de este comando hay que especificar que se usará la configuración de producción, ya que apunta al endpoint de RDS generado en el paso 3

Crear el ```docker-compose.yml``` con el siguiente contenido
```
version: '3'
services:
 employees:
    image: juancarloscruzd/employees:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
 products:
    image: juancarloscruzd/products:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
 terms:
    image: juancarloscruzd/terms:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
 web-client:
    image: juancarloscruzd/web-client:latest
    ports:
      - "80:80"
    depends_on:
      - employees
      - products
      - terms
```
Ejecutar docker-compose
```
docker-compose up -d
```
## 6. Crear el target group y balanceador apuntando al puerto 80
* Crear el Target Group con salida al puerto 80 y asociandolo con las dos instancias creadas en el paso 4
* Crear el Load Balancer haciendo forward del tráfico al target group creado anteriormente
