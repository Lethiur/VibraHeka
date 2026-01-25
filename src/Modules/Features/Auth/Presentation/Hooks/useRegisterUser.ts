import {useContext} from "react";
import {RegisterUseCaseContext} from "../Context/RegisterUseCaseContext";

export function useRegisterUser() {
    return useContext(RegisterUseCaseContext);
}