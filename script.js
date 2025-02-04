document.addEventListener("DOMContentLoaded", () => {
    const teclas = document.querySelectorAll('.tecla');
    const palavrasAnimais = ["macaco", "orca", "pardal", "cavalo", "baleia", "boi", "vaca", "castor"];
    const palavrasAlimentos = ["batata", "abacate", "lagosta", "abacaxi", "cebola", "cogumelo", "uva", "brocolis"];
    const palavras = palavrasAnimais.concat(palavrasAlimentos);

    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
    let palavraOculta = Array(palavraSorteada.length).fill('_').join(' ');
    let tentativas = 1;

    const imagensForca = [
        "./assets/forca.png",
        "./assets/cabeca.png",
        "./assets/corpo.png",
        "./assets/braco_esquerdo.png",
        "./assets/braco_direito.png",
        "./assets/perna_esquerda.png",
        "./assets/perna_direita.png"
    ];

    document.getElementById('palavra-oculta').textContent = palavraOculta;

    teclas.forEach(tecla => {
        tecla.addEventListener('click', () => {
            const letra = tecla.textContent.toLowerCase();
            tecla.disabled = true;
            adicionarLetraUsada(letra);
            palavraOculta = verificarLetra(letra, palavraSorteada, palavraOculta);
            atualizarPalavraOculta(palavraOculta);
        });
    });

    function adicionarLetraUsada(letra) {
        const container = document.getElementById('letras-usadas-container');
        const span = document.createElement('span');
        span.textContent = letra + ' ';
        container.appendChild(span);
    }

    function verificarLetra(letra, palavraSorteada, palavraOculta) {
        let palavraAtual = palavraOculta.split(' ');
        let acertou = false;

        for (let i = 0; i < palavraSorteada.length; i++) {
            if (palavraSorteada[i] === letra) {
                palavraAtual[i] = letra;
                acertou = true;
            }
        }

        if (!acertou) {
            if (tentativas < imagensForca.length) {
                atualizarImagemForca(imagensForca[tentativas]);
                tentativas++;
            } if (tentativas == 7) {
                atualizarImagemForca(imagensForca[6]);
                mostrarMensagemFinal(false, "Fim de jogo! A palavra era: " + palavraSorteada);
            }
        }

        const novaPalavraOculta = palavraAtual.join(' ');

        if (novaPalavraOculta.split(' ').join('') === palavraSorteada) {
            mostrarMensagemFinal(true, "Parabéns, você ganhou!");
        }

        return novaPalavraOculta;
    }

    function atualizarImagemForca(imagem) {
        document.getElementById('imagem-forca').src = imagem;
    }

    function atualizarPalavraOculta(palavraOculta) {
        document.getElementById('palavra-oculta').textContent = palavraOculta;
    }

    function mostrarMensagemFinal(venceu, mensagem) {
        const mensagemFinal = document.getElementById('mensagem-final');
        mensagemFinal.textContent = mensagem;
        if (venceu) {
            mensagemFinal.classList.remove('perdeu');
            mensagemFinal.classList.add('venceu');
        } else {
            mensagemFinal.classList.remove('venceu');
            mensagemFinal.classList.add('perdeu');
        }
    }
});
