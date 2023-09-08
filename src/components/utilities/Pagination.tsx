import { DataContext } from "../../context/DataContext";
import { useContext, useEffect } from "react";
function PaginationTable() {
  const { page, setPage } = useContext(DataContext);
  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                setPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1))
              }
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{page}</span>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              aria-label="Next"
              onClick={() => setPage(page + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PaginationTable;
