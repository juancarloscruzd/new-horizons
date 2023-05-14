export const genderOptionsData = [
  ['M', 'Masculino'],
  ['F', 'Femenino'],
  ['N', 'Prefiero no indicar'],
];

export const programTypeOptions = [
  ['0', 'Curso'],
  ['1', 'Especialización'],
  ['2', 'PEA'],
];

export const programModeOptions = [
  ['0', 'A distancia'],
  ['1', 'Semi presencial'],
  ['2', 'Presencial'],
];

export function getValueFromKey(key, selectData) {
  const optionKV = selectData.find(([k]) => k === key);
  return optionKV ? optionKV[1] : key;
}
