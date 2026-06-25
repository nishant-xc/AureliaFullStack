import {
    createUser,
    findUserByEmail,
    getUserWithPassword,
} from "../repositories/auth.repository.js";

import { hashPassword, comparePassword } from "../../../shared/utils/password.js";

import { generateAccessToken } from "../../../shared/utils/jwt.js";

import { ROLES } from "../../../shared/constants/index.js";

import ConflictError from "../../../shared/errors/ConflictError.js";
import AuthenticationError from "../../../shared/errors/AuthenticationError.js";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export async function registerUser(data) {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        throw new ConflictError("Email already exists");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await createUser({
        full_name: data.full_name,
        email: data.email,
        password_hash: passwordHash,
        phone: data.phone || null,
        role: ROLES.CUSTOMER,
    });

    const token = generateAccessToken(user);

    return {
        user,
        token,
    };
}

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export async function loginUser(data) {
    const user = await getUserWithPassword(data.email);

    if (!user) {
        throw new AuthenticationError("Invalid email or password");
    }

    const passwordMatched = await comparePassword(data.password, user.password_hash);

    if (!passwordMatched) {
        throw new AuthenticationError("Invalid email or password");
    }

    const token = generateAccessToken(user);

    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        },
        token,
    };
}
