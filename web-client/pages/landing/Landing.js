import React, { useState } from 'react';
import Link from 'next/link';

import Layout from '../../components/Layout';
import { modulesData } from '../../common/utils/modules.data';

import styles from './Landing.module.scss';

const Landing = () => {
  const [modules] = useState(modulesData);

  return (
    <Layout>
      <div className={styles.landing}>
        <h1 data-testid="page-title" className={styles.title}>
          New Horizons
        </h1>

        <div className={styles.content}>
          <div className={styles.grid}>
            {modules.map((m) => (
              <Link key={m.key} href={m.path}>
                <a className={styles.card}>
                  <h2>{m.title} &rarr;</h2>
                  <p>{m.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
