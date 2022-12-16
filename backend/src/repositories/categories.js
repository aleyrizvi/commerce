class DummyJsonCategoryRepository {
    #fetcher

    constructor(fetcher) {
        this.#fetcher = fetcher
    }

    async fetchCategories() {
        return await this.#fetcher.get("products/categories")
    }

    async fetchProductsByCategory(category) {
        return await this.#fetcher.get(`products/category/${category}`)
    }
}

export {DummyJsonCategoryRepository}