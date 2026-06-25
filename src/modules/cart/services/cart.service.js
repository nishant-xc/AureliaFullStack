import pool from "../../../database/database.js";
import cartRepository from "../repositories/cart.repository.js";

import NotFoundError from "../../../shared/errors/NotFoundError.js";
import ValidationError from "../../../shared/errors/ValidationError.js";

class CartService {
    async addItem(userId, data) {
        const menuResult = await pool.query(
            `
            SELECT *
            FROM menu_items
            WHERE id = $1
            `,
            [data.menu_item_id]
        );

        if (menuResult.rows.length === 0) {
            throw new NotFoundError("Menu item not found");
        }

        const menuItem = menuResult.rows[0];

        if (!menuItem.is_available) {
            throw new ValidationError("Menu item is unavailable");
        }

        const existing = await cartRepository.findExisting(userId, data.menu_item_id);

        if (existing) {
            return await cartRepository.updateQuantity(
                existing.id,
                existing.quantity + (data.quantity || 1)
            );
        }

        return await cartRepository.addItem({
            user_id: userId,
            restaurant_id: menuItem.restaurant_id,
            menu_item_id: menuItem.id,
            quantity: data.quantity || 1,
            unit_price: menuItem.discount_price || menuItem.price,
            special_instructions: data.special_instructions || null,
        });
    }

    async getCart(userId) {
        const items = await cartRepository.getUserCart(userId);

        let subtotal = 0;

        for (const item of items) {
            subtotal += Number(item.unit_price) * Number(item.quantity);
        }

        return {
            items,
            subtotal,
            totalItems: items.length,
        };
    }

    async removeItem(cartId) {
        return await cartRepository.deleteItem(cartId);
    }
}

export default new CartService();
