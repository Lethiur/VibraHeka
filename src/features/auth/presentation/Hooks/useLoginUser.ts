import {useContext} from "react";
import {LoginUserUseCaseContext} from "../Context/LoginUserUseCaseContext.ts";

export default function useLoginUser() {
    return useContext(LoginUserUseCaseContext);
}