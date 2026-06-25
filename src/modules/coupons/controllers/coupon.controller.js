import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import couponService from "../services/coupon.service.js";

/*
|--------------------------------------------------------------------------
| Create Coupon
|--------------------------------------------------------------------------
*/

export const createCoupon = asyncHandler(async (req, res) => {
    const coupon = await couponService.create(req.body);

    return ApiResponse.success(res, coupon, "Coupon created successfully", 201);
});

/*
|--------------------------------------------------------------------------
| Validate Coupon
|--------------------------------------------------------------------------
*/

export const validateCoupon = asyncHandler(async (req, res) => {
    const result = await couponService.validate(req.body.code, req.user.id, req.body.order_amount);

    return ApiResponse.success(res, result);
});
