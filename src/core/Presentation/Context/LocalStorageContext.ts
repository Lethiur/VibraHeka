import LocalStorageService from "@core/infrastructure/Storage/LocalStorageService";
import { Context, createContext } from "react";

export const LocalStorageContext: Context<LocalStorageService> = createContext<LocalStorageService>(new LocalStorageService());