const express = require("express")
const router = express.Router()

//controllers - admin
const { adminCategoryRouter } = require('../app/controllers/admin/CategoryController')
const { adminProductRouter } = require('../app/controllers/admin/ProductController')
const { adminUserRouter } = require('../app/controllers/admin/UserController')
const { adminOrderRouter } = require('../app/controllers/admin/OrderController')

//controllers - users
const { userRouter } = require('../app/controllers/UserController')
const { addressRouter } = require('../app/controllers/AddressController')
const { cartRouter } = require('../app/controllers/CartController')
const { categoryRouter } = require('../app/controllers/CategoryController')
const { orderRouter } = require('../app/controllers/OrderController')
const { productRouter } = require('../app/controllers/ProductController')
const { wishlistRouter } = require('../app/controllers/WishlistController')

//routes - admin
router.use("/admin/categories", adminCategoryRouter)
router.use("/admin/products", adminProductRouter)
router.use("/admin/users", adminUserRouter)
router.use("/admin/orders", adminOrderRouter)

//routes - users
router.use("/users", userRouter)
router.use("/address", addressRouter)
router.use("/cart", cartRouter)
router.use("/categories", categoryRouter)
router.use("/orders", orderRouter)
router.use("/products", productRouter)
router.use("/wishlists", wishlistRouter)

module.exports = {
    routes: router
}