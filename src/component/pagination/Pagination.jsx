import React from "react";
import _ from "lodash";
export const Pagination = ({
  users,
  changePageNumber,
  pageNumber,
  pageSize,
}) => {
  const pageCount = Math.ceil(users.length / pageSize);
  if (pageCount === 1) {
    return <></>;
  }
  const pages = _.range(0, pageCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className="page-item"
            key={page}
            onClick={() => changePageNumber(page)}
          >
            <a
              className={page === pageNumber ? "page-link active" : "page-link"}
            >
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
