import styled from "styled-components";

export const BorderedContainer = styled.div`
        color: ${p => p.theme.font};
        background-color: ${p => p.theme.primary};
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `
