import express from "express";
import router from "./router";
import db from "./models";
import helmet from "helmet";
import cors from "cors";
import PORT from "./config/config"

const app = express();

app
  .use(helmet())
  .use(cors())
  .use(express.json())
  .use(router);

(async function () {
  try {
    db;
    app.listen(PORT, () => {
      console.log("🐻 server running on port: ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();
