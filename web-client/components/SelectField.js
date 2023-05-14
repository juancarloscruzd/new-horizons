import React, { useState } from 'react';

import styles from '../styles/form.module.scss';

const SelectField = (props) => {
  const [value, setValue] = useState(props.multiple ? [] : '');

  const handleInputChange = (target) => {
    if (props.multiple) {
      const selectedValues = [...target.options]
        .filter((o) => o.selected)
        .map((o) => o.value);
      setValue(selectedValues);
    } else {
      setValue(target.value);
    }
  };

  const width = props.width || '100%';
  const isLast = 'last' in props;
  const hasCustonWidth = width !== '100%' && !isLast;

  const styleInline = {
    width: hasCustonWidth ? `calc(${width} - 1rem)` : width,
    marginRight: hasCustonWidth ? '1rem' : '0',
  };

  return (
    <div className={styles.textfield} style={styleInline}>
      <label>{props.label}</label>
      <select
        multiple={props.multiple || null}
        name={props.name}
        value={value}
        onChange={(o) => handleInputChange(o.target)}
        required={props.required || null}
      >
        {props.placeholder && (
          <option value="" disabled>
            {props.placeholder}
          </option>
        )}
        {props.options.map(([key, val]) => {
          return (
            <option key={key} value={key}>
              {val}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
