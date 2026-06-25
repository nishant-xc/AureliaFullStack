import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import cartService from "../services/cart.service.js";

class CartController {
    addItem = asyncHandler(async (req, res) => {
        const cart = await cartService.addItem(req.user.id, req.body);

        return ApiResponse.success(res, cart, "Item added to cart", 201);
    });

    getCart = asyncHandler(async (req, res) => {
        const cart = await cartService.getCart(req.user.id);

        return ApiResponse.success(res, cart);
    });

    removeItem = asyncHandler(async (req, res) => {
        await cartService.removeItem(req.params.id);

        return ApiResponse.success(res, null, "Item removed");
    });
}

export default new CartController();
