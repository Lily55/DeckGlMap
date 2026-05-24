import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

// Эмуляция __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mckFilePath = path.join(__dirname, "./public/mckStation.json");

// 2. Добавить новую точку
app.post("/api/addMckPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(mckFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint); // Добавляем новый объект

    fs.writeFile(mckFilePath, JSON.stringify(points, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send("Ошибка записи");
      res
        .status(201)
        .json({ message: "Точка успешно сохранена", point: newPoint });
    });
  });
});

app.listen(3001, () => console.log("Сервер запущен на порту 3001"));
