import styled from "styled-components";

export const FirstContainer = styled.div`
    background-color: ${p => p.theme.primary};
    padding: 3rem;
    border-radius: 10px;
    width: 20%;
    box-shadow: 5px 5px 10px ${p => p.theme.shadow};
`
