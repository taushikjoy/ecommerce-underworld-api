const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use(express.json());
dotenv.config();

//connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("succesfull"));

app.listen(5000, () => {
  console.log("success creating server");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// const testSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });

// const Test = mongoose.model("tests", testSchema);

// const createTest = async (req, res) => {
//   try {
//     const newTest = await Test.create(req.body);
//     res.status(200).json({
//       status: "success",

//       data: {
//         test: newTest,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// app.post("/", createTest);
