import React, { useEffect, useContext, useState, useCallback } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

import AppContext from '../common/context';
import Main from './Main';
import Footer from './Footer';
import Sidebar from './Sidebar';

import styles from '../styles/layout.module.scss';

const Layout = ({ router, children }) => {
  const [, setNextPage] = useContext(AppContext).useNextPage;
  const [signedInUser, setSignedInUser] = useContext(AppContext).useUser;

  const [loading, setLoading] = useState(true);

  const isPublicPage = ['/', '/login'].includes(router.pathname);
  const containerStyle = isPublicPage
    ? styles.containersimple
    : styles.container;

  useEffect(() => {
    async function handleRedirection(userSignedIn, isPublic) {
      if (userSignedIn && isPublic) {
        await router.push('/staff');
      }

      if (!userSignedIn && !isPublic) {
        setNextPage(router.pathname);
        await router.push('/login');
      }

      setLoading(false);
    }

    const user = localStorage.getItem('dmc.user');
    setSignedInUser(user);

    handleRedirection(!!user, isPublicPage);
  }, [isPublicPage]);

  return (
    <>
      <Head>
        <title>New Horizons</title>
        <meta name="description" content="Data Mining Consulting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.loader} hidden={!loading}>
        <img src="/logo.png" alt="DMC" width={118} height={60} />
      </div>

      <div className={containerStyle}>
        {signedInUser && <Sidebar />}
        <div className={styles.content}>
          <Main>{children}</Main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default withRouter(Layout);
