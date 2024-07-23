import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type GroupCardProps = TouchableOpacityProps & {
    tittle: string;
}
export function GroupCard({ tittle }: GroupCardProps) {
    return (
        <Container>
            <Icon />

            <Title>
                {tittle}
            </Title>
        </Container>
    )
}