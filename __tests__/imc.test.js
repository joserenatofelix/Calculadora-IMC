import { calcularIMC, classificarIMC } from '../js/imc.js';

describe('calcularIMC', () => {
  test('calcula corretamente o IMC com 1 casa decimal', () => {
    expect(calcularIMC(70, 175)).toBe(22.9);
    expect(calcularIMC(80, 180)).toBe(24.7);
  });

  test('lança erro para valores inválidos', () => {
    expect(() => calcularIMC(0, 170)).toThrow();
    expect(() => calcularIMC(70, 0)).toThrow();
    expect(() => calcularIMC('a', 170)).toThrow();
  });
});

describe('classificarIMC', () => {
  test('classifica corretamente', () => {
    expect(classificarIMC(17).label).toBe('Abaixo do peso');
    expect(classificarIMC(22).label).toBe('Peso normal');
    expect(classificarIMC(27).label).toBe('Sobrepeso');
    expect(classificarIMC(32).label).toBe('Obesidade Grau I');
    expect(classificarIMC(37).label).toBe('Obesidade Grau II');
    expect(classificarIMC(45).label).toBe('Obesidade Grau III');
  });

  test('lança erro para imc inválido', () => {
    expect(() => classificarIMC(0)).toThrow();
    expect(() => classificarIMC(-1)).toThrow();
    expect(() => classificarIMC('x')).toThrow();
  });
});
