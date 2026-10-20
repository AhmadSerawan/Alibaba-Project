// src/Services/CategoryService.js
import { apiGetAll } from "../Config/api.js";

export const CategoryService = {
  // Tamkeen API: GET /category  ->  [{ id, name, parentId }]
  getCategories: async function () {
    try {
      const list = await apiGetAll("/category");

      return list.map((cat) => ({
        id: cat.id,
        name: cat.name ?? cat.title ?? "Category",
        parentId: cat.parent_id ?? cat.parent?.id ?? null,
      }));
    } catch (err) {
      console.error("Failed to load categories:", err);
      return [];
    }
  },
};
