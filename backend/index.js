const express = require("express");
const app = express();
const mongosse = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/User");
const authRoute = require("./routes/Auth");
const productRoute = require("./routes/Product");
const cartRoute = require("./routes/Cart");
const whislistRoute = require("./routes/Whislist")
const orderRoute = require("./routes/Order");
const stripeRoute = require("./routes/stripe");
const exp = require("constants");
const cors = require("cors");
dotenv.config();


mongosse.connect(
    process.env.MONGO_URL
).then(() => console.log("DBconnect sucessfull"))
    .catch((err) => {
        console.log(err)
    })

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/whislists", whislistRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("backend");
})