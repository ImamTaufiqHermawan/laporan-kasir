export const formatDateDefault = (value: any) => {
  const defaultValue = new Date(value).toISOString().split('T')[0];
  return defaultValue;
}

