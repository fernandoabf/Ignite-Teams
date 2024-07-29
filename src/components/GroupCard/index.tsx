import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type GroupCardProps = TouchableOpacityProps & {
    tittle: string;
}
export function GroupCard({ tittle, ...rest }: GroupCardProps) {
    return (
        <Container {...rest}>
            <Icon />

            <Title>
                {tittle}
            </Title>
        </Container>
    )
}