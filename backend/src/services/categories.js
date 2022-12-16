class CategoriesService {
    #repo

    constructor(repo) {
        this.#repo = repo
    }

    async getAllCategories() {
        return await this.#repo.fetchCategories()
    }

    async getProductsByCategory(category) {
        return await this.#repo.fetchProductsByCategory(category)
    }
}

export {CategoriesService}