import React, { useState, useEffect } from 'react';

import styles from '../styles/form.module.scss';

const TextField = (props) => {
  const [value, setValue] = useState('');

  const width = props.width || '100%';
  const isLast = 'last' in props;
  const hasCustonWidth = width !== '100%' && !isLast;

  const styleInline = {
    width: hasCustonWidth ? `calc(${width} - 1rem)` : width,
    marginRight: hasCustonWidth ? '1rem' : '0',
  };

  const handleInputChange = (target) => {
    let value = target.value || '';

    if ((props.type || 'text') === 'text') {
      value = formatInputText(value);
    }

    setValue(value);
    if (typeof props.onChange === 'function') {
      props.onChange(value);
    }
  };

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  function formatInputText(value) {
    const whiteSpaces = props.avoidWhiteSpaces ? '' : `\\s`;
    const otherCharacters = props.allowCharacters || '';

    const pattern = `[^a-zA-Z0-9ñÑ${otherCharacters}${whiteSpaces}]`;
    return value.replace(new RegExp(pattern, 'g'), '').substring(0, 100);
  }

  return (
    <div className={styles.textfield} style={styleInline}>
      <label>{props.label}</label>
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder}
        name={props.name}
        value={value}
        required={props.required || null}
        min={isNaN(props.min) ? null : props.min}
        max={isNaN(props.max) ? null : props.max}
        maxLength={isNaN(props.maxlength) ? null : props.maxlength}
        onChange={(o) => handleInputChange(o.target)}
      />
    </div>
  );
};

export default TextField;
