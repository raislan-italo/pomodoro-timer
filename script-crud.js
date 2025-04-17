// Esta linha pega o botão de adicionar tarefa baseado na classe CSS
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');

// Da mesma forma, esta linha seleciona nosso formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

// E aqui, pegamos a área de texto onde o usuário digita a descrição da tarefa.
const textArea = document.querySelector('.app__form-textarea');

// Esta é a nossa lista (ou array) de tarefas. Ela começa vazia porque ainda não adicionamos nenhuma tarefa.
const listTarefas = [];

// Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
   // Esta linha vai alternar a visibilidade do nosso formulário.
   formAdicionarTarefa.classList.toggle('hidden');
});

// Aqui, estamos ouvindo o evento de 'submit' do nosso formulário. 
// Esse evento ocorre quando tentamos enviar o formulário (geralmente, apertando o botão 'Enter' ou clicando em um botão de submit).
formAdicionarTarefa.addEventListener('submit', (event) => {
   // Esta linha evita que a página recarregue (comportamento padrão de um formulário).
   event.preventDefault();

   // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
   const tarefa = {
      descricao: textArea.value
   }

   // Depois, adicionamos essa tarefa ao nosso array de tarefas.
   listTarefas.push(tarefa);

   // E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
   // Convertendo o array para uma string em formato JSON para poder armazenar.
   localStorage.setItem('tarefa', JSON.stringify(listTarefas));
});