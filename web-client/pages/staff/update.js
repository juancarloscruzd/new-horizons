import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import StaffForm from '../../common/forms/Staff.form';
import StaffAPI from '../../common/apis/Staff.api';
import ProductosAPI from '../../common/apis/Products.api';
import { genderOptionsData } from '../../common/utils/selects.utils';

import styles from './Staff.module.scss';

const Staff = ({ router }) => {
  const [genderOptions] = useState(genderOptionsData);
  const [staff, setStaff] = useState(null);

  const { id } = router.query;

  const form = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const staffForm = new StaffForm(form.current);
    if (!staffForm.valid()) {
      return;
    }

    if (!id) {
      StaffAPI.save(staffForm.toJSON())
        .then(() => {
          router.push('/staff');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    } else {
      StaffAPI.update(id, staffForm.toJSON())
        .then(() => {
          router.push('/staff');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    }
  };

  const handleCancelClick = (e) => {
    router.push('/staff');
  };

  useEffect(() => {
    if (!id) return;

    StaffAPI.getById(id)
      .then((data) => setStaff(data))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [id, router]);

  return (
    <Layout>
      <div className={styles.staff}>
        <h1 className={styles.title}>Datos del Profesor</h1>
        <hr />
        <div className={styles.form}>
          <form ref={form} onSubmit={handleFormSubmit}>
            <TextField
              name="name"
              label="Nombres"
              value={staff?.name}
              required
            />
            <TextField
              name="lastName"
              label="Apellidos"
              value={staff?.lastName}
              required
            />
            <TextField
              name="dni"
              label="DNI"
              width={'50%'}
              value={staff?.dni}
              maxlength={8}
              required
            />
            <TextField
              type="date"
              name="dob"
              label="Cumpleaños"
              value={staff?.dob}
              width={'50%'}
              last
              required
            />
            <SelectField
              name="gender"
              label="Sexo"
              options={genderOptions}
              width={'50%'}
              required
            />
            <TextField
              type="tel"
              name="mobilePhone"
              label="Celular"
              value={staff?.mobilePhone}
              width={'50%'}
              maxlength={9}
              last
              required
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={staff?.email}
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

export default withRouter(Staff);
