import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import Datagrid from '../../components/Datagrid';
import ProductsAPI from '../../common/apis/Products.api';

import styles from './Products.module.scss';

const Products = ({ router }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleNewProductClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/products/update', query: { id: null } });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    ProductsAPI.getAll()
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  return (
    <Layout>
      <div className={styles.products}>
        <h1 className={styles.title}>Productos</h1>
        <hr />
        <div className={styles.actions}>
          <TextField
            name="query"
            placeholder="Buscar en la lista de productos."
            width="50%"
            onChange={handleQueryChange}
          />
          <button type="button" onClick={handleNewProductClick}>
            Agregar Producto
          </button>
        </div>
        <hr />
        <Datagrid
          query={query}
          columns={[
            { label: 'Código', prop: 'code' },
            { label: 'Nombre', prop: 'name' },
            { label: 'Edición', prop: 'edition', textAlign: 'center' },
            {
              label: 'Horas Académicas',
              prop: 'theoretical_hours',
              textAlign: 'center',
            },
            {
              label: 'Horas Cronológicas',
              prop: 'practical_hours',
              textAlign: 'center',
            },
            {
              label: 'Precio',
              prop: 'price',
              textAlign: 'center',
            },
          ]}
          data={products}
          onCellClicked={(id) =>
            router.push({ pathname: '/products/update', query: { id } })
          }
        />
      </div>
    </Layout>
  );
};

export default withRouter(Products);
