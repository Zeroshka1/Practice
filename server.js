const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Подключаем middleware для обработки JSON-данных
app.use(bodyParser.json());

// Подключаем middleware для обработки CORS
app.use(cors());

// Определяем путь к файлу данных
const dataFilePath = path.resolve(__dirname, 'data.json');

// Функция для загрузки данных из файла
function loadData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Если файл не существует или возникает ошибка при чтении, возвращаем пустой массив
    return [];
  }
}

// Функция для сохранения данных в файл
function saveData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

let lastId = 0; // Переменная для хранения последнего идентификатора

// Функция для генерации уникального идентификатора
function generateId() {
  return lastId++; // Возвращаем текущее значение и увеличиваем его на 1
}

// Обработчик POST-запроса для создания нового обращения
app.post('/api/issues', (req, res) => {
  const { name, text } = req.body; // Получаем имя отправителя и текст обращения из запроса
  const newIssue = { id: generateId(), name, text, status: 'Не решено' }; // Создаем новое обращение с дополнительными полями

  // Загружаем текущие данные из файла
  const issues = loadData();

  // Добавляем новое обращение к текущим данным
  issues.push(newIssue);

  // Сохраняем обновленные данные в файл
  saveData(issues);

  res.json(newIssue);
});

// Обработчик GET-запроса для получения списка всех обращений
app.get('/api/issues', (req, res) => {
  const issues = loadData();
  res.json(issues);
});

// Обработчик PUT-запроса для обновления статуса обращения
app.put('/api/issues/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const issues = loadData();

  const issueToUpdate = issues.find(issue => issue.id === parseInt(id));
  if (!issueToUpdate) {
    return res.status(404).json({ message: 'Обращение не найдено' });
  }

  issueToUpdate.status = status;

  saveData(issues);

  res.json(issueToUpdate);
});

// Обработчик DELETE-запроса для удаления обращения
app.delete('/api/issues/:id', (req, res) => {
  const { id } = req.params;

  let issues = loadData();

  const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));
  if (issueIndex === -1) {
    return res.status(404).json({ message: 'Обращение не найдено' });
  }

  issues.splice(issueIndex, 1);

  saveData(issues);

  res.json({ message: 'Обращение успешно удалено' });
});

// Устанавливаем порт, на котором будет работать сервер
const port = 8000;

// Запускаем сервер и слушаем указанный порт
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
