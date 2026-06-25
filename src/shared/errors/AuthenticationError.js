import AppError from "./AppError.js";

class AuthenticationError extends AppError {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}

export default AuthenticationError;
