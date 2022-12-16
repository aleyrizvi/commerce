import Gallery from "@components/Gallery"
import { getLayout } from "@layouts/mainLayout"
import { Stack, Box, ActionIcon, Grid, Text, Title, Button } from "@mantine/core"
import { IconArrowNarrowLeft } from "@tabler/icons"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { fetchProductByID, fetchProducts, Product } from "requests/request"

const ProductPage = ({title,description, brand, images}: Product) => {
    const router = useRouter()
    return (
        <Stack>
            <Box>
                <ActionIcon component="a" onClick={() => router.back()} variant={"light"}>
                    <IconArrowNarrowLeft size={88} />
                </ActionIcon>
            </Box>

            <Grid grow>
                <Grid.Col md={6}>
                    <Gallery links={images as string[]} />
                </Grid.Col>
                <Grid.Col md={6} px={"lg"}>
                    <Stack spacing={30}>
                        <Stack spacing={0}>
                            <Title color={"gray.7"} order={1}>{title.toUpperCase()}</Title>
                            <Text fw={500} size={"xs"} color={"gray.7"}>brand: {brand}</Text>
                            <Text size={"xs"} color={"gray.5"}>{description}</Text>
                        </Stack>

                        <Button radius="xl" style={{flex: 1, padding: "10px 0px"}}>
                            BUY NOW
                        </Button>
                    </Stack>
                </Grid.Col>
            </Grid>

        </Stack>
    )
}

ProductPage.layout = getLayout

export default ProductPage

export const getStaticProps: GetStaticProps = async ({params}) => {
    const product: Product = await fetchProductByID(parseInt(params?.id as string))
    return {
        props: product,
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts(50,0)

    let pathParams: { params: { id: string } }[] = []

    products.products.map((product: Product) => {
        pathParams.push({
            params: {
                id: product.id.toString()
            }
        })
    })

    return {
        paths: pathParams,
        fallback: false,
    }
}