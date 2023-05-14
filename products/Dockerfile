FROM gcr.io/distroless/java:11
EXPOSE 8080
COPY target/*SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Duser.timezone=America/Lima", "-jar", "app.jar"]