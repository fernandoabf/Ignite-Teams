import { BackButton, BackIcon, Container, Logo } from "./styles";

import LogoPng from "../../assets/logo.png";

type HeaderProps = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
    return (
        <Container>
            {
                showBackButton &&
                <BackButton>
                    <BackIcon />
                </BackButton>
            }

            <Logo source={LogoPng} />
        </Container>
    )
}