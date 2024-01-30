import { useContext } from "react";
import { ChangeContext } from "../contexts/changes-context";

export default function useChangeContext (){
    return useContext(ChangeContext)
}
