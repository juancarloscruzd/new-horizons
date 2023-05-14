import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import Datagrid from '../../components/Datagrid';
import TermsAPI from '../../common/apis/Terms.api';

import styles from './Terms.module.scss';

const Terms = ({ router }) => {
  const [query, setQuery] = useState('');
  const [terms, setTerms] = useState([]);

  const handleNewTermClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/terms/update', query: { id: null } });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    TermsAPI.getAll()
      .then((data) => {
        setTerms(data);
      })
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  return (
    <Layout>
      <div className={styles.terms}>
        <h1 className={styles.title}>Ciclos</h1>
        <hr />
        <div className={styles.actions}>
          <TextField
            name="query"
            placeholder="Buscar en la lista de ciclos."
            width="50%"
            onChange={handleQueryChange}
          />
          <button type="button" onClick={handleNewTermClick}>
            Agregar Ciclo
          </button>
        </div>
        <hr />
        <Datagrid
          query={query}
          columns={[
            { label: 'Nombre', prop: 'name' },
            { label: 'Fecha Inicio', prop: 'start_date' },
            { label: 'Fecha Fin', prop: 'end_date' },
          ]}
          data={terms}
          format={{
            start_date: (o) => dayjs(o).format('DD/MM/YYYY'),
            end_date: (o) => dayjs(o).format('DD/MM/YYYY'),
          }}
          onCellClicked={(id) =>
            router.push({ pathname: '/terms/update', query: { id } })
          }
        />
      </div>
    </Layout>
  );
};

export default withRouter(Terms);
