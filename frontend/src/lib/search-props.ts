import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "requests/request"

export const getSearchServerSideProps: GetServerSideProps = async ({query, params}) => {
    const activeCategory = params?.category ?? null
    const limit = query.limit ?? 10
    const offset = query.offset ?? 0
    const categories = await fetchCategories()

    let products
    if (activeCategory) {
        products = await fetchProductsByCategory(activeCategory as string, limit as number, offset as number)
    } else {
        products = await fetchProducts(limit as number, offset as number)
    }

    return {
        props: {
            products: {
                products: products.products,
                total: products.total,
                offset: products.skip,
                limit: products.limit,
            },
            categories,
            activeCategory : activeCategory ?? "all"
        },
    }
}

export type getServerSideProps = InferGetServerSidePropsType<
    typeof getSearchServerSideProps
    >