import styled from "styled-components"
import Navbar from "../components/navbar"
export default function Test () {
    const TestContainer = styled.div`
        background-color: ${(props) => props.theme.secondary};
    `
    return (
        <TestContainer>asdfasfdasfd</TestContainer>
    )
}
