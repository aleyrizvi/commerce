import {Router} from "express"

class ProductsRouter {
    #mount
    #service

    constructor(service) {
        this.#mount = "/products"
        this.#service = service
    }

    bootstrap(app) {
        const router = Router()

        // GET [/products] - fetch all products. supports query params for pagination
        router.get("/", (req, res) => {

            try {
                const limit = req.query.limit ?? 10
                const offset = req.query.offset ?? 0

                this.#service.getProducts(limit, offset).then(data => res.status(data.status).json(data.data))
            } catch (e) {
                console.log(e)
                res.status(500).json({})
            }
        })

        // GET [/products/categories/:category] - fetch all products of a category. supports query params for pagination
        router.get("/categories/:category", (req, res) => {
            try {
                let {category} = req.params
                const limit = req.query.limit ?? 10
                const offset = req.query.offset ?? 0

                this.#service.getProductsByCategory(limit, offset, category).then(data => res.status(data.status).json(data.data))
            } catch (e) {
                console.log(e)
                res.status(500).json({})
            }
        })

        // GET [/products/:id] - fetch single product by id
        router.get("/:id", (req, res) => {
            const {id} = req.params
            try {
                this.#service.getProduct(id).then(data => res.status(data.status).json(data.data))
            } catch (e) {
                console.log(e)
                res.status(500).json(e)
            }

        })


        app.use(this.#mount, router)
    }
}

export {ProductsRouter}