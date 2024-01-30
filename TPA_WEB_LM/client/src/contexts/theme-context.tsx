import { ThemeProvider } from "styled-components"
import { IChildren } from "../interfaces/children-interface"
import { createContext, useState } from "react"
import { Theme } from "../enums/theme-enums"
import IThemeContext from "../interfaces/theme-context-interface"

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export default function ThemeContextProvider({children} : IChildren) {

    const [currentTheme, setCurrentTheme] = useState(Theme.LIGHT)

    function toggleTheme (){
        if(currentTheme == Theme.LIGHT) setCurrentTheme(Theme.DARK)    
        else setCurrentTheme(Theme.LIGHT)
    }
    
    const themeValue = () => ({
        primary: `var(--primary-${currentTheme})`,
        secondary: `var(--secondary-${currentTheme})`,
        accent: `var(--accent-${currentTheme})`,
        accentHover: `var(--accent-hover-${currentTheme})`,
        font: `var(--font-${currentTheme})`,
        fontDimmed: `var(--font-dimmed-${currentTheme})`,
        error: `var(--error-${currentTheme})`,
        overlay: `var(--overlay-${currentTheme})`,
        shadow: `var(--shadow-${currentTheme})`,
        toggleTheme,
    });

    const value = { toggleTheme }

    return <>
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={themeValue}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    </>
}

