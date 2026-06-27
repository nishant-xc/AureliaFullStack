import ms from "ms";

/**
 * Converts values like:
 * "15m"
 * "1h"
 * "7d"
 * "30d"
 * into a JavaScript Date.
 */
export function calculateExpiry(duration) {
    const milliseconds = ms(duration);

    if (milliseconds === undefined) {
        throw new Error(`Invalid duration: ${duration}`);
    }

    return new Date(Date.now() + milliseconds);
}
