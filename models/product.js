const { getDb } = require("../util/database");

module.exports = class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // save() {
  //   return db.execute(
  //     "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
  //     [this.title, this.price, this.imageUrl, this.description]
  //   );
  // }

  // static deleteById(id) {}

  // static fetchAll() {
  //   return db.execute("SELECT * FROM products");
  // }

  // static findById(id) {
  //   return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  // }
};

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;
