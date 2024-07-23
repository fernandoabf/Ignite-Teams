import { CaretLeft } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding-top: 10%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const Logo = styled.Image`
    width: 46px;
    height: 55px;
    margin-right: 5%;
`
export const BackButton = styled.TouchableOpacity`
    flex:1;
    padding-left: 5%;
`
export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))` 
`