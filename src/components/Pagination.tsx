import React from 'react';
import ReactPaginate from 'react-paginate';


interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  initialPage: number;

}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, initialPage }) => {
  return (
    <div className="pagination">
      <ReactPaginate
        initialPage={initialPage}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        breakLabel={<span style={{ color: "#9932CC" }}>...</span>}
        nextLabel={<span style={{ backgroundColor: "#9932CC", color: "white", padding: "5px 10px", borderRadius: "5px" }}> &gt;</span>}
        previousLabel={<span style={{ backgroundColor: "#9932CC", color: "white", padding: "5px 10px", borderRadius: "5px" }}>&lt; </span>}
        pageLinkClassName="page-link"
        renderOnZeroPageCount={null}
      />
      <style>{`
           .pagination .page-link{
           color:"white";
           padding: 5px 10px;
           border-radius:5px;
           backgroundColor:"#9932CC"
           border:"none";
           }
           .pagination .page-link:hover{
              backgroundColor:"#9932CC";
              color:"white";
              border:"none";
        }
           .pagination .active .page-link {
          background-color:#9932CC;
          color:"white";
      }
           `
      }

      </style>
    </div>
  );
};

export default Pagination;
