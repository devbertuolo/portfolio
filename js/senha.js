let senhaGerada = gerarNumeroAleatorio();

function gerarNumeroAleatorio() {
    let numero = '';
    while (numero.length < 4) {
        let digito = Math.floor(Math.random() * 10).toString();
        if (!numero.includes(digito)) {
            numero += digito;
        }
    }
    return numero;
}

function verificarPalpite() {
    let userInput = Array.from(document.querySelectorAll('.area_chute'))
        .map(input => input.value)
        .join('');
    let resultado = document.getElementById('resultado');

    if (!/^\d{4}$/.test(userInput)) {
        resultado.textContent = 'Por favor, insira apenas números nos campos.';
        resultado.style.color = 'orange';
        return;
    }

    let numerosCorretos = 0;
    let numerosErrados = 0;

    for (let i = 1; i <= 4; i++) {
        const quadrado = document.getElementById(`quadrado${i}`);
        quadrado.style.backgroundColor = 'var(--color6)'; 
        quadrado.textContent = ''; 
    }

    for (let i = 0; i < 4; i++) {
        const quadrado = document.getElementById(`quadrado${i + 1}`);
        if (userInput[i] === senhaGerada[i]) {
            numerosCorretos++;
            quadrado.style.backgroundColor = 'green'; 
            quadrado.textContent = userInput[i];
        } else if (senhaGerada.includes(userInput[i])) {
            numerosErrados++;
            quadrado.style.backgroundColor = 'yellow';
        } else {
            quadrado.style.backgroundColor = 'var(--color6)';
        }
    }

    if (numerosCorretos === 4) {
        resultado.textContent = 'Parabéns! Você acertou a senha!';
        resultado.style.color = 'green';
    } else {
        resultado.textContent = `${numerosCorretos} número(s) correto(s) na posição certa e ${numerosErrados} número(s) correto(s) na posição errada.`;
        resultado.style.color = 'orange';
    }
}

function reiniciarJogo() {
    senhaGerada = gerarNumeroAleatorio();
    document.querySelectorAll('.area_chute').forEach(input => (input.value = ''));
    document.getElementById('resultado').textContent = '';
    document.getElementById('userInput1').focus();
}

document.querySelectorAll('.area_chute').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1) { 
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    });
});
