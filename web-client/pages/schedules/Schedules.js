import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import Datagrid from '../../components/Datagrid';
import SchedulesAPI from '../../common/apis/Schedules.api';

import styles from './Schedules.module.scss';

const Schedules = ({ router }) => {
  const [query, setQuery] = useState('');
  const [schedules, setSchedules] = useState([]);

  const handleNewScheduleClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/schedules/update', query: { id: null } });
  };

  const handleCalendarViewClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/schedules/calendar' });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    SchedulesAPI.getAll()
      .then((data) => {
        setSchedules(data);
      })
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  return (
    <Layout>
      <div className={styles.schedules}>
        <h1 className={styles.title}>Programación Horaria</h1>
        <hr />
        <div className={styles.actions}>
          <TextField
            name="query"
            placeholder="Buscar en la lista de programación horaria."
            width="50%"
            onChange={handleQueryChange}
          />
          <div>
            <button type="button" onClick={handleNewScheduleClick}>
              Nueva Programación
            </button>
            <button
              type="button"
              className={styles.secondary}
              onClick={handleCalendarViewClick}
              style={{ marginLeft: '1rem' }}
            >
              Vista Calendario
            </button>
          </div>
        </div>
        <hr />
        <Datagrid
          query={query}
          columns={[
            { label: 'Curso', prop: 'product.name' },
            { label: 'Profesor', prop: 'employee.name' },
            { label: 'Ciclo', prop: 'term.name' },
            { label: 'Interacción', prop: 'iteration' },
            { label: 'Fecha Inicio', prop: 'startDate' },
            { label: 'Horas Académicas', prop: 'product.theoretical_hours' },
            { label: 'Horas Cronológicas', prop: 'product.practical_hours' },
          ]}
          data={schedules}
          format={{ startDate: (o) => dayjs(o).format('DD/MM/YYYY') }}
          onCellClicked={(id) =>
            router.push({ pathname: '/schedules/update', query: { id } })
          }
        />
      </div>
    </Layout>
  );
};

export default withRouter(Schedules);
