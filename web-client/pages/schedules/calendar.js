import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import SchedulesAPI from '../../common/apis/Schedules.api';

import styles from './Schedules.module.scss';

const Calendar = ({ router }) => {
  const [query, setQuery] = useState('');
  const [calendar, setCalendar] = useState([]);

  const handleBackToSchedulesClick = (e) => {
    e.preventDefault();
    router.push({ pathname: '/schedules' });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    SchedulesAPI.getCalendar()
      .then((data) => {
        setCalendar(data);
      })
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  function createCalendar(data) {
    // "startDate": "2021-11-12T00:00:00.000+00:00",
    // const calendarItems = data.reduce((acc, val) => {
    //   if (!val) {
    //     return acc;
    //   }
    //   const date = dayjs(val.startDate);
    //   const month = date.month();
    //   acc[month] = acc[month] || {};
    //   acc[month].name = date.format('MMMM');
    //   acc[month].days = acc[month].days || [];
    //   const day = date.day();
    //   acc[month].days[day] = acc[month].days[day] || {};
    //   return acc;
    // }, []);
  }

  return (
    <Layout>
      <div className={styles.schedules}>
        <h1 className={styles.title}>Calendario</h1>
        <hr />
        <div className={styles.actions}>
          <TextField
            name="query"
            placeholder="Buscar en la lista de programación horaria."
            width="50%"
            onChange={handleQueryChange}
          />
          <button
            type="button"
            onClick={handleBackToSchedulesClick}
            className={styles.secondary}
          >
            Volver
          </button>
        </div>
        <hr />
        <div className={styles.calendar}></div>
      </div>
    </Layout>
  );
};

export default withRouter(Calendar);
