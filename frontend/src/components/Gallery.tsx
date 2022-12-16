import { Modal, Grid, Image, Stack, createStyles } from "@mantine/core"
import { useState } from "react"

const useStyles = createStyles((theme) => ({
    selected: {
        border: `2px solid ${theme.colors.gray[6]}`,
        padding: 3,
    },
    image : {
        cursor: "pointer"
    }
}))

const Gallery = ({links}: { links: string[] }) => {
    const [ selectedImage, setSelectedImage ] = useState(0)
    const [ modalOpened, setModalOpened ] = useState(false)

    const {cx, classes} = useStyles()

    const imageThumbnail = links.slice(0, 5).map((link, index) => (
        <Image className={cx(
            classes.image,
            {
                [classes.selected]: index === selectedImage
            }
        )} onClick={() => setSelectedImage(index)} key={link} src={link} fit={"contain"} />
    ))

    return (

        <>
            <Grid grow gutter={"lg"}>
                <Grid.Col span={2}>
                    <Stack spacing={"sm"}>
                        {imageThumbnail}
                    </Stack>
                </Grid.Col>
                <Grid.Col span={10} style={{padding: 0}}>
                    <Image height={230} fit={"fill"} className={classes.image} onClick={() => setModalOpened(true)} src={links[selectedImage]} />
                </Grid.Col>
            </Grid>
            <Modal
                centered
                size={"auto"}
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                overlayBlur={3}
                overlayOpacity={0.6}
            >
                <Image src={links[selectedImage]} />
            </Modal>
        </>
    )
}

export default Gallery