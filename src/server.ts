import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors()); //Allow everyone
app.use(morgan("dev"));
app.use(express.json()); //Allow client to send json
app.use(express.urlencoded({ extended: true })); //Converts query params into an object

// Creating custom middleware
// app.use((req,res, next) => {
//   req.shhhh_dont_tell_anyone = "I'm a secret";
//   next()
// })

app.get("/", (req, res) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello from express" });
});

app.use("/api", router);

export default app;
