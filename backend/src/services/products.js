class ProductsService {
    #repo

    constructor(repo) {
        this.#repo = repo
    }

    async getProducts(limit, offset) {
        return await this.#repo.fetchProducts(limit, offset)
    }

    async getProductsByCategory(limit, offset, category) {
        return await this.#repo.fetchProductsByCategory(limit, offset, category)
    }

    async getProduct(id) {
        return await this.#repo.fetchProduct(id)
    }
}

export {ProductsService}