import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mckFilePath = path.join(__dirname, "./public/mckStation.json");

app.post("/api/addMckPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(mckFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint);

    fs.writeFile(mckFilePath, JSON.stringify(points, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send("Ошибка записи");
      res
        .status(201)
        .json({ message: "Точка успешно сохранена", point: newPoint });
    });
  });
});

const mcdFilePath = path.join(__dirname, "./public/mcdStation.json");

app.post("/api/addMcdPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(mcdFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint);

    fs.writeFile(mcdFilePath, JSON.stringify(points, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send("Ошибка записи");
      res
        .status(201)
        .json({ message: "Точка успешно сохранена", point: newPoint });
    });
  });
});

const metroFilePath = path.join(__dirname, "./public/metroStation.json");

app.post("/api/addMetroPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(metroFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint);

    fs.writeFile(metroFilePath, JSON.stringify(points, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send("Ошибка записи");
      res
        .status(201)
        .json({ message: "Точка успешно сохранена", point: newPoint });
    });
  });
});

const busTramStopsFilePath = path.join(__dirname, "./public/busTramStops.json");

app.post("/api/addBusTramStopPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(busTramStopsFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint);

    fs.writeFile(
      busTramStopsFilePath,
      JSON.stringify(points, null, 2),
      (writeErr) => {
        if (writeErr) return res.status(500).send("Ошибка записи");
        res
          .status(201)
          .json({ message: "Точка успешно сохранена", point: newPoint });
      },
    );
  });
});

const streetsFilePath = path.join(__dirname, "./public/StreetsPedestrian.json");

app.post("/api/addStreetPoint", (req, res) => {
  const newPoint = req.body;

  fs.readFile(streetsFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения");

    const points = JSON.parse(data);
    points.features.push(newPoint);

    fs.writeFile(
      streetsFilePath,
      JSON.stringify(points, null, 2),
      (writeErr) => {
        if (writeErr) return res.status(500).send("Ошибка записи");
        res
          .status(201)
          .json({ message: "Точка успешно сохранена", point: newPoint });
      },
    );
  });
});

app.listen(3001, () => console.log("Сервер запущен на порту 3001"));
