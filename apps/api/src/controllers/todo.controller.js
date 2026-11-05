// Contoh data di memori. Ganti dengan database (MySQL, PostgreSQL, MongoDB) nanti.
const todos = [
  { id: 1, title: 'Belajar React', done: false },
  { id: 2, title: 'Belajar Ionic Vue', done: false },
];

export const getTodos = (req, res) => {
  res.json(todos);
};

export const createTodo = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'title wajib diisi' });
  const todo = { id: Date.now(), title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
};
