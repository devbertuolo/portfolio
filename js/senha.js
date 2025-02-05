let senha = gerarNumeroAleatorio();

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
    let userInput1 = document.getElementById('userInput1').value;
    let userInput2 = document.getElementById('userInput2').value;
    let userInput3 = document.getElementById('userInput3').value;
    let userInput4 = document.getElementById('userInput4').value;
    let resultado = document.getElementById('resultado');
    
    let userInput = userInput1 + userInput2 + userInput3 + userInput4;

    if (userInput.length !== 4) {
        resultado.textContent = 'Por favor, digite números válidos em todos os campos.';
        resultado.style.color = 'orange';
        return;
    }

    let numerosCorretos = 0;
    let numerosErrados = 0;

    for (let i = 0; i < 4; i++) {
        if (userInput[i] === senha[i]) {
            numerosCorretos++;
        } else if (senha.includes(userInput[i])) {
            numerosErrados++;
        }
    }

    if (numerosCorretos === 4) {
        resultado.textContent = 'Parabéns! Você acertou a senha!';
        resultado.style.color = 'green';
    } else {
        resultado.textContent = `${numerosCorretos} número(s) no lugar certo e ${numerosErrados} número(s) no lugar errado.`;
        resultado.style.color = '#b80404';
    }
}

function reiniciarJogo() {
    senha = gerarNumeroAleatorio();
    document.getElementById('userInput1').value = '';
    document.getElementById('userInput2').value = '';
    document.getElementById('userInput3').value = '';
    document.getElementById('userInput4').value = '';
    document.getElementById('resultado').textContent = '';
}
