import React, { useState } from 'react';
import { useFetchAllUsersQuery } from '../../redux/services/CustomerApi';
import { CustomerInterface } from '../../utils/entity/AdminInterface';
import { Button } from 'react-bootstrap';
import { colors } from '../../constants/Palette';

const CustomerDetails: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const size = 10;

  const { data: customers, isLoading, error } = useFetchAllUsersQuery({
    page,
    size,
  });
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => prev - 1);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-5">Loading...</div>;
    }
    if (error) {
      return <div className="text-center text-danger py-5">Error loading customers: {JSON.stringify(error)}</div>;
    }

    const customerList: CustomerInterface[] = customers?.data || [];

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

              </tr>
            </thead>
            <tbody>
              {customerList?.length && customerList.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1 + page * size}</td>
                  <td>{customer.firstName} {customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end my-3" style={{ width: '85%', margin: 'auto' }}>
          <Button
            className="btn btn-primary me-4 border-0"
            onClick={handlePrevPage}
            disabled={page === 0}
            style={{backgroundColor:colors.pagecolor}}
            >
            Previous
          </Button>
          <Button className="btn btn-primary border-0" onClick={handleNextPage} style={{backgroundColor:colors.pagecolor}}>Next</Button>
        </div>
      </div>
    );
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default CustomerDetails;