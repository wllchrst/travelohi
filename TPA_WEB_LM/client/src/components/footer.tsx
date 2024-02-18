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
                    <TextDimmed><a href="https://www.instagram.com/">How To Book</a></TextDimmed>
                    <TextDimmed><a href="https://academic-slc.apps.binus.ac.id/qualification/view">Contact Us</a></TextDimmed>
                    <TextDimmed><a href="https://academic-slc.apps.binus.ac.id/auth/login">Help Center</a></TextDimmed>
                    <TextDimmed><a href="https://academic-slc.apps.binus.ac.id/">About Us</a></TextDimmed>
                    <TextDimmed><a href="https://linktr.ee/">Social Medias</a></TextDimmed>
                </div>
                <div className="link-container">
                    <SubTitle> <Text>Others</Text> </SubTitle>
                    <TextDimmed><a href="#">Flights</a></TextDimmed>
                    <TextDimmed><a href="#">Hotels</a></TextDimmed>
                    <TextDimmed><a href="#">Trains</a></TextDimmed>
                    <TextDimmed><a href="#">Flight + Hotel</a></TextDimmed>
                </div>
                <div className="link-container">
                    <SubTitle> <Text>Products</Text> </SubTitle>
                    <TextDimmed><a href="https://www.traveloka.com/en-id/flight">Flights</a></TextDimmed>
                    <TextDimmed><a href="https://www.traveloka.com/en-id/hotel">Hotels</a></TextDimmed>
                    <TextDimmed><a href="https://www.traveloka.com/en-id/kereta-api">Trains</a></TextDimmed>
                    <TextDimmed><a href="https://www.traveloka.com/en-id/packages">Flight + Hotel</a></TextDimmed> 
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
