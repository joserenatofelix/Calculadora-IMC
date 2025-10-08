
/* funcoes.js
	Versão refatorada: ES6+, mais legível e com melhorias de acessibilidade.
	Responsabilidades:
	- controlar navegação entre steps (1,2,3)
	- validar entradas (peso e altura)
	- calcular IMC e classificar
	- atualizar UI (valor, classificação, mensagens de erro)
*/

import { calcularIMC, classificarIMC } from './imc.js';

(() => {
	 'use strict';

	// Pequenos utilitários
	const $ = selector => document.querySelector(selector);
	const $$ = selector => Array.from(document.querySelectorAll(selector));
	const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

	// Elementos principais
	const startBtn = $('#start-btn');
	const calculateBtn = $('#calculate-btn');
	const recalcBtn = $('#recalculate-btn');
	const finishBtn = $('#finish-btn');

	const stepElements = $$('.step');
	const progressSteps = $$('.progress-step');
	const progressBar = $('.progress-bar');

	const pesoInput = $('#peso');
	const alturaInput = $('#altura');
	const pesoError = $('#peso-error');
	const alturaError = $('#altura-error');

	const resultValueEl = $('#result-value');
	const resultClassificationEl = $('#result-classification');

	// Estado
	let currentStep = 1; // 1,2,3

	// Acessibilidade: marque as div de erro como regiões dinâmicas
	[pesoError, alturaError].forEach(el => el && el.setAttribute('aria-live', 'polite'));

	// Inicialização
	const init = () => {
		bindEvents();
		goToStep(1);
	};

	// Eventos
	const bindEvents = () => {
		startBtn && startBtn.addEventListener('click', () => goToStep(2));
		calculateBtn && calculateBtn.addEventListener('click', onCalculate);
		recalcBtn && recalcBtn.addEventListener('click', () => goToStep(2));
		finishBtn && finishBtn.addEventListener('click', onFinish);

		// Ativar cálculo ao pressionar Enter na altura (UX)
		alturaInput && alturaInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				onCalculate();
			}
		});

		// Limpar erro quando o usuário começa a digitar
		[pesoInput, alturaInput].forEach(input => {
			if (!input) return;
			input.addEventListener('input', () => {
				clearError(input);
			});
		});
	};

	// Navegação entre steps
	const goToStep = (step) => {
		currentStep = clamp(step, 1, 3);

		// Atualiza visibilidade
		stepElements.forEach(el => {
			el.classList.toggle('active', el.classList.contains(`step-${currentStep}`));
		});

		// Atualiza progress steps
		progressSteps.forEach((el, idx) => {
			const stepIndex = idx + 1;
			el.classList.toggle('active', stepIndex <= currentStep);
		});

		// Atualiza barra de progresso via variável CSS --progress-percent (usada por ::after)
		const percent = currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%';
		if (progressBar && progressBar.style) {
			progressBar.style.setProperty('--progress-percent', percent);
		}
	};

	// Validação
	const validate = () => {
		let valid = true;
		const peso = parseFloat(pesoInput.value);
		const altura = parseFloat(alturaInput.value);

		if (!Number.isFinite(peso) || peso <= 0) {
			showError(pesoInput, pesoError, 'Por favor, informe um peso válido maior que 0');
			valid = false;
		}

		if (!Number.isFinite(altura) || altura <= 0) {
			showError(alturaInput, alturaError, 'Por favor, informe uma altura válida em cm');
			valid = false;
		}

		return { valid, peso, altura };
	};

	// Mostrar / limpar erros
	const showError = (inputEl, errorEl, message) => {
		if (inputEl) {
			const group = inputEl.closest('.input-group');
			if (group) group.classList.add('input-error');
			inputEl.setAttribute('aria-invalid', 'true');
		}
		if (errorEl) {
			errorEl.textContent = message;
			errorEl.style.display = 'block';
		}
	};

	const clearError = (inputEl) => {
		if (!inputEl) return;
		const group = inputEl.closest('.input-group');
		if (group) group.classList.remove('input-error');
		inputEl.removeAttribute('aria-invalid');

		// limpar a mensagem correspondente
		if (inputEl.id === 'peso') {
			pesoError.style.display = 'none';
			pesoError.textContent = '';
		} else if (inputEl.id === 'altura') {
			alturaError.style.display = 'none';
			alturaError.textContent = '';
		}
	};

	// As funções puras `calcularIMC` e `classificarIMC` foram importadas de ./imc.js

	// Atualiza UI do resultado
	const mostrarResultado = (imc) => {
		const { label, className } = classificarIMC(imc);

		// valor
		resultValueEl.textContent = imc.toFixed(1).replace('.', ','); // formatação pt-BR

		// classificação
		resultClassificationEl.textContent = label;

		// atualizar classes visuais (remover classes anteriores)
		resultClassificationEl.className = 'result-classification';
		resultClassificationEl.classList.add(className);
	};

	// Ação do botão calcular
	const onCalculate = (e) => {
		if (e && typeof e.preventDefault === 'function') e.preventDefault();

		try {
			const { valid, peso, altura } = validate();
			if (!valid) return;

			const imc = calcularIMC(peso, altura);

			mostrarResultado(imc);
			goToStep(3);
		} catch (err) {
			console.error('Erro ao calcular IMC:', err);
			alert('Ocorreu um erro ao calcular o IMC. Verifique os valores e tente novamente.');
		}
	};

	const onFinish = () => {
		// Limpa campos e volta ao início
		pesoInput.value = '';
		alturaInput.value = '';
		clearError(pesoInput);
		clearError(alturaInput);
		resultValueEl.textContent = '--';
		resultClassificationEl.textContent = '--';
		resultClassificationEl.className = 'result-classification';

		goToStep(1);
	};

	// Inicializa quando DOM estiver pronto
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();
