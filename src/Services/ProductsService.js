// Services/ProductsService.js
import { API_Config } from "../Config/API-Config";

export const ProductService = {
  // Fetch products by page (e.g., ?page=1)
  getProductsByPage: async function (pageNumber = 1) {
    const baseUrl = (API_Config.BASE_URL || "https://training.tamkeen-dev.com/tamkeenstore/public/api").replace(/\/+$/, "");
    const url = `${baseUrl}/product?page=${pageNumber}`;

    console.log("📡 Requesting API:", url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`❌ Request failed with status ${response.status}`);
        return [];
      }

      const json = await response.json();
      
      // Extract array from 'data' field
      const rawProducts = Array.isArray(json.data) ? json.data : [];
      
      return rawProducts.map((item) => normalizeProduct(item));
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      return [];
    }
  },

  // Fetch or filter products by category ID
  getProductsByCategory: async function (categoryId) {
    // Fetch all page 1 products first
    const allProducts = await this.getProductsByPage(1);

    if (!categoryId) return allProducts;

    // Filter by nested category.id
    const filtered = allProducts.filter(
      (item) => String(item.categoryId) === String(categoryId)
    );

    return filtered;
  },
};

// Map raw API object to a clean React component format
function normalizeProduct(item) {
  return {
    id: item.id,
    title: item.name || item.title || "Untitled Product",
    price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
    description: item.description || "",
    image: item.image || item.design || "https://via.placeholder.com/200",
    images: Array.isArray(item.images) ? item.images : [],
    sku: item.sku || "",
    isFavorite: item.is_favorite || false,
    categoryId: item.category?.id || null,
    categoryName: item.category?.name || "General",
  };
}