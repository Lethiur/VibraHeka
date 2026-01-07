import {useContext} from "react";
import {VerifyUserUseCaseContext} from "../Context/VerifyUserUseCaseContext.ts";

export default function useVerifyUser() {
    return useContext(VerifyUserUseCaseContext);
}