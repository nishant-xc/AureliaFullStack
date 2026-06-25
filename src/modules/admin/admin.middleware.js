import { getAdminByUserId } from "./repositories/admin.repository.js";
import ApiResponse from "../../shared/utils/ApiResponse.js";
import HTTP_STATUS from "../../shared/constants/httpStatus.js";

export async function requireAdmin(req, res, next) {
    try {
        const admin = await getAdminByUserId(req.user.id);

        if (!admin) {
            return ApiResponse.error(res, "Admin access required", HTTP_STATUS.FORBIDDEN);
        }

        req.admin = admin;

        next();
    } catch (error) {
        return ApiResponse.error(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
