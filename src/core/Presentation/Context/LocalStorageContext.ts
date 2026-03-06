import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { Context, createContext } from "react";

export const LocalStorageContext: Context<LocalStorageService> = createContext<LocalStorageService>(new LocalStorageService());
