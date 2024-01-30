import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss"
import logoImage from "../assets/logo.png"
import searchIcon from "../assets/searchIcon.png"
import cartIcon from "../assets/cartIcon.png"
import indo from "../assets/indo.webp"
import us from "../assets/us.webp"
import logOutIcon from "../assets/logoutIcon.png"
import dropDown from "../assets/dropdown.png"
import { ICurrency } from "../interfaces/currency-interface";
import { CurrencyEnum } from "../enums/currency-enums";
import { useUserAuth } from "../contexts/user-context";
import useFetchUser from "../hooks/use-fetch-user";
import useUserLogout from "../hooks/use-logout";
import styled from "styled-components";
import useCurrencyContext from "../hooks/use-currency-context";

const unitedState : ICurrency = {
    imagePath: us,
    type: "USD"
}
const indonesia : ICurrency = {
    imagePath: indo,
    type: "IDR"
}

export default function Navbar() {
    const [currency, setCurrency] = useState<ICurrency>(unitedState)
    const { changeCurrency } = useCurrencyContext()
    const [isDropDown, setDropDown] = useState(false)
    const NavbarContainer = styled.div`
        background-color: ${(props) => props.theme.secondary};
        color: ${props => props.theme.font};
    `

    const BottomContainer = styled.div`
        background-color: ${props => props.theme.accent};
        color: ${props => props.theme.font};
    `
    const ColorContainer = styled.div`
        text-decoration: none;
        color: ${props => props.theme.font};
        p {
            color: ${props => props.theme.font};
        }
    `

    const LinkContainer = styled.div`
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

    const userContext = useUserAuth()
    
    return (
        <>
            <NavbarContainer className="center">
                <div className="navbar-container">
                    {/* LOGO */}
                    <Link className="" to="/home">
                        <img className="logo" src={logoImage} alt="" />
                    </Link>
                    {/* SEARCH BAR */}
                    <div className="search-container">
                        <input type="text" />
                        <img src={searchIcon} alt="" />
                    </div>
                    {/* CART */}
                    <ColorContainer>
                        <Link to={'/cart'} className="cart-container">
                            <img className="cart icon" src={cartIcon} alt="" />
                            <p>Cart</p>
                        </Link>
                    </ColorContainer>
                    {/* USD ATAU INA */}
                    <div className="money-container">
                        <div className="flag-container center">
                            <img src={currency.imagePath} alt="" />
                        </div>
                        <p>{currency.type}</p>
                        <div className="dropbtn">
                            <img onClick={() => {setDropDown(!isDropDown)}} src={dropDown} className="dropdown icon" alt="" />
                        </div>
                        {isDropDown ? 
                        <div className="dropdown-content">
                            <p onClick={() => { 
                                setCurrency(unitedState)
                                console.log(changeCurrency);
                                changeCurrency()
                            }}>USD</p>
                            <p onClick={() => { 
                                setCurrency(indonesia)
                                changeCurrency()
                            }}>IDR</p>
                        </div>  : <></>}
                    </div>

                    {/* NOT LOGGED IN */}

                    {!userContext.isAuth() ? 
                    <>
                        <div className="login-button-container">
                            <Link className="link" to={'/login'}>Login</Link>
                        </div>
                    </> :
                    <div className="logged-container">
                        <div className="flag-container center">
                            <img src={userContext.user.ProfilePictureLink} alt="" />
                        </div>
                        <p>{userContext.user.Email}</p>
                        <div>
                            <img onClick={() => {
                                useUserLogout()
                            }} className="logout-icon icon" src={logOutIcon} alt="" />
                        </div>
                    </div>}
                    {/* THEME */}
                </div>
            </NavbarContainer>

            {/* SECOND NAVBAR */}
            {(userContext.user.Role == 'customer' && userContext.isAuth()) ? 
            <BottomContainer>
                <div className="links-container">
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/hotels'}>Hotels</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/flights'}>Flights</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/game-join'}>Play Game!!</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/ticket'}>Play Game!!</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/history'}>Play Game!!</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/profile'}>Play Game!!</Link>
                    </LinkContainer>
                    <LinkContainer>
                        <Link className="link-nodeco" to={'/change-password'}>Play Game!!</Link>
                    </LinkContainer>
                </div>
            </BottomContainer>
            : <div>
                <BottomContainer>
                    <div className="links-container">
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/create-hotel'}>Create Hotel</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/create-flight'}>Create Flight</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/create-airline'}>Create Airline</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/view-hotel'}>View Hotels</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/view_flight'}>View Flights</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/manage-accounts'}>Manage Accounts</Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Link className="link-nodeco" to={'/manage-promos'}>Manage Promos</Link>
                        </LinkContainer>
                    </div>
            </BottomContainer> 
            </div>}
        </>
        
    );
}
