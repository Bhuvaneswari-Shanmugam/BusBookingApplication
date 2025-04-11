import React, { useState } from 'react';
import { useFetchAllUsersQuery } from '../../redux/services/CustomerApi';
import { CustomerInterface } from '../../utils/entity/AdminInterface';
import Pagination from '../../components/Pagination';

const CustomerDetails: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const size = 10;

  const { data: customers, isLoading, error } = useFetchAllUsersQuery({
    page,
    size,
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-5">Loading...</div>;
    }
    if (error) {
      return <div className="text-center text-danger py-5">Error loading customers: {JSON.stringify(error)}</div>;
    }

    const customerList: CustomerInterface[] = customers?.data || [];
    const totalPages=15;

    return (
      <div className="customer-list justify-content-center align-items-center my-4 mt-5">
        <div className="table-responsive" style={{ margin: 'auto', width: '85%' }}>
          <table className="table table-hover table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Customer ID</th>
              </tr>
            </thead>
            <tbody>
              {customerList?.length ? (
                customerList.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1 + page * size}</td>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.age}</td>
                    <td>{customer.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end my-3" style={{ width: '85%', margin: 'auto' }}>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} initialPage={page} />
        </div>
      </div>
    );
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default CustomerDetails;
