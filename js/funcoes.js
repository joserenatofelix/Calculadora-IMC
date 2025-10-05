// Elementos DOM
const steps = document.querySelectorAll('.step');
const progressSteps = document.querySelectorAll('.progress-step');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const pesoError = document.getElementById('peso-error');
const alturaError = document.getElementById('altura-error');
const resultValue = document.getElementById('result-value');
const resultClassification = document.getElementById('result-classification');

// Função para navegar entre os passos
function goToStep(stepNumber) {
    // Esconder todos os passos
    steps.forEach(step => step.classList.remove('active'));
    progressSteps.forEach(step => step.classList.remove('active'));
    
    // Mostrar o passo atual
    document.querySelector(`.step-${stepNumber}`).classList.add('active');
    
    // Atualizar a barra de progresso
    for (let i = 0; i < stepNumber; i++) {
        progressSteps[i].classList.add('active');
    }
    
    // Se for o passo 2, focar no primeiro campo
    if (stepNumber === 2) {
        setTimeout(() => pesoInput.focus(), 300);
    }
    
    // Se for o passo 1, limpar os campos
    if (stepNumber === 1) {
        resetForm();
    }
}

// Função para resetar o formulário
function resetForm() {
    pesoInput.value = '';
    alturaInput.value = '';
    pesoError.style.display = 'none';
    alturaError.style.display = 'none';
    pesoInput.parentElement.classList.remove('input-error');
    alturaInput.parentElement.classList.remove('input-error');
}

// Função para validar e calcular o IMC
function validateAndCalculate() {
    let isValid = true;
    
    // Resetar erros
    pesoError.style.display = 'none';
    alturaError.style.display = 'none';
    pesoInput.parentElement.classList.remove('input-error');
    alturaInput.parentElement.classList.remove('input-error');
    
    // Validar peso
    if (!pesoInput.value || pesoInput.value <= 0) {
        pesoError.style.display = 'block';
        pesoInput.parentElement.classList.add('input-error');
        isValid = false;
    }
    
    // Validar altura
    if (!alturaInput.value || alturaInput.value <= 0) {
        alturaError.style.display = 'block';
        alturaInput.parentElement.classList.add('input-error');
        isValid = false;
    }
    
    // Se válido, calcular IMC
    if (isValid) {
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value) / 100; // Converter cm para m
        
        const imc = peso / (altura * altura);
        showResult(imc);
        goToStep(3);
    }
}

// Função para mostrar o resultado
function showResult(imc) {
    resultValue.textContent = imc.toFixed(1);
    
    // Determinar classificação
    let classification = '';
    let className = '';
    
    if (imc < 18.5) {
        classification = 'Abaixo do peso';
        className = 'abaixo-peso';
    } else if (imc < 25) {
        classification = 'Peso normal';
        className = 'normal';
    } else if (imc < 30) {
        classification = 'Sobrepeso';
        className = 'sobrepeso';
    } else if (imc < 35) {
        classification = 'Obesidade Grau I';
        className = 'obesidade-1';
    } else if (imc < 40) {
        classification = 'Obesidade Grau II';
        className = 'obesidade-2';
    } else {
        classification = 'Obesidade Grau III';
        className = 'obesidade-3';
    }
    
    resultClassification.textContent = classification;
    resultClassification.className = `result-classification ${className}`;
}

// Permitir pressionar Enter para calcular
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.querySelector('.step-2').classList.contains('active')) {
        validateAndCalculate();
    }
});

// Validação em tempo real para melhor UX
pesoInput.addEventListener('input', function() {
    if (this.value && this.value > 0) {
        pesoError.style.display = 'none';
        this.parentElement.classList.remove('input-error');
    }
});

alturaInput.addEventListener('input', function() {
    if (this.value && this.value > 0) {
        alturaError.style.display = 'none';
        this.parentElement.classList.remove('input-error');
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que o primeiro passo esteja ativo
    goToStep(1);

    // Adicionar event listeners aos botões
    const startBtn = document.getElementById('start-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const recalculateBtn = document.getElementById('recalculate-btn');
    const finishBtn = document.getElementById('finish-btn');

    startBtn.addEventListener('click', () => goToStep(2));
    calculateBtn.addEventListener('click', validateAndCalculate);
    recalculateBtn.addEventListener('click', () => goToStep(2));
    finishBtn.addEventListener('click', () => goToStep(1));
});
