import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthAPI from '../common/apis/Auth.api';

import styles from '../styles/sidebar.module.scss';

const SidebarItem = (props) => {
  const router = useRouter();

  const handleOnClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  return (
    <li className={router.asPath === props.href ? styles.selected : null}>
      <Link href={props.href}>
        <a onClick={handleOnClick}>{props.children}</a>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  const handleSalirClick = () => {
    AuthAPI.logout().catch(alert);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <header>
          <a>
            <img src="/logo.png" alt="DMC" width={162} height={84} />
          </a>
        </header>
        <ul className={styles.main}>
          <SidebarItem href="/staff">Profesores</SidebarItem>
          <SidebarItem href="/products">Productos</SidebarItem>
          <SidebarItem href="/terms">Ciclos</SidebarItem>
        </ul>
        <ul className={styles.secondary}>
          <SidebarItem href="/" onClick={handleSalirClick}>
            Salir
          </SidebarItem>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
