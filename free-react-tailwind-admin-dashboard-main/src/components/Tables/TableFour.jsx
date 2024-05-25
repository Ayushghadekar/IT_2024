import { useEffect, useState } from 'react';
import axios from 'axios';
import VerifyLoanModal from './loanModel'; // Make sure to import your modal component

const TableFour = ({ id }) => {
  const [tables, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRepaymentId, setCurrentRepaymentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/loanRepayments/${id}`);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleStatusUpdate = (repaymentId) => {
    setCurrentRepaymentId(repaymentId);
    setIsModalOpen(true);
  };

  const handleConfirm = async (chequeNumber) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/loanRepayments/updateStatus/${currentRepaymentId}`, {
        cheque: chequeNumber,
      });
      const updatedRepayment = response.data;
      setTableData((prevTables) =>
        prevTables.map((table) =>
          table._id === currentRepaymentId ? updatedRepayment : table
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRepaymentId(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Customers
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
        </div>
        {tables.map((table, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${key === tables.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}
            key={table._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {formatDate(table.timestamp)}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{Math.round(table.amount)}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                onClick={() => handleStatusUpdate(table._id)}
                disabled={table.status}
                className="text-meta-3"
              >
                {table.status ? "true" : "false"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <VerifyLoanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TableFour;
