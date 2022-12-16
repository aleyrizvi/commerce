export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images?: (string)[] | null;
}

const API_URL = process.env.API_URL

export const fetchProducts = async (limit = 10, offset = 0) => {
    const url = new URL(`${API_URL}/products`)
    url.searchParams.append("limit", limit.toString())
    url.searchParams.append("offset", offset.toString())

    const res = await fetch(url.toString())
    return await res.json()
}

export const fetchProductsByCategory = async (category : string, limit = 10, offset = 0) => {
    const url = new URL(`${API_URL}/products/categories/${category}`)
    url.searchParams.append("limit", limit.toString())
    url.searchParams.append("offset", offset.toString())

    const res = await fetch(url.toString())
    return await res.json()
}

export const fetchProductByID = async(id: number): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`)

    return await res.json()
}

export const fetchCategories = async (): Promise<string[]> => {
    const res = await fetch(`${API_URL}/categories`)
    return await res.json()
}