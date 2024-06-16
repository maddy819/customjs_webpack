import express from "express";
import path from "path";
import cors from "cors";
import open from "open";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "dist");

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

// gets the static files from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Showing that the server is online and running and listening for changes
app.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
  open(`http://127.0.0.1:${port}`);
});
