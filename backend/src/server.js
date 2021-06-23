const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

//Import Routes
const authRoute = require("./routes/AuthRoute");
const adminRoute = require("./routes/admin/AdminAuthRoute");
const categoryRoute = require("./routes/CategoryRoute");
const productRoute = require("./routes/ProductRoute");
const cartRoute = require("./routes/CartRoute");
const initialDataRoute = require("./routes/admin/InitialDataRoute");
const pageRoute = require("./routes/admin/PageRouter");
const addressRoute = require("./routes/AddressRoute");
const orderRoute = require("./routes/OrderRoute");
const adminOrderRoute = require("./routes/admin/OrderRoute");

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
app.use("/api", authRoute);
app.use("/api", adminRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", initialDataRoute);
app.use("/api", pageRoute);
app.use("/api", addressRoute);
app.use("/api", orderRoute);
app.use("/api", adminOrderRoute);

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
