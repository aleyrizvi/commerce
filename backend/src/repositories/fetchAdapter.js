import fetch from "node-fetch";

class FetchAdapter {
    #baseUrl
    constructor(baseUrl) {
        this.#baseUrl = baseUrl
    }

    async get(endpoint) {
        let url = this.#formatUrl(endpoint)

        const response = await fetch(url)
        const data = await response.json()
        const status = response.status

        return {
            status,
            data,
        }
    }

    #formatUrl(endpoint) {
        return `https://${this.#baseUrl}/${endpoint}`
    }
}

export {FetchAdapter}