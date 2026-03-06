import {ValidationErrors} from "fluentvalidation-ts";

export default class InvalidEntityError<T> extends Error {
    constructor(
        public readonly fieldErrors:ValidationErrors<T>
    ) {
        super('Invalid registration data');
    }
} 