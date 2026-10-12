// src/Services/CategoryService.js
import { API_Config } from "../Config/API-Config";

export const CategoryService = {
  getCategories: async function () {
    const baseUrl = (API_Config.BASE_URL || "").replace(/\/+$/, "");
    const url = `${baseUrl}/categories?_format=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      const data = await response.json();
      
      return (Array.isArray(data) ? data : data.categories || []).map((cat) => ({
        id: cat.tid?.[0]?.value || cat.id,
        name: cat.name?.[0]?.value || cat.name || "Category",
        parentId: cat.parent?.[0]?.target_id || null,
      }));
    } catch (err) {
      console.error("Failed to load categories:", err);
      return [];
    }
  },
};