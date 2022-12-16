class DummyJsonProductsRepository {
    #fetcher

    constructor(fetcher) {
        this.#fetcher = fetcher
    }

    async fetchProducts(limit, offset) {
        const endpoint =  this.#buildUrl("products", {
            limit: limit,
            skip: offset,
        })

        return await this.#fetcher.get(endpoint)
    }

    async fetchProductsByCategory(limit, offset, category) {
        const endpoint = this.#buildUrl(`products/category/${category}`, {
            limit: limit,
            skip: offset,
        })

        return await this.#fetcher.get(endpoint)
    }

    async fetchProduct(id) {
        return await this.#fetcher.get(`products/${id}`)
    }

    #buildUrl(endpoint, searchParams) {
        const params = new URLSearchParams()

        for (const key in searchParams) {
            params.append(key, searchParams[key])
        }


        return `${endpoint}?${params.toString()}`
    }
}

export {DummyJsonProductsRepository}