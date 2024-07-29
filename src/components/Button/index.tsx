import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}
export function Button({ type = 'PRIMARY', title, ...rest }: ButtonProps) {
    return (
        <Container type={type} {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}