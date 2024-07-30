import { BackButton, BackIcon, Container, Logo } from "./styles";

import LogoPng from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('groups')
    }

    return (
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={LogoPng} />

        </Container>
    )
}