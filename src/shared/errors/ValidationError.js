import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(errors) {
        super(
            "Validation failed",

            400,

            errors
        );
    }
}

export default ValidationError;
