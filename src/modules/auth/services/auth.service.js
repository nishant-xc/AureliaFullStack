import {
    createUser,
    findUserByEmail,
    findUserById,
    getUserWithPassword,
} from "../repositories/auth.repository.js";

import {
    hashPassword,
    comparePassword,
} from "../../../shared/utils/password.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../../../shared/utils/jwt.js";

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

    return {
        user,
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
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

    const passwordMatched = await comparePassword(
        data.password,
        user.password_hash
    );

    if (!passwordMatched) {
        throw new AuthenticationError("Invalid email or password");
    }

    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        },
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
    };
}

/*
|--------------------------------------------------------------------------
| Refresh Access Token
|--------------------------------------------------------------------------
*/

export async function refreshAccessToken(refreshToken) {
    if (!refreshToken) {
        throw new AuthenticationError("Refresh token is required");
    }

    const payload = verifyRefreshToken(refreshToken);

    const user = await findUserById(payload.id);

    if (!user) {
        throw new AuthenticationError("Invalid refresh token");
    }

    return {
        accessToken: generateAccessToken(user),
    };
}
