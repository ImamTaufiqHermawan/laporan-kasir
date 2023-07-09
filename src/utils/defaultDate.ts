export const formatDateDefault = (value) => {
  const defaultValue = new Date(value).toISOString().split('T')[0];
  return defaultValue;
}

