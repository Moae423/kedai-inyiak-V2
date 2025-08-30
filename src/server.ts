import express from "express";
import cors from "cors";
import "dotenv/config";
import AuthRoute from "./routes/Auth";
import Route from "./routes/route";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", AuthRoute);
app.use("/kedai-inyiak", Route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
