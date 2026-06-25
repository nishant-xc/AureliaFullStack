import pool from "../../../database/database.js";

class AddressRepository {
    async create(data) {
        const query = `
        INSERT INTO user_addresses
        (
            user_id,
            full_name,
            phone,
            address_line_1,
            address_line_2,
            landmark,
            city,
            state,
            country,
            postal_code,
            latitude,
            longitude,
            address_type,
            is_default
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
        )
        RETURNING *;
        `;

        const values = [
            data.user_id,
            data.full_name,
            data.phone,
            data.address_line_1,
            data.address_line_2,
            data.landmark,
            data.city,
            data.state,
            data.country,
            data.postal_code,
            data.latitude,
            data.longitude,
            data.address_type,
            data.is_default,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async getAll(userId) {
        const result = await pool.query(
            `
            SELECT *
            FROM user_addresses
            WHERE user_id=$1
            ORDER BY is_default DESC, created_at DESC;
            `,
            [userId]
        );

        return result.rows;
    }

    async getById(id) {
        const result = await pool.query(
            `
            SELECT *
            FROM user_addresses
            WHERE id=$1;
            `,
            [id]
        );

        return result.rows[0];
    }

    async update(id, data) {
        const query = `
        UPDATE user_addresses
        SET
            full_name=$1,
            phone=$2,
            address_line_1=$3,
            address_line_2=$4,
            landmark=$5,
            city=$6,
            state=$7,
            country=$8,
            postal_code=$9,
            latitude=$10,
            longitude=$11,
            address_type=$12,
            is_default=$13,
            updated_at=NOW()
        WHERE id=$14
        RETURNING *;
        `;

        const values = [
            data.full_name,
            data.phone,
            data.address_line_1,
            data.address_line_2,
            data.landmark,
            data.city,
            data.state,
            data.country,
            data.postal_code,
            data.latitude,
            data.longitude,
            data.address_type,
            data.is_default,
            id,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async delete(id) {
        await pool.query(
            `
            DELETE FROM user_addresses
            WHERE id=$1;
            `,
            [id]
        );
    }

    async clearDefault(userId) {
        await pool.query(
            `
            UPDATE user_addresses
            SET is_default=false
            WHERE user_id=$1;
            `,
            [userId]
        );
    }
}

export default new AddressRepository();
