import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: ${p => p.theme.primary};
    box-shadow: 5px 5px 10px ${p => p.theme.shadow};
`
export const Shadowed = styled.div`
    box-shadow: 5px 5px 10px ${p => p.theme.shadow};
`
