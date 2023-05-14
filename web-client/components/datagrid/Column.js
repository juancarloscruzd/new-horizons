import styles from '../../styles/datagrid.module.scss';

export const Header = ({ title, children }) => {
  return (
    <div className={styles.header} title={title}>
      {children}
    </div>
  );
};

export const Cell = ({ textAlign, children, onClick }) => {
  return (
    <div className={styles.cell} style={{ textAlign }} onClick={onClick}>
      {children}
    </div>
  );
};

export const Column = (props) => {
  const handleTextFormat = (txt, name) => {
    if (txt && props.format && typeof props.format[name] === 'function') {
      return props.format[name](txt);
    }
    return txt;
  };

  const handleOnCellClick = (id) => {
    if (typeof props.onCellClicked === 'function') {
      props.onCellClicked(id);
    }
  };

  return (
    <div className={styles.column}>
      <Header title={props.label}>{props.label}</Header>
      {props.data.map((o, i) => (
        <Cell
          key={`${i}`}
          textAlign={props.textAlign}
          onClick={handleOnCellClick.bind(null, o.id)}
        >
          {handleTextFormat(o.txt, props.name)}
        </Cell>
      ))}
    </div>
  );
};
