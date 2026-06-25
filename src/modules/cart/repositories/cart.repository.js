import pool from "../../../database/database.js";

class CartRepository {
    async addItem(data) {
        const query = `
        INSERT INTO cart_items
        (
            user_id,
            restaurant_id,
            menu_item_id,
            quantity,
            unit_price,
            special_instructions
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `;

        const values = [
            data.user_id,
            data.restaurant_id,
            data.menu_item_id,
            data.quantity,
            data.unit_price,
            data.special_instructions,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async getUserCart(userId) {
        const result = await pool.query(
            `
            SELECT
                c.*,
                m.name,
                m.image_url
            FROM cart_items c
            JOIN menu_items m
            ON c.menu_item_id = m.id
            WHERE c.user_id=$1
            ORDER BY c.created_at DESC
            `,
            [userId]
        );

        return result.rows;
    }

    async findExisting(userId, menuItemId) {
        const result = await pool.query(
            `
            SELECT *
            FROM cart_items
            WHERE user_id=$1
            AND menu_item_id=$2
            `,
            [userId, menuItemId]
        );

        return result.rows[0];
    }

    async updateQuantity(id, quantity) {
        const result = await pool.query(
            `
            UPDATE cart_items
            SET quantity=$1,
                updated_at=CURRENT_TIMESTAMP
            WHERE id=$2
            RETURNING *
            `,
            [quantity, id]
        );

        return result.rows[0];
    }

    async deleteItem(id) {
        await pool.query(
            `
            DELETE FROM cart_items
            WHERE id=$1
            `,
            [id]
        );

        return true;
    }
}

export default new CartRepository();
