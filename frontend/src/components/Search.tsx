import HeaderSearchAndFilter from "@components/HeaderSearchAndFilter"
import ProductCard from "@components/ProductCard"
import { Flex, Grid, Pagination } from "@mantine/core"
import { ProductsProp } from "@pages/index"
import { useRouter } from "next/router"


export interface Props {
    products: ProductsProp,
    categories: string[],
    activeCategory: string|null
}

const Search = ({products, categories, activeCategory}: Props) => {
    const router = useRouter()
    const handlePageChange = (page: number) => {
        const url = new URL(window.location.href)
        url.searchParams.set("offset", (products.limit * (page -1)).toString())
        router.push(url.toString())
    }
    const productCards = products.products.map((v, i) => (
        <Grid.Col key={i} md={4}>
            <ProductCard
                product={v}
            />
        </Grid.Col>
    ))

    return (
        <div>
            <Flex gap={"lg"} direction={"column"} align="center">
                <HeaderSearchAndFilter activeCategory={activeCategory} categories={categories} />
                <Grid justify={"center"} gutter={"xl"}>
                    {productCards}
                </Grid>

                <Pagination onChange={handlePageChange} total={Math.ceil(products.total / products.limit)}
                            initialPage={Math.ceil(products.offset / products.limit)} />
            </Flex>
        </div>
    )
}

export default Search