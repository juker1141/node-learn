const path = require("path");

const express = require("express");
const ErrorController = require("./controllers/error");

const { mongoConnect } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63968ac4bd401c45720e2dff")
    .then((user) => {
      const { name, email, cart, _id } = user;
      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(ErrorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
