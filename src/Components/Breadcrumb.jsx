import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Breadcrumb({
  activeCategory = "All",
  onSelectCategory = () => {},
}) {
  const formattedCategory =
    activeCategory === "All category" || activeCategory === ""
      ? "All Products"
      : activeCategory;

  return (
    <nav
      aria-label="breadcrumb"
      className="py-3 px-2"
      style={{ backgroundColor: "#f7f8f9" }}
    >
      <div className="d-flex align-items-center flex-wrap gap-2" style={{ fontSize: "14px" }}>
        {/* Home */}
        <span
          onClick={() => onSelectCategory("All")}
          style={{ cursor: "pointer", color: "#8b96a5" }}
          className="hover-underline"
        >
          Home
        </span>

        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={14}
          style={{ color: "#8b96a5" }}
        />

        {/* Clothings / Parent Category */}
        <span
          onClick={() => onSelectCategory("All")}
          style={{ cursor: "pointer", color: "#8b96a5" }}
          className="hover-underline"
        >
          Categories
        </span>

        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={14}
          style={{ color: "#8b96a5" }}
        />

        {/* Dynamic Category Leaf */}
        <span
          className="text-capitalize"
          style={{ color: "#8b96a5", fontWeight: "400" }}
        >
          {formattedCategory.replace("-", " ")}
        </span>
      </div>
    </nav>
  );
}