const authRoutes = require("../routes/auth");
const productRoutes=require('../routes/products')

exports.routeLoader = (app) => {
    app.use(authRoutes.router);
    app.use(productRoutes.router);
}