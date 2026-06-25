import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import AppError from "../../../shared/errors/AppError.js";

import addressService from "../services/address.service.js";

export const create = asyncHandler(async (req, res) => {
    const address = await addressService.create(req.user.id, req.body);

    return ApiResponse.success(res, address, "Address created successfully", 201);
});

export const getAll = asyncHandler(async (req, res) => {
    const addresses = await addressService.getAll(req.user.id);

    return ApiResponse.success(res, addresses);
});

export const getById = asyncHandler(async (req, res) => {
    const address = await addressService.getById(req.params.id);

    if (!address) {
        throw new AppError("Address not found", 404);
    }

    return ApiResponse.success(res, address);
});

export const update = asyncHandler(async (req, res) => {
    const address = await addressService.update(req.params.id, req.user.id, req.body);

    return ApiResponse.success(res, address, "Address updated successfully");
});

export const remove = asyncHandler(async (req, res) => {
    await addressService.delete(req.params.id);

    return ApiResponse.success(res, null, "Address deleted successfully");
});
