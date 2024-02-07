import { parseJson } from '../parse-json';

describe('parseJson', () => {
  it('should parse a JSON string into a JS object', () => {
    // Arrange
    const jsonString = '{"key": "value"}';
    // Act
    const result = parseJson<{ key: string }>(jsonString);
    // Assert
    expect(result).toEqual({ key: 'value' });
  });
});
