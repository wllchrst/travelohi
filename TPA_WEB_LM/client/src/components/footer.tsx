import styled from "styled-components"
import { Text, TextDimmed } from "./wrapper/text"
import { SubTitle } from "./wrapper/subtitle"
import "../styles/footer.scss"
import themeIcon from "../assets/themeIcon.png"
import { FlexGap } from "./wrapper/FlexGap"
import useThemeContext from "../hooks/use-theme-context"
export default function Footer () {
    const themeContext = useThemeContext()
    const Container = styled.div`
        display: flex;
        gap: 1rem;
        flex-direction: column;
        padding: 3rem 8rem;
        background-color: ${p => p.theme.secondary};
    `

    const InnerContainer = styled.div`
        display: flex;
        justify-content: space-between;
    `

    const ThemeToggleContainer = styled.div`


    `

    const themeToggleHandle = () => {
        console.log('here');
        themeContext.toggleTheme()
    }


    return (
        <Container>
            <InnerContainer>
                <div className="link-container">
                    <SubTitle> <Text>About Traveloka</Text> </SubTitle>
                    <TextDimmed>How To Book</TextDimmed>
                    <TextDimmed>Contact Us</TextDimmed>
                    <TextDimmed>Help Center</TextDimmed>
                    <TextDimmed>About Us</TextDimmed>
                </div>
                <div className="link-container">
                    <SubTitle> <Text>Others</Text> </SubTitle>
                    <TextDimmed>How To Book</TextDimmed>
                    <TextDimmed>Contact Us</TextDimmed>
                    <TextDimmed>Help Center</TextDimmed>
                    <TextDimmed>About Us</TextDimmed>
                </div>
                <div className="link-container">
                    <SubTitle> <Text>Products</Text> </SubTitle>
                    <TextDimmed>Flights</TextDimmed>
                    <TextDimmed>Hotels</TextDimmed>
                    <TextDimmed>Trains</TextDimmed>
                    <TextDimmed>Flight + Hotel</TextDimmed>
                </div>
            </InnerContainer>
            <ThemeToggleContainer>
                <FlexGap> 
                    <img className="icon" src={themeIcon} alt="" onClick={() => {
                        themeToggleHandle()
                    }}/> 
                    <SubTitle>Change Theme</SubTitle>
                </FlexGap>
            </ThemeToggleContainer>
        </Container>
    )
}
