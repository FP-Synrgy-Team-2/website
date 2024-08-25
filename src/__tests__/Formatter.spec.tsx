import {
  snakeToCamelCase,
  camelToSnake,
  formatDate,
  formatDateAPI,
} from '@/utils/formatter';

describe('snakeToCamelCase', () => {
  test('should convert snake_case to camelCase', () => {
    const input = { snake_case_key: 'value' };
    const expected = { snakeCaseKey: 'value' };
    expect(snakeToCamelCase(input)).toEqual(expected);
  });

  test('should convert kebab-case to camelCase', () => {
    const input = { 'kebab-case-key': 'value' };
    const expected = { kebabCaseKey: 'value' };
    expect(snakeToCamelCase(input)).toEqual(expected);
  });

  test('should handle an empty object', () => {
    const input = {};
    const expected = {};
    expect(snakeToCamelCase(input)).toEqual(expected);
  });
});

describe('camelToSnake', () => {
  test('should convert camelCase to snake_case', () => {
    const input = { camelCaseKey: 'value' };
    const expected = { camel_case_key: 'value' };
    expect(camelToSnake(input)).toEqual(expected);
  });

  test('should handle an empty object', () => {
    const input = {};
    const expected = {};
    expect(camelToSnake(input)).toEqual(expected);
  });
});

describe('formatDate', () => {
  test('should format a valid date string', () => {
    const input = '2024-08-25T00:00:00';
    const expected = '25 Agustus 2024'; // Adjust based on locale settings
    expect(formatDate(input)).toBe(expected);
  });

  test('should format a Date object', () => {
    const input = new Date('2024-08-25T00:00:00');
    const expected = '25 Agustus 2024'; // Adjust based on locale settings
    expect(formatDate(input)).toBe(expected);
  });

  test('should return an empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });

  test('should handle invalid dates gracefully', () => {
    expect(formatDate('invalid-date')).toBe(''); // Adjust based on locale settings
  });
});

describe('formatDateAPI', () => {
  test('should format a valid date string', () => {
    const input = '2024-08-25T00:00:00';
    const expected = '2024-08-25';
    expect(formatDateAPI(input)).toBe(expected);
  });

  test('should format a Date object', () => {
    const input = new Date('2024-08-25T00:00:00');
    const expected = '2024-08-25';
    expect(formatDateAPI(input)).toBe(expected);
  });

  test('should return an empty string for null', () => {
    expect(formatDateAPI(null)).toBe('');
  });

  test('should handle invalid dates gracefully', () => {
    expect(formatDateAPI('invalid-date')).toBe('');
  });
});
