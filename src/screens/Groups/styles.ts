import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`
export const Text = styled.Text`
    font-size: 32px;
    color: ${({ theme }) => theme.COLORS.RED};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`