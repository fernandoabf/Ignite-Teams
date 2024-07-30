import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 24px;
`
export const Text = styled.Text`
    font-size: 32px;
    
    ${({ theme }) => css`
        color: ${theme.COLORS.RED};
        font-family: ${theme.FONT_FAMILY.BOLD};
`};
`