const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const ErrorController = require("./controllers/error");

const db = require("./util/database");

// const expressHbs = require("express-handlebars");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// handlebars template
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", "views");

// pug template
// app.set("view engine", "pug");
// app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products")
  .then((res) => {
    console.log(res[0], res[1]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(ErrorController.get404);

app.listen(3000);
