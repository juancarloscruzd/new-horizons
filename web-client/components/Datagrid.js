import React from 'react';

import { flatDatagridData } from '../common/utils/datagrid.utils';
import { Column } from './datagrid/Column';

import styles from '../styles/datagrid.module.scss';

const Empty = ({ children }) => {
  return <div className={styles.empty}>{children}</div>;
};

const Datagrid = (props) => {
  const flattenData = flatDatagridData(
    props.data,
    props.columns.map((o) => o.prop)
  );

  let filteredData = flattenData;

  let emptyMessage = props.emptyMessage || 'Sin resultados.';

  if (flattenData.length && props.query) {
    const queryRegex = new RegExp(props.query, 'i');
    filteredData = flattenData.filter(
      (o) => !!Object.values(o).find((val) => queryRegex.test(val))
    );

    if (!filteredData.length) {
      emptyMessage = 'Sin resultados de búsqueda.';
    }
  }

  return (
    <div className={styles.datagrid}>
      <div className={styles.content}>
        {props.columns.map((col) => (
          <Column
            key={col.prop}
            name={col.prop}
            label={col.label}
            data={filteredData.map((o) => ({ id: o.id, txt: o[col.prop] }))}
            textAlign={col.textAlign || 'left'}
            format={props.format}
            onCellClicked={props.onCellClicked}
          />
        ))}
      </div>
      {!filteredData.length && <Empty>{emptyMessage}</Empty>}
    </div>
  );
};

export default Datagrid;
