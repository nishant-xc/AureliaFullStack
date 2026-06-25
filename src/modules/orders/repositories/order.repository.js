class OrderRepository {
    async createOrder(client, order) {
        const result = await client.query(
            `
            INSERT INTO orders
            (
                user_id,
                restaurant_id,
                order_number,
                subtotal,
                delivery_fee,
                tax,
                discount,
                total,
                payment_status,
                payment_method,
                notes
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;
            `,
            [
                order.user_id,
                order.restaurant_id,
                order.order_number,
                order.subtotal,
                order.delivery_fee,
                order.tax,
                order.discount,
                order.total,
                order.payment_status,
                order.payment_method,
                order.notes,
            ]
        );

        return result.rows[0];
    }

    async createOrderItem(client, item) {
        const result = await client.query(
            `
            INSERT INTO order_items
            (
                order_id,
                menu_item_id,
                name,
                quantity,
                unit_price,
                total_price
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING *;
            `,
            [
                item.order_id,
                item.menu_item_id,
                item.name,
                item.quantity,
                item.unit_price,
                item.total_price,
            ]
        );

        return result.rows[0];
    }

    async addStatusHistory(client, orderId, status, remarks = null) {
        await client.query(
            `
            INSERT INTO order_status_history
            (
                order_id,
                status,
                remarks
            )
            VALUES($1,$2,$3)
            `,
            [orderId, status, remarks]
        );
    }
}

export default new OrderRepository();
