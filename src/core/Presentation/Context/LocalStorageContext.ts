import LocalStorageService from "../../Infrastructure/Storage/LocalStorageService.ts";
import {Context, createContext} from "react";

export const LocalStorageContext : Context<LocalStorageService>= createContext<LocalStorageService>(new LocalStorageService());