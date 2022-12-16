import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Center,
    Button,
    Tooltip,
    Grid,
    Rating, AspectRatio,
} from "@mantine/core"
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from "@tabler/icons"
import { Product } from "requests/request"

const useStyles = createStyles((theme) => ({
    card: {
        alignItems: "stretch",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        width: 300,
    },

    imageSection: {
        display: "flex",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: "uppercase",
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    icon: {
        marginRight: 5,
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
    },
}))

export interface ProductProps {
    product: Product
}

const ProductCard = ({
                         product: {
                             brand,
                             category,
                             discountPercentage,
                             id,
                             price,
                             rating,
                             stock,
                             thumbnail,
                             title,
                         },
                     }: ProductProps) => {

    const {classes} = useStyles()

    return (
        <Card withBorder radius="md" className={classes.card}>
            <AspectRatio ratio={16 / 9}>

                <Image src={thumbnail} alt={title} fit={"cover"} />
            </AspectRatio>

            <Group position="apart" mt="md">
                <div>
                    {title.length < 20
                        ? <Text weight={500}>{title}</Text>
                        : <Tooltip label={title}><Text weight={500}>{`${title.substring(0, 15)}...`}</Text></Tooltip>
                    }
                </div>
                {discountPercentage > 0 &&
                    <Badge variant="outline">{discountPercentage}% off</Badge>
                }
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text size="sm" color="dimmed" className={classes.label}>
                    General information
                </Text>

                <Grid>
                    <Grid.Col md={6}>
                        <Text style={{fontWeight: 600}} size="xs">Availability</Text>
                        <Text size="sm">{stock > 0 ? "In stock" : "Sold out"}</Text>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Text style={{fontWeight: 600}} size="xs">Rating</Text>
                        <Rating value={rating} />
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Text style={{fontWeight: 600}} size="xs">Category</Text>
                        <Text size="sm">{category.replace("-", " ")}</Text>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Text style={{fontWeight: 600}} size="xs">Brand</Text>
                        <Text size="sm">{brand.substring(0,18)}</Text>
                    </Grid.Col>
                </Grid>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group spacing={30}>
                    <div>
                        <Text size="xl" weight={700} sx={{lineHeight: 1}}>
                            €{price}
                        </Text>
                    </div>

                    <Button radius="xl" style={{flex: 1}}>
                        Closer look
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    )
}

export default ProductCard