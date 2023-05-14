import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import ProductForm from '../../common/forms/Product.form';
import {
  programTypeOptions,
  programModeOptions,
} from '../../common/utils/selects.utils';
import ProductsAPI from '../../common/apis/Products.api';

import styles from './Products.module.scss';

const Product = ({ router }) => {
  const [typeOptions] = useState(programTypeOptions);
  const [modeOptions] = useState(programModeOptions);
  const [product, setProduct] = useState(null);
  const form = useRef(null);

  const { id } = router.query;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const productForm = new ProductForm(form.current);
    if (!productForm.valid()) {
      return;
    }
    if (!id) {
      ProductsAPI.save(productForm.toJSON())
        .then(() => {
          router.push('/products');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    } else {
      ProductsAPI.update(id, productForm.toJSON())
        .then(() => {
          router.push('/products');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    }
  };

  const handleCancelClick = (e) => {
    router.push('/products');
  };

  useEffect(() => {
    if (!id) return;

    ProductsAPI.getById(id)
      .then((data) => setProduct(data))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [id, router]);

  return (
    <Layout>
      <div className={styles.products}>
        <h1 className={styles.title}>Nuevo Producto</h1>
        <hr />
        <div className={styles.form}>
          <form ref={form} onSubmit={handleFormSubmit}>
            <SelectField
              name="type"
              label="Tipo"
              options={typeOptions}
              width={'50%'}
              required
            />
            <TextField
              name="name"
              label="Nombre"
              value={product?.name}
              required
            />
            <TextField
              type="number"
              name="edition"
              label="Edición"
              value={product?.edition}
              width={'50%'}
              required
            />
            <TextField
              name="code"
              label="Código"
              value={product?.code}
              width={'50%'}
              avoidWhiteSpaces
              last
              required
            />
            <TextField
              type="number"
              name="theoretical_hours"
              value={product?.theoretical_hours}
              min={0}
              label="Horas Académicas"
              width={'50%'}
              required
            />
            <TextField
              type="number"
              name="practical_hours"
              value={product?.practical_hours}
              min={0}
              label="Horas Cronológicas"
              width={'50%'}
              last
              required
            />
            <SelectField
              name="mode"
              label="Modalidad"
              options={modeOptions}
              width={'50%'}
              required
            />
            <TextField
              type="number"
              name="price"
              value={product?.price}
              min={0}
              label="Precio"
              width={'50%'}
              last
              required
            />
            <hr />
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={handleCancelClick}
              >
                Cancelar
              </button>
              <button type="submit" onClick={handleFormSubmit}>
                {id ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Product);
