import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

export default function useThemeContext(){
    return useContext(ThemeContext)
}
