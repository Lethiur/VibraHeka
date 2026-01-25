import {useContext} from "react";
import {LoginUserUseCaseContext} from "../Context/LoginUserUseCaseContext";

export default function useLoginUser() {
    return useContext(LoginUserUseCaseContext);
}