import styled from 'styled-components/native';

interface TextProps {
  customFontSize: number;
}

export const Text = styled.Text<TextProps>`
  font-size: ${({ customFontSize }) => customFontSize}px;
`;
