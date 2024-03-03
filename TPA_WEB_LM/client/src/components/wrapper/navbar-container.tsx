import styled from "styled-components";

export const NavbarContainer = styled.div`
        background-color: ${(props) => props.theme.secondary};
        color: ${props => props.theme.font};
    `

export const BottomContainer = styled.div`
        background-color: ${props => props.theme.accent};
        color: ${props => props.theme.font};
    `

export const ColorContainer = styled.div`
        text-decoration: none;
        color: ${props => props.theme.font};
        p {
            color: ${props => props.theme.font};
        }
    `

export const LinkContainer = styled.div`
        padding: 1rem 2rem;
        border-right: 0.125px solid black;
        color: ${props => props.theme.font};
        text-decoration: none;
        font-size: large;
        .link-nodeco {
            text-decoration: none;
            color: ${p => p.theme.font};
        }
    `
