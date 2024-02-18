import styled from "styled-components";

const Button = styled.button`
    border: none;
    padding: 0.75rem;
    border-radius:3px;
    background-color: ${p => p.theme.accent};
    color: ${p=> p.theme.font};
    width: 100%;
    text-align: left;
    font-size: medium;
`

export default Button
