import pool from "../../../database/database.js";

class MenuRepository {
    async create(data) {
        const query = `
            INSERT INTO menu_items (
                restaurant_id,
                category_id,
                name,
                slug,
                description,
                image_url,
                price,
                discount_price,
                is_veg,
                is_available,
                is_featured,
                preparation_time,
                calories
            )
            VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
            )
            RETURNING *;
        `;

        const values = [
            data.restaurant_id,
            data.category_id,
            data.name,
            data.slug,
            data.description,
            data.image_url,
            data.price,
            data.discount_price,
            data.is_veg,
            data.is_available,
            data.is_featured,
            data.preparation_time,
            data.calories,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async getAll() {
        const result = await pool.query(`
            SELECT *
            FROM menu_items
            ORDER BY created_at DESC;
        `);

        return result.rows;
    }

    async getBySlug(slug) {
        const result = await pool.query(
            `
            SELECT *
            FROM menu_items
            WHERE slug = $1
            LIMIT 1;
            `,
            [slug]
        );

        return result.rows[0];
    }

    async getByCategory(categoryId) {
        const result = await pool.query(
            `
            SELECT *
            FROM menu_items
            WHERE category_id = $1
            ORDER BY display_order ASC, created_at DESC;
            `,
            [categoryId]
        );

        return result.rows;
    }

    async update(id, data) {
        const query = `
            UPDATE menu_items
            SET
                name = $1,
                slug = $2,
                description = $3,
                image_url = $4,
                price = $5,
                discount_price = $6,
                is_veg = $7,
                is_available = $8,
                is_featured = $9,
                preparation_time = $10,
                calories = $11,
                updated_at = NOW()
            WHERE id = $12
            RETURNING *;
        `;

        const values = [
            data.name,
            data.slug,
            data.description,
            data.image_url,
            data.price,
            data.discount_price,
            data.is_veg,
            data.is_available,
            data.is_featured,
            data.preparation_time,
            data.calories,
            id,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async delete(id) {
        await pool.query(
            `
            DELETE FROM menu_items
            WHERE id = $1;
            `,
            [id]
        );

        return true;
    }
}

export default new MenuRepository();
