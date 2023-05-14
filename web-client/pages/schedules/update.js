import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import ScheduleForm from '../../common/forms/Schedule.form';
import ProductsApi from '../../common/apis/Products.api';
import TermsApi from '../../common/apis/Terms.api';
import StaffApi from '../../common/apis/Staff.api';
import SchedulesApi from '../../common/apis/Schedules.api';
import { emptyWeekBoard } from '../../common/utils/schedules.data';

import styles from './Schedules.module.scss';

const Schedule = ({ router }) => {
  const [termOptions, setTermOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [weekBoard] = useState(emptyWeekBoard);
  const [schedule, setSchedule] = useState(null);
  const form = useRef(null);

  const { id } = router.query;

  const handleCancelClick = (e) => {
    router.push('/schedules');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const scheduleForm = new ScheduleForm(form.current);
    if (scheduleForm.valid()) {
      const payload = scheduleForm.toJSON();
      payload.scheduleData = { ...weekSchedule };

      SchedulesApi.save(payload)
        .then(() => {
          router.push('/schedules');
        })
        .catch((e) => e && e.status === 401 && router.push('/login'));
    }
  };

  const handleScheduleChange = (id, key, value) => {
    if (!id || !['startTime', 'academicHours'].includes(key)) {
      return;
    }

    if (key === 'academicHours') {
      value = parseInt(value, 10);
    }

    const changes = { ...weekSchedule };
    changes[id] = changes[id] || {};
    changes[id][key] = value || null;

    if (!changes[id]['startTime'] && !changes[id]['academicHours']) {
      delete changes[id];
    }

    setWeekSchedule(changes);
  };

  useEffect(() => {
    if (!id) return;
    // ...
  }, [id, router]);

  useEffect(() => {
    TermsApi.getAll()
      .then((data) => setTermOptions(data.map((o) => [o.id, o.name])))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  useEffect(() => {
    ProductsApi.getAll()
      .then((data) => setProductOptions(data.map((o) => [o.id, o.name])))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  useEffect(() => {
    StaffApi.getAll()
      .then((data) => setStaffOptions(data.map((o) => [o.id, o.name])))
      .catch((e) => e && e.status === 401 && router.push('/login'));
  }, [router]);

  return (
    <Layout>
      <div className={styles.schedules}>
        <h1 className={styles.title}>Nueva Programación Horaria</h1>
        <hr />
        <div className={styles.form}>
          <form ref={form} onSubmit={handleFormSubmit}>
            <div className={styles.formBody}>
              <SelectField
                name="termId"
                label="Ciclo"
                options={termOptions}
                width={'50%'}
                value={schedule?.termId}
                placeholder="Seleccione"
                required
              />
              <SelectField
                name="productId"
                label="Producto"
                options={productOptions}
                value={schedule?.productId}
                placeholder="Seleccione"
                required
              />
              <SelectField
                name="teacherId"
                label="Profesor"
                options={staffOptions}
                value={schedule?.productId}
                placeholder="Seleccione"
                required
              />
              <TextField
                type="date"
                name="startDate"
                label="Fecha inicio"
                value={schedule?.startDate}
                width={'50%'}
                required
              />
              <TextField
                type="number"
                name="iteration"
                label="Iteración"
                width={'50%'}
                value={schedule?.iteration}
                required
                last
              />
            </div>
            <br />
            <label>Horario:</label>
            <div className={styles.board}>
              {weekBoard.map((o) => (
                <div key={o.id} className={styles.weekday}>
                  <strong className={styles.weekname}>{o.weekDay}</strong>
                  <label>Hora Inicio:</label>
                  <input
                    type="time"
                    onChange={(i) =>
                      handleScheduleChange(o.id, 'startTime', i.target.value)
                    }
                  ></input>
                  <hr />
                  <label>Horas Acad:</label>
                  <input
                    type="number"
                    onChange={(i) =>
                      handleScheduleChange(
                        o.id,
                        'academicHours',
                        i.target.value
                      )
                    }
                  ></input>
                </div>
              ))}
            </div>
            <hr />
            <div className={`${styles.actions} ${styles.boardActions}`}>
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

export default withRouter(Schedule);
