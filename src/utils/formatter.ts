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

export const formatDate = (date: string | Date | null): string => {
  if (date === null) return '';
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateAPI = (date: string | Date | null): string => {
  if (date === null) return '';

  const d = new Date(date);

  // Get year, month, and day
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0'); // Days of the month

  // Format as YYYY-MM-DD
  return `${year}-${month}-${day}`;
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
