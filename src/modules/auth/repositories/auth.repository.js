import pool from "../../../database/database.js";

export async function findUserByEmail(email) {
    const result = await pool.query(
        `
    SELECT *
    FROM users
    WHERE email = $1
    `,
        [email]
    );

    return result.rows[0];
}

export async function createUser(user) {
    const result = await pool.query(
        `
    INSERT INTO users
    (
      full_name,
      email,
      password_hash,
      phone,
      role
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING
      id,
      full_name,
      email,
      role,
      created_at
    `,
        [user.full_name, user.email, user.password_hash, user.phone, user.role]
    );

    return result.rows[0];
}

export async function getUserWithPassword(email) {
    const result = await pool.query(
        `
    SELECT *
    FROM users
    WHERE email = $1
    `,
        [email]
    );

    return result.rows[0];
}
