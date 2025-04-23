// Esta linha pega o botão de adicionar tarefa baseado na classe CSS
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');

// Seleciona o botão de cancelar do formulário
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');

// Da mesma forma, esta linha seleciona nosso formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

// Pega a área de texto onde o usuário digita a descrição da tarefa.
const textArea = document.querySelector('.app__form-textarea');

const ulTarefas = document.querySelector('.app__section-task-list');

// Parse pega uma string e se ela for um JSON formatado, ele vai conseguir tranformá-la
let listTarefas = JSON.parse(localStorage.getItem('tarefa')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

// Função para limpar o campo da textArea e esconder o formulário
const limparFormulario = () => {
   textArea.value = ''; // Limpa o conteúdo da textArea
   formAdicionarTarefa.classList.add('hidden'); // Adicione a classe 'hidden' ao formulário para escondê-lo
};

function atualizarTarefas() {
   // Convertendo o array para uma string em formato JSON para poder armazenar.
   localStorage.setItem('tarefa', JSON.stringify(listTarefas));
}

function criarElementoTarefa(tarefa) {
   const li = document.createElement('li');
   li.classList.add('app__section-task-list-item');

   const svg = document.createElement('svg');
   svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
         <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
   `;

   const paragrafo = document.createElement('p');
   paragrafo.classList.add('app__section-task-list-item-description');
   paragrafo.textContent = tarefa.descricao;

   const botao = document.createElement('button');
   botao.classList.add('app_button-edit');

   botao.onclick = () => {
      // debugger
      const novaDescricao = prompt('Qual é o novo novo nome da tarefa?');
      // console.log('Nova descricao da tarefa: ', novaDescricao);

      if (novaDescricao) {
         paragrafo.textContent = novaDescricao;
         tarefa.descricao = novaDescricao;
         atualizarTarefas();
      }

   }

   const imagemBotao = document.createElement('img');
   imagemBotao.setAttribute('src', '/imagens/edit.png');

   botao.append(imagemBotao);
   li.append(svg);
   li.append(paragrafo);
   li.append(botao);
   
   if (tarefa.completa) {
      li.classList.add('app__section-task-list-item-complete');
      botao.setAttribute('disabled', 'disabled');
   } else {
      li.onclick = () => {
   
         document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
               elemento.classList.remove('app__section-task-list-item-active')
            });
         
         if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
         }
   
         tarefaSelecionada = tarefa;
         liTarefaSelecionada = li;
         paragrafoDescricaoTarefa.textContent = tarefa.descricao;
   
         li.classList.add('app__section-task-list-item-active');
      };
   }

   return li;
}

// Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
   // Esta linha vai alternar a visibilidade do nosso formulário.
   formAdicionarTarefa.classList.toggle('hidden');
});

// Associa a função limparFormulario ao evento de clique do botão Cancelar
btnCancelarTarefa.addEventListener('click', limparFormulario);

// Aqui, estamos ouvindo o evento de 'submit' do nosso formulário. 
formAdicionarTarefa.addEventListener('submit', (event) => {
   // Esta linha evita que a página recarregue (comportamento padrão de um formulário).
   event.preventDefault();

   // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
   const tarefa = {
      descricao: textArea.value
   }

   const elementoTarefa = criarElementoTarefa(tarefa);
   ulTarefas.append(elementoTarefa);

   // Depois, adicionamos essa tarefa ao nosso array de tarefas.
   listTarefas.push(tarefa);

   atualizarTarefas();

   textArea.value = '';
   formAdicionarTarefa.classList.add('hidden');
});

listTarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa);   
   ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
   if (tarefaSelecionada && liTarefaSelecionada) {
      liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
      liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
      liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
      tarefaSelecionada.completa = true;
      atualizarTarefas();
   }
})

const removerTarefas = (somenteCompletas) => {
   const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
   document.querySelectorAll(seletor).forEach(elemento => {
      elemento.remove();
   });

   listTarefas = somenteCompletas ? listTarefas.filter(tarefa => !tarefa.completa) : [];
   atualizarTarefas();
}

btnRemoverConcluidas.onclick = () => {
   removerTarefas(true);
}
btnRemoverTodas.onclick = () => {
   removerTarefas(false);
}