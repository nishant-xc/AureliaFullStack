import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Create Notification
|--------------------------------------------------------------------------
*/

export async function createNotification(data) {
    const result = await pool.query(
        `
        INSERT INTO notifications
        (
            user_id,
            title,
            message,
            type,
            metadata
        )
        VALUES
        (
            $1,$2,$3,$4,$5
        )
        RETURNING *;
        `,
        [
            data.user_id,
            data.title,
            data.message,
            data.type,
            data.metadata ? JSON.stringify(data.metadata) : null,
        ]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get All Notifications
|--------------------------------------------------------------------------
*/

export async function getUserNotifications(userId) {
    const result = await pool.query(
        `
        SELECT *
        FROM notifications
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return result.rows;
}

/*
|--------------------------------------------------------------------------
| Get Notification By ID
|--------------------------------------------------------------------------
*/

export async function getNotificationById(id, userId) {
    const result = await pool.query(
        `
        SELECT *
        FROM notifications
        WHERE id = $1
        AND user_id = $2
        `,
        [id, userId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export async function markNotificationAsRead(id, userId) {
    const result = await pool.query(
        `
        UPDATE notifications
        SET
            is_read = TRUE
        WHERE
            id = $1
        AND
            user_id = $2
        RETURNING *;
        `,
        [id, userId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

export async function markAllNotificationsAsRead(userId) {
    await pool.query(
        `
        UPDATE notifications
        SET is_read = TRUE
        WHERE user_id = $1
        `,
        [userId]
    );
}

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export async function deleteNotification(id, userId) {
    await pool.query(
        `
        DELETE FROM notifications
        WHERE id = $1
        AND user_id = $2
        `,
        [id, userId]
    );
}
