import { Validator } from "fluentvalidation-ts";
import { RegistrationData } from "../../domain/models/RegistrationData";

export default class RegistrationDataValidator extends Validator<RegistrationData> {
    constructor() {
        super();
        this.ruleFor('fullName')
            .notEmpty()
            .withMessage('El nombre es obligatorio')
            .minLength(2)
            .withMessage('El nombre debe tener al menos 2 caracteres');

        this.ruleFor('email')
            .notEmpty()
            .withMessage('El email es obligatorio')
            .emailAddress()
            .withMessage('Debe ingresar un email válido');

        this.ruleFor('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria')
            .minLength(6)
            .withMessage('La contraseña debe tener al menos 6 caracteres');
    }
}