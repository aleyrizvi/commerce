import Search from "@components/Search"
import { getLayout } from "@layouts/mainLayout"
import { getSearchServerSideProps } from "@lib/search-props"
import { GetServerSideProps } from "next"
import { Product } from "requests/request"

export interface ProductsProp {
    products: Product[],
        limit: number,
        offset: number,
        total: number
}

export interface SearchProps {
    products: ProductsProp
    categories: string[]
    activeCategory: string
}

const ProductListingPage = ({products, categories, activeCategory}: SearchProps) => {
    return (
        <Search activeCategory={activeCategory} products={products} categories={categories} />
    )
}

ProductListingPage.layout = getLayout

export default ProductListingPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getSearchServerSideProps(context)
}