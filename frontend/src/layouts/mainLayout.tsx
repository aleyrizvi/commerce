import { Container } from "@mantine/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"

interface Props {
    children: ReactElement
}

const MainLayout: NextPage<Props> = ({children}: Props) => {
    return (
        <Container sx={{
            paddingTop: 40
        }}>
            {children}
        </Container>
    )
}

export const getLayout = (page: ReactElement) => {
    return (<MainLayout>{page}</MainLayout>)
}

export default MainLayout