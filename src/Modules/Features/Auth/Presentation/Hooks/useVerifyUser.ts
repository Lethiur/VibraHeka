import {useContext} from "react";
import {VerifyUserUseCaseContext} from "../Context/VerifyUserUseCaseContext";

export default function useVerifyUser() {
    return useContext(VerifyUserUseCaseContext);
}