export const snakeToCamelCase = <R>(obj: { [key: string]: any }): R => {
  const converted: { [key: string]: any } = {};

  for (const key in obj) {
    const camelKey = key
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      );
    converted[camelKey] = obj[key];
  }

  return converted as R;
};

export const camelToSnake = <R>(obj: { [key: string]: any }): R => {
  const converted: { [key: string]: any } = {};

  for (const key in obj) {
    const snakeKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    converted[snakeKey] = obj[key];
  }

  return converted as R;
};
