const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//importing routes
const userRouter = require("./routes/user");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();

//connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("succesfull"));

app.listen(process.env.PORT || 5000, () => {
  console.log("success creating server");
});

app.get('/' , (req,res)=> res.send('sdjhfgbjhdsb'))

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
