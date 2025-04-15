console.log("🎉 This app.js is fully loaded");

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import { userRoutes } from "./routes/user.routes.js";
import { mainRoute } from "./routes/index.js";
import errorMidddleware from "./middleware/error.middleware.js";

const app = express();

//middleswares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//Routes go here
// app.post("/test", (req, res) => {
//   res.send("Test POST route works!");
// });

app.use("/api/v1", mainRoute);
// app.use("/api/v1", userRoutes);

//Error handling middleware go here
app.use(errorMidddleware);

export default app;
