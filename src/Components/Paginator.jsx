import React from "react";
import "../Styles/paginator.css";

export default function Paginator({ total, page, pageSize, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) onPageChange(p);
  };

  return (
    <div className="paginator">
      <button
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={page === i + 1 ? "active" : ""}
          onClick={() => goToPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}