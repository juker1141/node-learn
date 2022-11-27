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

  Product.findById(prodId, (product) => {
    console.log(product);
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
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  let priceNum = price;
  if (typeof price === "string") priceNum = parseFloat(price);

  const product = new Product(null, title, imageUrl, priceNum, description);
  product
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  let priceNum = price;
  if (typeof price === "string") priceNum = parseFloat(price);

  const product = new Product(
    productId,
    title,
    imageUrl,
    priceNum,
    description
  );
  product.save();

  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId);

  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
