import {
    createCoupon,
    getCouponByCode,
    getUserCouponUsage,
    incrementCouponUsage,
    saveCouponUsage,
} from "../repositories/coupon.repository.js";

import NotFoundError from "../../../shared/errors/NotFoundError.js";
import ValidationError from "../../../shared/errors/ValidationError.js";

class CouponService {
    async create(data) {
        return await createCoupon(data);
    }

    async validate(code, userId, orderAmount) {
        const coupon = await getCouponByCode(code);

        if (!coupon) {
            throw new NotFoundError("Coupon not found");
        }

        if (!coupon.is_active) {
            throw new ValidationError("Coupon is inactive");
        }

        const now = new Date();

        if (coupon.starts_at && now < new Date(coupon.starts_at)) {
            throw new ValidationError("Coupon is not active yet");
        }

        if (coupon.expires_at && now > new Date(coupon.expires_at)) {
            throw new ValidationError("Coupon has expired");
        }

        if (
            coupon.minimum_order_amount &&
            Number(orderAmount) < Number(coupon.minimum_order_amount)
        ) {
            throw new ValidationError("Minimum order amount not reached");
        }

        if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
            throw new ValidationError("Coupon usage limit exceeded");
        }

        const userUsage = await getUserCouponUsage(coupon.id, userId);

        if (userUsage >= coupon.per_user_limit) {
            throw new ValidationError("Coupon already used by this user");
        }

        let discount = 0;

        if (coupon.discount_type === "percentage") {
            discount = (Number(orderAmount) * Number(coupon.discount_value)) / 100;

            if (coupon.max_discount && discount > Number(coupon.max_discount)) {
                discount = Number(coupon.max_discount);
            }
        } else {
            discount = Number(coupon.discount_value);
        }

        return {
            coupon,
            discount,
        };
    }

    async consume(client, couponId, userId, orderId, discount) {
        await incrementCouponUsage(client, couponId);

        await saveCouponUsage(client, {
            coupon_id: couponId,
            user_id: userId,
            order_id: orderId,
            discount_amount: discount,
        });
    }
}

export default new CouponService();
