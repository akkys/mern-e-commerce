const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

//Import Routes
const authRoutes = require("./routes/AuthRoute");
const adminRoutes = require("./routes/admin/AdminAuthRoute");
const categoryRoute = require("./routes/CategoryRoute");
const productRoute = require("./routes/ProductRoute");
const cartRoute = require("./routes/CartRoute");
const initialDataRoute = require("./routes/admin/InitialDataRoute");

const app = express();

env.config();

const port = process.env.PORT;
const DB = process.env.MONGO_URI;

mongoose.connect(
  DB,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  },
  () => {
    console.log("MongoDB is connected");
  }
);

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", initialDataRoute);

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
