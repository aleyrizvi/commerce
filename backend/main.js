import express from "express"
import {CategoriesRouter, ProductsRouter} from "./src/routes/index.js";
import {DummyJsonCategoryRepository} from "./src/repositories/categories.js";
import {FetchAdapter} from "./src/repositories/fetchAdapter.js";
import {CategoriesService} from "./src/services/categories.js";
import {PORT, BASE_URL} from "./src/config/index.js"
import {ProductsService} from "./src/services/products.js";
import {DummyJsonProductsRepository} from "./src/repositories/products.js";

// express instance
const app = express()

// *********************
// repositories
// *********************
const fetcher = new FetchAdapter(BASE_URL)
const categoryRepo = new DummyJsonCategoryRepository(fetcher)
const productRepo = new DummyJsonProductsRepository(fetcher)

// *********************
// services
// *********************
const categoriesService = new CategoriesService(categoryRepo)
const productsService = new ProductsService(productRepo)

// *********************
// routes bootstrapping
// *********************
const categoriesRoutes = new CategoriesRouter(categoriesService)
categoriesRoutes.bootstrap(app)

const productsRoutes = new ProductsRouter(productsService)
productsRoutes.bootstrap(app)

// start server
app.listen(PORT, () => {
    console.log(`Api server up and running on port: ${PORT}`)
})