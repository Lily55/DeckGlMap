import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

// Эмуляция __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Теперь эта строчка будет работать без ошибок!
const filePath = path.join(__dirname, "points.json");

// Инициализация пустого файла, если его нет
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// 2. Добавить новую точку
app.post("/api/points", (req, res) => {
  const newPoint = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.push(newPoint); // Добавляем новый объект

    fs.writeFile(filePath, JSON.stringify(points, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send("Ошибка записи");
      res
        .status(201)
        .json({ message: "Точка успешно сохранена", point: newPoint });
    });
  });
});

app.listen(3001, () => console.log("Сервер запущен на порту 3000"));
