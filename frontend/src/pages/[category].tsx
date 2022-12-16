import Search from "@components/Search"
import { getLayout } from "@layouts/mainLayout"
import { getSearchServerSideProps } from "@lib/search-props"
import { SearchProps } from "@pages/index"
import { GetServerSideProps } from "next"

const CategoryPage = ({categories, products, activeCategory}: SearchProps) => {
    return (
        <Search activeCategory={activeCategory} products={products} categories={categories} />
    )
}

CategoryPage.layout = getLayout

export default CategoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getSearchServerSideProps(context)
}