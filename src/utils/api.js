
const apiUrl = 'http://2021.supportix.ru/server/index.php'


function fetchApi(method, params) {
  const form = new FormData();
  form.append('method', method);

  for ( let key in params ) {
    form.append(`params[${key}]`, params[key]);
  }

  return fetch(apiUrl, {
    method: 'POST',
    body: form
  })
  .then(response => response.json())
  .then(response => response.result);
}

function addUser(user) {
  return fetchApi('addUser', user);
}

function addTodo(todo) {
  return fetchApi('addTodo', todo);
}

function editTodo(todo) {
  return fetchApi('editTodo', todo);
}

function deleteTodo(todoId) {
  return fetchApi('deleteTodo', {todoId: todoId});
}

function getTodos(userId) {
  return fetchApi('getTodos', {userId: userId});
}


export {addUser, addTodo, getTodos, deleteTodo, editTodo};