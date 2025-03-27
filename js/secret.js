let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let melhorJogada = null; 

function exibirTextoNaTela(selector, texto) {
    let campo = document.querySelector(selector);
    if (campo) {
        campo.innerHTML = texto;
    } else {
        console.error(`Elemento ${selector} não encontrado no HTML.`);
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('.texto__paragrafo', `Escolha um número entre 1 e ${numeroLimite}`);
    exibirTextoNaTela('.texto__tentativas', `Tentativas: ${tentativas}`);
    exibirTextoNaTela('.texto__melhor-jogada', melhorJogada ? `Melhor jogada: ${melhorJogada} tentativa(s)` : 'Melhor jogada: Nenhuma');
    exibirTextoNaTela('.texto__resultado', '');
}

exibirMensagemInicial();

function verificarChute() {
    let chuteInput = document.querySelector('.container__input');
    if (!chuteInput) {
        console.error('Campo de entrada não encontrado.');
        return;
    }

    let chute = chuteInput.value.trim();

    if (chute === '' || isNaN(chute)) {
        exibirTextoNaTela('.texto__paragrafo', `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
        return;
    }

    chute = parseInt(chute);

    if (chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('.texto__paragrafo', `Por favor, insira um número entre 1 e ${numeroLimite}.`);
        return;
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('.texto__paragrafo', mensagemTentativas);

        if (!melhorJogada || tentativas < melhorJogada) {
            melhorJogada = tentativas;
        }

        exibirTextoNaTela('.texto__melhor-jogada', `Melhor jogada: ${melhorJogada} tentativa(s)`);

        let botaoReiniciar = document.getElementById('reiniciar');
        if (botaoReiniciar) {
            botaoReiniciar.removeAttribute('disabled');
        }
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('.texto__resultado', `O número é menor que ${chute}`);
        } else {
            exibirTextoNaTela('.texto__resultado', `O número é maior que ${chute}`);
        }

        tentativas++;
        exibirTextoNaTela('.texto__tentativas', `Tentativas: ${tentativas}`);
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(`Número secreto gerado: ${numeroEscolhido}`);
    return numeroEscolhido;
}

function limparCampo() {
    let chute = document.querySelector('.container__input');
    if (chute) {
        chute.value = '';
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    let botaoReiniciar = document.getElementById('reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.setAttribute('disabled', true);
    }
}