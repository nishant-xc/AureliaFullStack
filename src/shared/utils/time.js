import ms from "ms";

export function calculateExpiry(duration) {
    const milliseconds = ms(duration);

    if (milliseconds === undefined) {
        throw new Error(`Invalid duration: ${duration}`);
    }

    return new Date(Date.now() + milliseconds);
}

export function isExpired(date) {
    return new Date(date) <= new Date();
}
