import {Router} from "express"

class CategoriesRouter {
    #mount
    #service

    constructor(service) {
        this.#mount = "/categories"
        this.#service = service
    }

    bootstrap(app) {
        const router = Router()

        // [/categories] - fetch all categories
        router.get("/", (req, res) => {
            this.#service.getAllCategories().then(data => res.status(data.status).json(data.data))
        })

        app.use(this.#mount, router)
    }
}

export {CategoriesRouter}