import {useContext} from "react";
import {LocalStorageContext} from "../Context/LocalStorageContext";

export default function useLocalStorage() {
    return useContext(LocalStorageContext)
}