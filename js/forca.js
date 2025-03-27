document.addEventListener("DOMContentLoaded", () => {
    const teclas = document.querySelectorAll('.tecla');
    const palavrasAnimais = [
        "macaco", "orca", "pardal", "cavalo", "baleia", "boi", "vaca", "castor", "cachorro", "gato",
        "elefante", "girafa", "leao", "tigre", "urso", "zebra", "cervo", "rinoceronte", "hipopotamo", "canguru",
        "lobo", "raposa", "javali", "camelo", "dromedario", "pinguim", "foca", "golfinho", "tartaruga", "jacare",
        "crocodilo", "cobra", "iguana", "lagarto", "papagaio", "arara", "canario", "pato", "ganso", "galinha",
        "pavao", "coruja", "falcao", "aguia", "morcego", "tucano", "loboguara", "tamandua", "capivara", "onca",
        "jaguatirica", "guaxinim", "lontra", "peixeboi", "golfinhorosa", "mamute",
        "dodo", "avestruz", "anta", "bichopreguica", "porcoespinho", "ourico",
        "coelho", "lebre", "hamster", "rato", "camundongo", "toupeira", "gamba", "esquilo", "lemure", "chimpanze",
        "gorila", "orangotango", "abelha", "vespa", "formiga", "borboleta", "mariposa", "grilo",
        "gafanhoto", "besouro", "polvo", "lula", "caranguejo",
        "lagosta", "camarao", "siri", "tubarão", "raia"
    ];
    const palavrasAlimentos = [
        "batata", "abacate", "lagosta", "abacaxi", "cebola", "cogumelo", "uva", "brocolis", "banana", "laranja",
        "maca", "pera", "manga", "melancia", "morango", "kiwi", "ameixa", "cereja", "pessego", "goiaba",
        "abobora", "cenoura", "beterraba", "mandioca", "inhame", "chuchu", "pepino", "tomate", "pimentao", "berinjela",
        "alface", "couve", "espinafre", "rucula", "agriao", "salsa", "coentro", "manjericao", "alecrim", "hortela",
        "arroz", "feijao", "milho", "trigo", "aveia", "cevada", "quinoa", "soja", "lentilha",
        "queijo", "leite", "iogurte", "manteiga", "creme", "requeijao", "nata", "carne", "frango", "peixe",
        "porco", "bacon", "presunto", "salame", "salsicha", "linguiça", "ovo", "pao", "bolo", "biscoito",
        "chocolate", "doce", "sorvete", "pudim", "gelatina", "torta", "pizza", "hamburguer", "batatafrita", "pipoca",
        "macarrao", "lasanha", "nhoque", "risoto", "sushi", "temaki", "sashimi", "ramen", "taco", "burrito",
        "nachos", "guacamole", "cuscuz", "farofa", "feijoada", "moqueca", "acaraje", "esfirra", "quibe", "tabule"
    ];
    const palavras = palavrasAnimais.concat(palavrasAlimentos);
    let palavraSorteada = escolherPalavra();
    let palavraOculta = criarPalavraOculta(palavraSorteada);
    let tentativas = 1;

    const imagensForca = [
        "./imagens/forca.png",
        "./imagens/cabeca.png",
        "./imagens/corpo.png",
        "./imagens/braco_esquerdo.png",
        "./imagens/braco_direito.png",
        "./imagens/perna_esquerda.png",
        "./imagens/perna_direita.png"
    ];

    function inicializarJogo() {
        document.getElementById('palavra-oculta').textContent = palavraOculta;
        teclas.forEach(tecla => {
            tecla.disabled = false;
            tecla.removeEventListener('click', clicarTecla);
            tecla.addEventListener('click', clicarTecla);
        });
        document.getElementById('reiniciar-btn').addEventListener('click', reiniciarJogo);
    }

    function clicarTecla(event) {
        const letra = event.target.textContent.toLowerCase();
        event.target.disabled = true;
        adicionarLetraUsada(letra);
        palavraOculta = verificarLetra(letra, palavraSorteada, palavraOculta);
        atualizarPalavraOculta(palavraOculta);
    }

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

    function reiniciarJogo() {
        palavraSorteada = escolherPalavra();
        palavraOculta = criarPalavraOculta(palavraSorteada);
        tentativas = 1;

        document.getElementById('palavra-oculta').textContent = palavraOculta;
        document.getElementById('imagem-forca').src = imagensForca[0];
        document.getElementById('letras-usadas-container').innerHTML = '';
        document.getElementById('mensagem-final').textContent = '';

        teclas.forEach(tecla => {
            tecla.disabled = false;
        });
    }

    function escolherPalavra() {
        return palavras[Math.floor(Math.random() * palavras.length)];
    }

    function criarPalavraOculta(palavra) {
        return Array(palavra.length).fill('_').join(' ');
    }

    inicializarJogo();
});