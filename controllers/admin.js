const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // use html
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  // use html template engine
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeProduct: true,
    formsCSS: true,
    productCSS: true,
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      if (!product) res.redirect("/");

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        activeProduct: true,
        formsCSS: true,
        productCSS: true,
        editing: editMode,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  let priceNum = price;
  if (typeof price === "string") priceNum = parseFloat(price);

  req.user
    .createProduct({
      title,
      price: priceNum,
      imageUrl,
      description,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  let priceNum = price;
  if (typeof price === "string") priceNum = parseFloat(price);

  req.user
    .getProducts({ where: { id: productId } })
    .then((product) => {
      product.title = title;
      product.price = priceNum;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("Update product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Destroyed product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
