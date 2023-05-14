export function flatDatagridData(data, columnsToFlat) {
  const flattenData = data.map((o) => Object.assign({}, o));

  for (const prop of columnsToFlat) {
    if (prop.indexOf('.') < 0) {
      continue;
    }

    const [main, attr] = prop.split('.');
    for (const row of flattenData) {
      row[prop] = row[main][attr] || '';
    }
  }

  return flattenData;
}
