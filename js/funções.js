const firstDiv = document.querySelector('.first-step');
const secondDiv = document.querySelector('.second-step');
const finalDiv = document.querySelector('.final-step');

function go(currentStep,nextStep)    
{
        let dNone, dBlock;
        if(currentStep == 1)
        {
            dNone = firstDiv;
        }
        else if(currentStep == 2)
        {
            dNone = secondDiv;
        }
        else
        {
            dNone = finalDiv;
        }

        dNone.style.display = 'none';
       
        if(nextStep == 1)
        {
            dBlock = firstDiv;
        }
        else if(nextStep== 2)
        {
            dBlock = secondDiv;
        }
        else
        {
            dBlock = finalDiv;
        }
        dBlock.style.display = 'block';
}

function validate()
{
    const peso   = document.getElementById('peso');
    const altura = document.getElementById('altura');
    peso.style.border   = 'none';
    altura.style.border = 'none';
    if(!peso.value || !altura.value)
    {
        if(!peso.value && !altura.value)
        {
            peso.style.border = '1px solid red';
            altura.style.border = '1px solid red';
        }
        else if(!peso.value)
        {
            peso.style.border = '1px solid red';
        }
        else
        {
            altura.style.border = '1px solid red';
        }
    }
    else
    {
        let imc = peso.value / (altura.value * altura.value);
        const result = document.getElementById('resultado');
        if(imc < 18.5)
        {
            console.log('Abaixo do Peso');
            result.style.color = 'orange';
            result.innerHTML = 'Abaixo do Peso';
        }
        else if(imc >= 18.5 && imc < 24.9)
        {
            console.log('Normal');
            result.style.color = 'Acquamarine';
            result.innerHTML = 'Normal - Parabéns Peso Ideal';
        }
        else if(imc >= 25 && imc < 29.9)
        {
            console.log('Sobrepeso');
            result.style.color = 'orange';
            result.innerHTML = 'Sobrepeso';
        }
        else if(imc >= 30 && imc < 34.9)
        {
            console.log('Obesidade: Grau 1');
            result.style.color = 'red';
            result.innerHTML = 'Obesidade 1';
        }
        else if(imc >= 35 && imc < 39.9)
        {
            console.log('Obesidade: Grau 2');
            result.style.color = 'black';
            result.innerHTML = 'Obesidade: Grau 2';
        }
        else
        {
            console.log('Obesidade: Grau 3');
            result.style.color = 'purple';
            result.innerHTML = 'Obesidade: Grau 3';
        }
        go(2,3);
    }
}
