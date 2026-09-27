import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="d-flex align-items-center gap-2 font16 weight400 py-3" style={{color:"#8B96A5"}}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.path}>
            {isLast ? (
              // آخر عنصر: نص عادي، مو رابط
              <span className="fw-medium">{item.label}</span>
            ) : (
              <Link to={item.path} className=" text-decoration-none" style={{color:"#8B96A5"}}>
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight size={14} className="text-muted" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;