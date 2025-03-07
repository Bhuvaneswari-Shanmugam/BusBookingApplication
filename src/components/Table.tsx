// import React from 'react';
// import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
// import Skeleton from 'react-loading-skeleton';
// import { Col, Dropdown, Pagination, Row, Table as TableComponent } from 'react-bootstrap';
// import { MdOutlineFilterListOff } from 'react-icons/md';
// import { IoFilter } from "react-icons/io5";
// import SearchInput from './SearchInput';
// import Button from '../components/Button';
// import { palette, sizes } from '../../constants/Style';
// import { EnhancedTableProps } from '../../utlis/Entity';
// import { options } from '../../constants/Constant';


// const Table = <TData extends object>({
//   columns,
//   data,
//   pagination,
//   onPaginationChange,
//   pageCount,
//   setCurrentPage,
//   currentPage,
//   onPageIndexChange,
//   onPageSizeChange,
//   pageSize,
//   searchTerm,
//   onSearchChange,
//   onRowClick,
//   buttonText,
//   handleNavigate,
//   handleAddOrder,
//   totalCount,
//   tableErrorMessage,
//   showSearchAndButton,
//   showPagination,
//   loading,
//   searchLoading,
//   sorting,
//   onSortingChange,
//   buttonHide,
// }: EnhancedTableProps<TData>) => {
//   const role = localStorage.getItem(ROLE);

//   const serialNumberColumn: ColumnDef<TData, string> = {
//     id: 'serial',
//     header: 'S.No',
//     cell: ({ row }) => row.index + 1 + (pagination.pageIndex * pagination.pageSize),
//     size: sizes[60],
//   };

//   const table = useReactTable({
//     data,
//     columns: [serialNumberColumn, ...columns],
//     state: { pagination, sorting },
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//     pageCount,
//     onSortingChange,
//     manualSorting: true,
//   });

//   const handleNextPage = () => {
//     setCurrentPage((currentPage ?? 0) + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((currentPage ?? 0) - 1);
//   };

//   const handlePageChange = (page: number) => onPageIndexChange?.(page);

//   const renderPageNumbers = () => {
//     const maxButtons = 5;
//     const half = Math.floor(maxButtons / 2);
//     let startPage = Math.max(0, currentPage - half);
//     let endPage = Math.min(pageCount - 1, currentPage + half);

//     if (startPage > 0) {
//       startPage = Math.max(0, startPage - (maxButtons - (endPage - startPage + 1)));
//     }
//     if (endPage < pageCount - 1) {
//       endPage = Math.min(pageCount - 1, endPage + (maxButtons - (endPage - startPage + 1)));
//     }

//     const pages = [];
//     if (startPage > 0) {
//       pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <Pagination.Item
//           key={i}
//           active={i === currentPage}
//           onClick={() => handlePageChange(i)}
//         >
//           {i + 1}
//         </Pagination.Item>
//       );
//     }

//     if (endPage < pageCount - 1) {
//       pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
//     }

//     return pages;
//   };

//   return (
//     <div>
//       <div>
//         {showSearchAndButton && (
//           <Row className="mb-3 align-items-center">
//             <div className='w-25'>
//               <SearchInput
//                 type="text"
//                 placeholder="Search"
//                 className="form-control"
//                 value={searchTerm}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
//                 inputName="search"
//                 style={{
//                   paddingLeft: "2.5rem",
//                 }}
//               />
//             </div>
//             {(role === ROLE_SUPER_ADMIN || role === ROLE_ADMIN) && !buttonHide && (
//               <Col className="text-end">
//                 <Button
//                   type="button"
//                   className="mx-2"
//                   text={buttonText}
//                   customStyle={{
//                     color: palette.darkSuccess,
//                     backgroundColor: palette.white,
//                     borderColor: palette.darkSuccess,
//                   }}
//                   onClick={handleNavigate}
//                 />
//               </Col>
//             )}
//           </Row>
//         )}
//         <Row>
//           <Col>
//             <div className="scrollable-table rounded">
//               {loading || searchLoading ? (
//                 <Skeleton width={210} height={118} />
//               ) : (
//                 <TableComponent hover className='m-0'>
//                   <thead style={{ fontSize: sizes[7], textAlign: "left", border: "none" }}>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                       <tr key={headerGroup.id}>
//                         {headerGroup.headers.map((header) => (
//                           <th
//                             key={header.id}
//                             className={header.column.id === 'serial' ? 'serial' : ''}
//                             style={{
//                               textAlign: header.column.id === 'serial' ? 'center' : 'left',
//                               position: 'relative',
//                               padding: '8px 16px',
//                             }}
//                             onClick={header.column.id === 'status' ? header.column.getToggleSortingHandler() : undefined}
//                           >
//                             {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                             {header.column.id === 'status' && (
//                               <span
//                                 style={{
//                                   position: 'absolute',
//                                   left: "69px",
//                                   top: '50%',
//                                   transform: 'translateY(-50%)',
//                                   display: 'inline-flex',
//                                   flexDirection: 'column',
//                                   alignItems: 'start',
//                                   gap: '1px',
//                                 }}
//                               >
//                                 {header.column.getIsSorted() === 'desc' ? (
//                                   <IoFilter />
//                                 ) : header.column.getIsSorted() === 'asc' ? (
//                                   <IoFilter style={{ transform: "rotate(180deg)" }} />
//                                 ) : (
//                                   <MdOutlineFilterListOff />
//                                 )}
//                               </span>
//                             )}
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody style={{ textAlign: "left" }}>
//                     {data.length === 0 ? (
//                       <tr>
//                         <td colSpan={columns.length + 1} className="text-center text-danger p-3">
//                           {tableErrorMessage}
//                         </td>
//                       </tr>
//                     ) : (
//                       table.getRowModel().rows.map((row) => (
//                         <tr key={row.id} onClick={() => onRowClick && onRowClick(row.original, row.index)} style={{ cursor: 'pointer' }}>
//                           {row.getVisibleCells().map((cell) => (
//                             <td
//                               key={cell.id}
//                               style={{
//                                 textAlign: cell.column.id === 'serial' ? 'center' : 'left',
//                                 marginLeft: cell.column.id === 'serial' ? '0' : '80px',
//                               }}
//                             >
//                               {cell.column.id === 'status' || cell.column.id === "orderStatus" ? (
//                                 (() => {
//                                   const statusStyle = palette[cell.getValue() as keyof typeof palette];
//                                   if (typeof statusStyle === 'object' && statusStyle.backgroundColor && statusStyle.color) {
//                                     return (
//                                       <span
//                                         className={`d-flex align-items-center justify-content-center`}
//                                         style={{
//                                           backgroundColor: statusStyle.backgroundColor,
//                                           color: statusStyle.color,
//                                           width: sizes[57],
//                                           height: sizes[15],
//                                           borderRadius: sizes[10],
//                                         }}
//                                       >
//                                         {cell.getValue() as string}
//                                       </span>
//                                     );
//                                   }
//                                   return <span>{cell.getValue() as string}</span>;
//                                 })()
//                               ) : (
//                                 flexRender(cell.column.columnDef.cell, cell.getContext())
//                               )}
//                             </td>
//                           ))}
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </TableComponent>
//               )}
//             </div>
//           </Col>
//         </Row>
//         {showPagination && totalCount > 5 && (
//           <div>
//             <Row className="pagination-controls mt-3">
//               <div style={{ display: "flex" }}>
//                 <label className='me-2 mt-1'>Rows per Pages :</label>
//                 <Dropdown>
//                   <Dropdown.Toggle
//                     id="dropdown-basic"
//                     className="form-select w-auto"
//                     style={{
//                       borderColor: palette.darkSuccess,
//                       backgroundColor: palette.white,
//                       color: palette.darkSuccess
//                     }}
//                   >
//                     {pageSize}
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     {options.map((size) => (
//                       <Dropdown.Item
//                         key={size}
//                         onClick={() => onPageSizeChange && onPageSizeChange(size)}
//                         style={{ backgroundColor: palette.white, color: palette.darkSuccess }}
//                         onMouseEnter={(e) => {
//                           const target = e.target as HTMLElement;
//                           target.style.backgroundColor = palette.darkSuccess;
//                           target.style.color = palette.white;
//                         }}
//                         onMouseLeave={(e) => {
//                           const target = e.target as HTMLElement;
//                           target.style.backgroundColor = palette.white;
//                           target.style.color = palette.darkSuccess;
//                         }}
//                       >
//                         {size}
//                       </Dropdown.Item>
//                     ))}
//                   </Dropdown.Menu>
//                 </Dropdown>
//                 <Col xs className="d-flex justify-content-end">
//                   <Pagination>
//                     <button
//                       onClick={handlePreviousPage}
//                       disabled={currentPage === 0}
//                       className="btn btn-outline-primary"
//                     >
//                       Previous
//                     </button>
//                     {renderPageNumbers()}
//                     <button
//                       onClick={handleNextPage}
//                       disabled={currentPage >= pageCount - 1}
//                       className="btn btn-outline-primary"
//                     >
//                       Next
//                     </button>
//                   </Pagination>
//                 </Col>
//               </div>
//             </Row>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Table;
