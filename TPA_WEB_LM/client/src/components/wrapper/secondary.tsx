import styled from "styled-components";

export  const SecondaryColor = styled.div`
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.font}
    a {
        text-decoration: none;
        color: ${props => props.theme.font}
    }
`

export const PrimaryBackground = styled.div`
    background-color: ${props => props.theme.primary};
    box-shadow: 5px 5px 10px ${p => p.theme.shadow};
`
