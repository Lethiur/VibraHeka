import {useContext} from "react";
import {RegisterUseCaseContext} from "../Context/RegisterUseCaseContext.ts";

export function useRegisterUser() {
    return useContext(RegisterUseCaseContext);
}