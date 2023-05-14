import React, { useState, useContext } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../components/Layout';
import AppContext from '../../common/context';
import TextField from '../../components/TextField';
import AuthAPI from '../../common/apis/Auth.api';

import styles from './Login.module.scss';

const Login = ({ router }) => {
  const [, setUser] = useContext(AppContext).useUser;
  const [nextPage] = useContext(AppContext).useNextPage;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) return;

    AuthAPI.login(username, password)
      .then(() => {
        setUser({ username });
        const isPublicPage = ['/', '/login'].includes(nextPage);
        router.push(isPublicPage ? '/staff' : nextPage);
      })
      .catch(() => alert('Usuario o contraseña incorrecta.'));
  };

  return (
    <Layout>
      <div className={styles.login}>
        <h1 data-testid="page-title" className={styles.title}>
          Identificate
        </h1>

        <p className={styles.description}>Ingrese su usuario y contraseña</p>

        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Usuario"
              onChange={(o) => setUsername(o)}
              avoidWhiteSpaces
            />
            <TextField
              type="password"
              onChange={(o) => setPassword(o)}
              label="Contraseña"
            />
            <button type="submit" onClick={handleSubmit}>
              Entrar
            </button>
            <p className={styles.message}>
              No estas registrado? <a href="#">Solicita una cuenta</a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Login);
