const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  { id: 1, title: "Projeto 01", tasks: [] },
  { id: 2, title: "Projeto 12", tasks: [] },
  { id: 3, title: "Projeto 03", tasks: [] }
];

//Visualiza projetos
server.get(`/projects`, (req, res) => {
  return res.json(projects);
});

//Adiciona projetos
server.post(`/projects`, (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

//Modifica nome do projeto
server.put(`/projects/:id`, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const getIndex = projects.findIndex(project => project.id == id);

  projects[getIndex].title = title;

  return res.json(projects);
});

//Deleta o projeto
server.delete(`/projects/:id`, (req, res) => {
  const { id } = req.params;

  const getIndex = projects.findIndex(project => project.id == id);

  projects.splice(getIndex, 1);

  return res.json(projects);
});

//Adiciona tarefa ao projeto
server.post(`/projects/:id/tasks`, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const getIndex = projects.findIndex(project => project.id == id);

  projects[getIndex].tasks.push(title);

  return res.json(projects);
});

server.listen(3000, console.log("Iniciando servidor na porta 3000"));
