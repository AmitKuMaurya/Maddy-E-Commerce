const { Router } = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProducts,
    getDetailedProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview,
    getAdminProducts,
} = require("../controllers/product.controller");
const {
    isAuthenticatedUser,
    isAuthurized,
} = require("../middlewares/authentification");

const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/admin/products",isAuthenticatedUser,isAuthurized("admin"),getAdminProducts);
productRouter.post(
    "/admin/product/new",
    isAuthenticatedUser,
    isAuthurized("admin"),
    createProduct
);
productRouter.put(
    "/admin/product/:id",
    isAuthenticatedUser,
    isAuthurized("admin"),
    updateProduct
);
productRouter.delete(
    "/admin/product/:id",
    isAuthenticatedUser,
    isAuthurized("admin"),
    deleteProducts
);
productRouter.get("/product/:id", getDetailedProduct);
productRouter.put("/review", isAuthenticatedUser, createProductReview);
productRouter.get("/reviews", getProductReviews);
productRouter.delete("/reviews", isAuthenticatedUser, deleteProductReview);

module.exports = { productRouter };
