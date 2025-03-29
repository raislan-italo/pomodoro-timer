// Armazenando a referência dos elementos do documento
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-button-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// Função altera o contexto de certos elementos
function alterarContexto(contexto) {
   mostrarTempo();

   // Remove a classe active de todos os botões do card
   botoes.forEach(function (botao) {
      botao.classList.remove('active');
   });

   html.setAttribute('data-contexto', contexto);   // Plano de fundo dinâmico
   banner.setAttribute('src', `/imagens/${contexto}.png`);  // Altera o banner

   // Mudando o texto(h1) do banner dinamicante
   switch (contexto) {
      case 'foco':
         titulo.innerHTML = 
            `
               Otimize sua produtividade,<br>
               <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
         break;
      
      case 'descanso-cuto':
         titulo.innerHTML = 
            `
               Que tal dar uma respirada?
               <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
         break;
      
      case 'descanso-longo':
         titulo.innerHTML = 
         `
            Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
         `;
         break;
   }
}

// Adiciona uma rotina ao evento de click no botão foco
focoBt.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 1500;
   alterarContexto('foco');
   focoBt.classList.add('active');
});

// Adiciona uma rotina ao evento de click no botão pausa curta
curtoBt.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtoBt.classList.add('active');
});

// Adiciona uma rotina ao evento de click no botão pausa longa
longoBt.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 900;
   alterarContexto('descanso-longo');
   longoBt.classList.add('active');
});

musica.loop = true;  // Faz a música se repetir infitamente

// Controle da música de acordo com a mudança do checkbox
musicaFocoInput.addEventListener('change', () => {
   if (musica.paused) { // Se a música estiver pausada
      musica.play();    // Permite o play
   }
   else {   // Caso contrário
      musica.pause();   // Permite o pause
   }
});

function zerar() {
   clearInterval(intervaloId);
   iniciarOuPausarBt.textContent = 'Começar';
   iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png');
   intervaloId = null;
}

const contagemRegressiva = () => {
   if (tempoDecorridoEmSegundos <= 0) {
      zerar();
      audioTempoFinalizado.play();
      alert('Tempo finalizado');
      return;
   }
   tempoDecorridoEmSegundos -= 1;
   mostrarTempo();
}

function iniciarOuPausar() {
   if (intervaloId) {
      audioPausa.play();
      zerar();
      return;
   }
   audioPlay.play();
   intervaloId = setInterval(contagemRegressiva, 1000);
   iniciarOuPausarBt.textContent = 'Pausar';
   iniciarOuPausarBtIcone.setAttribute('src', '/imagens/pause.png');
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function mostrarTempo() {
   const tempo = new Date(tempoDecorridoEmSegundos * 1000);
   const tempoformatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});
   tempoNaTela.innerHTML = `${tempoformatado}`;
}

mostrarTempo();
