import express from "express";
import bodyParser from "body-parser";
import cryptoRouter from "./router/cryptoRouter"

const PORT: number = parseInt(process.env.NODE_PORT || "3000", 10);
const BASE_URL : string = "/v1";
const app = express();

app.use(bodyParser.json());
app.use(BASE_URL, cryptoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

