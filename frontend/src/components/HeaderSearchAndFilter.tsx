import { createStyles, Text, Divider, Flex, Group, Select } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface Category {
    value: string
    label: string
}

const useStyle = createStyles((theme) => ({
    container: {
        width: "100%",
    },
}))

const pageLimitData = [
    {
        value: "10",
        label: "10",
    },
    {
        value: "25",
        label: "25",
    },
    {
        value: "50",
        label: "50",
    },
]

const HeaderSearchAndFilter = ({
                                   categories = [],
                                   activeCategory,
                               }: { categories: string[], activeCategory: string | null }) => {
    const router = useRouter()
    const [ currentLimit, setLimit ] = useState("10")
    const [ currentURL, setURL ] = useState<URL | null>(null)
    const [ searchCategories, setSearchCategories ] = useState<Category[]>([])

    const handleChangeLimit = (limit: string) => {
        setLimit(limit)

        currentURL?.searchParams.set("limit", limit.toString())
        router.push((currentURL as URL).toString())
    }

    const handleChangeCategory = (category: string) => {
        if (category === "all") {
            (currentURL as URL).pathname = "/"

            router.push((currentURL as URL).toString())
            return
        }
        currentURL?.searchParams.set("offset", "0");

        (currentURL as URL).pathname = `/${category}`
        router.push((currentURL as URL).toString())
    }

    const categoriesData = () => {
        const c: Category[] = [ {
            value: "all",
            label: "All",
        } ]

        for (const category of categories) {
            c.push({
                value: category,
                label: category.replace("-", " "),
            })
        }

        setSearchCategories(c)
    }

    useEffect(() => {
        const url = new URL(window.location.href)
        const limit = url.searchParams.get("limit") ?? "10"

        setLimit(limit)
        setURL(url)

        // set categories
        categoriesData()
    }, [])

    const {classes} = useStyle()
    return (
        <Flex gap={"lg"} className={classes.container} mb={"lg"} p={"lg"}>
            <Select
                label="Category"
                value={activeCategory}
                onChange={handleChangeCategory}
                data={searchCategories as Category[]}
            />
            <Select
                label="Records per page"
                value={currentLimit}
                onChange={handleChangeLimit}
                data={[
                    {
                        value: "10",
                        label: "10",
                    },
                    {
                        value: "25",
                        label: "25",
                    },
                    {
                        value: "50",
                        label: "50",
                    },
                ]}
            />
        </Flex>
    )
}

export default HeaderSearchAndFilter