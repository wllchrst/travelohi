import styled from "styled-components";

const Button = styled.button`
    border: none;
    padding: 0.75rem;
    border-radius:5px;
    background-color: ${p => p.theme.accent};
    color: ${p=> p.theme.font};
    width: 100%;
    text-align: left;
`

export default Button
