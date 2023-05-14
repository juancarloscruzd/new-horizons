import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'next/router';
import dayjs from 'dayjs';
dayjs.extend(require('dayjs/plugin/isSameOrBefore'));

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import TermForm from '../../common/forms/Term.form';
import TermsAPI from '../../common/apis/Terms.api';

import styles from './Terms.module.scss';

const Term = ({ router }) => {
  const [nonWorkingDaysOptions, setNonWorkingDaysOptions] = useState([]);
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [term, setTerm] = useState(null);
  const form = useRef(null);

  const { id } = router.query;

  const handleCancelClick = (e) => {
    router.push('/terms');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const termForm = new TermForm(form.current);
    if (termForm.valid()) {
      TermsAPI.save(termForm.toJSON())
        .then(() => {
          router.push('/terms');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    }
  };

  const handleStartDateChange = (value) => {
    setStartDay(value);
    if (value && endDay) {
      fillNonWorkingDaysOptions(value, endDay);
    }
  };

  const handleEndDateChange = (value) => {
    setEndDay(value);
    if (value && startDay) {
      fillNonWorkingDaysOptions(startDay, value);
    }
  };

  function fillNonWorkingDaysOptions(from, to) {
    const isOk = dayjs(from).isSameOrBefore(to, 'day');
    if (!isOk) {
      return;
    }

    const options = [];
    let nextDay = dayjs(from);
    while (nextDay.isSameOrBefore(to, 'day')) {
      options.push([
        nextDay.format('YYYY-MM-DD'),
        nextDay.format('dddd DD/MM/YYYY'),
      ]);
      nextDay = nextDay.add(1, 'day');
    }
    setNonWorkingDaysOptions(options);
  }

  useEffect(() => {
    if (!id) return;

    TermsAPI.getById(id)
      .then((data) => setTerm(data))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [id, router]);

  return (
    <Layout>
      <div className={styles.terms}>
        <h1 className={styles.title}>Nuevo Ciclo</h1>
        <hr />
        <div className={styles.form}>
          <form ref={form} onSubmit={handleFormSubmit}>
            <TextField name="name" label="Nombre" value={term?.name} required />
            <TextField
              type="date"
              name="start_date"
              label="Fecha inicio"
              value={term?.start_date}
              onChange={handleStartDateChange}
              width={'50%'}
              required
            />
            <TextField
              type="date"
              name="end_date"
              label="Fecha fin"
              value={term?.end_date}
              onChange={handleEndDateChange}
              width={'50%'}
              last
              required
            />
            <SelectField
              multiple
              name="non_working_days"
              label="Días No Laborables"
              options={nonWorkingDaysOptions}
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

export default withRouter(Term);
