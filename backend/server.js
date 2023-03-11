const express = require("express");
const app = express();
app.use(express.json());
const { getAudioDurationInSeconds } = require("get-audio-duration");
const cors = require("cors");
app.use(cors());

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/uploads");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, ""));
  },
});

const upload = multer({ storage: fileStorageEngine });

const generateFiles = async () =>
  await fs.promises
    .readdir(directoryPath, (error, files) => files)
    .catch((error) => console.log(error));

const generateTracks = async (files) => {
  const promises = files.map((file) =>
    getAudioDurationInSeconds(`${directoryPath}/${file}`).then((duration) => {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.round(duration - minutes * 60);
      return {
        title: file,
        duration: `${minutes}:${seconds}`,
        seconds: Math.round(duration),
      };
    })
  );
  return Promise.all(promises);
};

app.get("/", async (req, res) => {
  console.log(__dirname);
  const files = await generateFiles();
  const tracks = await generateTracks(files);
  res.status(200).send(tracks);
});

app.put("/:id", (req, res) => {
  fs.rename(
    `${directoryPath}/${req.params.id}`,
    `${directoryPath}/${req.body.title}`,
    () => {
      console.log(
        `${directoryPath}/${req.params.id} has been renamed ${directoryPath}\\${req.body.title}`
      );
    }
  );
});

app.delete("/:id", (req, res) => {
  console.log("request parameters", req.params);
  fs.unlink(`${directoryPath}/${req.params.id}`, (err) => {
    if (err) throw err;
    console.log(`${directoryPath} was deleted`);
  });
});

app.post("/upload", upload.single("track"), async (req, res) => {
  const duration = await getAudioDurationInSeconds(
    `${directoryPath}/${req.file.filename}`
  );
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration - minutes * 60);
  const track = {
    title: req.file.filename,
    duration: `${minutes}:${seconds}`,
    seconds: Math.round(duration),
  };
  res.json(track);
});

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server started on port 5000"));
