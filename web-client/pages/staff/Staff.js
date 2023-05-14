import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import Datagrid from '../../components/Datagrid';
import TextField from '../../components/TextField';
import StaffAPI from '../../common/apis/Staff.api';
import {
  genderOptionsData,
  getValueFromKey,
} from '../../common/utils/selects.utils';

import styles from './Staff.module.scss';

const StaffList = ({ router }) => {
  const [query, setQuery] = useState('');
  const [staff, setStaff] = useState([]);

  const handleNewStaffClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/staff/update', query: { id: null } });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    StaffAPI.getAll()
      .then((data) => {
        setStaff(data);
      })
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  return (
    <Layout>
      <div className={styles.staff}>
        <h1 className={styles.title}>Profesores</h1>
        <hr />
        <div className={styles.actions}>
          <TextField
            name="query"
            placeholder="Buscar en la lista de profesores."
            width="50%"
            onChange={handleQueryChange}
          />
          <button type="button" onClick={handleNewStaffClick}>
            Agregar Profesor
          </button>
        </div>
        <hr />
        <Datagrid
          query={query}
          columns={[
            { label: 'Nombres', prop: 'name' },
            { label: 'Apellidos', prop: 'lastName' },
            { label: 'DNI', prop: 'dni' },
            { label: 'Sexo', prop: 'gender' },
            { label: 'Celular', prop: 'mobilePhone' },
          ]}
          data={staff}
          format={{ gender: (o) => getValueFromKey(o, genderOptionsData) }}
          onCellClicked={(id) =>
            router.push({ pathname: '/staff/update', query: { id } })
          }
        />
      </div>
    </Layout>
  );
};

export default withRouter(StaffList);
