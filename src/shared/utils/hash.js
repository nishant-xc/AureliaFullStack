import crypto from "crypto";

export function hashToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

export function compareTokenHash(token, hash) {
    return hashToken(token) === hash;
}
