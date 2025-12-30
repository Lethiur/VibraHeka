import {useContext} from "react";
import {LocalStorageContext} from "../Context/LocalStorageContext.ts";

export default function useLocalStorage() {
    return useContext(LocalStorageContext)
}