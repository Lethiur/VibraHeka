import LocalStorageService from "../../Infrastructure/Storage/LocalStorageService";
import {Context, createContext} from "react";

export const LocalStorageContext : Context<LocalStorageService>= createContext<LocalStorageService>(new LocalStorageService());