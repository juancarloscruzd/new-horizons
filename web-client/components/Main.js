import React from 'react';

import styles from '../styles/layout.module.scss';

const Main = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
