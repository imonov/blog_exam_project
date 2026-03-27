import express from "express";
import cors from "cors";
import { apiRouter } from "./router/index.js";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server address: http://127.0.0.1:${PORT}`);
});
