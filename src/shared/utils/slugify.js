export function generateSlug(text) {
    return text
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export async function generateUniqueSlug(repository, text, excludeId = null) {
    const baseSlug = generateSlug(text);

    let slug = baseSlug;

    let counter = 2;

    while (true) {
        const existing = await repository.getBySlug(slug);

        if (!existing) return slug;

        if (excludeId && existing.id === excludeId) return slug;

        slug = `${baseSlug}-${counter++}`;
    }
}

export default generateSlug;
