/* js/imc.js
   Funções puras para cálculo e classificação do IMC.
   Exportadas para uso no app e para testes unitários.
*/

export const calcularIMC = (pesoKg, alturaCm) => {
    const p = Number(pesoKg);
    const a = Number(alturaCm);
    if (!Number.isFinite(p) || !Number.isFinite(a) || p <= 0 || a <= 0) {
        throw new TypeError('Peso e altura devem ser números maiores que zero');
    }
    const alturaM = a / 100;
    const imc = p / (alturaM * alturaM);
    return Number(imc.toFixed(1));
};

export const classificarIMC = (imc) => {
    const n = Number(imc);
    if (!Number.isFinite(n) || n <= 0) {
        throw new TypeError('IMC deve ser um número maior que zero');
    }

    if (n < 18.5) return { label: 'Abaixo do peso', className: 'abaixo-peso' };
    if (n < 25) return { label: 'Peso normal', className: 'normal' };
    if (n < 30) return { label: 'Sobrepeso', className: 'sobrepeso' };
    if (n < 35) return { label: 'Obesidade Grau I', className: 'obesidade-1' };
    if (n < 40) return { label: 'Obesidade Grau II', className: 'obesidade-2' };
    return { label: 'Obesidade Grau III', className: 'obesidade-3' };
};
