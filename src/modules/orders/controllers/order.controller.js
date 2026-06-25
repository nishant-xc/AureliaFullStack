import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import orderService from "../services/order.service.js";

class OrderController {
    checkout = asyncHandler(async (req, res) => {
        const order = await orderService.checkout(
            req.user.id,

            req.body.payment_method,

            req.body.notes,

            req.body.coupon_code
        );

        return ApiResponse.success(
            res,

            order,

            "Order placed successfully",

            201
        );
    });
}

export default new OrderController();
