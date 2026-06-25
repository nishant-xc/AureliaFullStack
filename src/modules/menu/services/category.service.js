import {
    createCategory,
    getCategoriesByRestaurant,
    getCategoryById,
} from "../repositories/category.repository.js";

import NotFoundError from "../../../shared/errors/NotFoundError.js";

function slugify(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

export async function createCategoryService(data) {
    return await createCategory({
        restaurant_id: data.restaurant_id,
        name: data.name,
        slug: slugify(data.name),
        description: data.description || null,
        image_url: data.image_url || null,
        display_order: data.display_order || 0,
    });
}

export async function getCategoriesService(restaurantId) {
    return await getCategoriesByRestaurant(restaurantId);
}

export async function getCategoryService(id) {
    const category = await getCategoryById(id);

    if (!category) {
        throw new NotFoundError("Category not found");
    }

    return category;
}
