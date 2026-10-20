import { useNavigate } from "react-router";

// Gradient banner with a back arrow + title, shared by the Terms / Contact pages
const SubPageBanner = ({ title }) => {
  const navigateTo = useNavigate();

  return (
    <div className="subpage-banner">
      <button
        type="button"
        className="subpage-back"
        onClick={() => navigateTo(-1)}
        aria-label="Go back"
      >
        <i aria-hidden="true" />
      </button>
      <h1>{title}</h1>
    </div>
  );
};

export default SubPageBanner;
