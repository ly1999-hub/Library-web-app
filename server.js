require('dotenv').config();
var express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true});

const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const transactionRoute = require("./routes/transactions");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile");
const cartRoute=require('./routes/cart.route');

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware=require('./middlewares/session.middleware');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_S));
app.use(sessionMiddleware);


app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", bookRoute);
app.use("/users",  authMiddleware.requireAuth, userRoute);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  transactionRoute
);
app.use("/profile",authMiddleware.requireAuth,profileRoute);
app.use("/auth", authRoute);
app.use('/cart',cartRoute);
app.use(express.static("public"));

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " +process.env.PORT );
});
