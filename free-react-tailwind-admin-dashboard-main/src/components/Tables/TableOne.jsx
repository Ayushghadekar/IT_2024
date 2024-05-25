import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './model';

const TableOne = ({ amount }) => {
  const [tables, setTableData] = useState([]);
  const [loanRepayments, setLoanRepayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState();
  const [chequeNos, setChequeNos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showLoanRepayment, setShowLoanRepayment] = useState(false); // Toggle statel

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customers/schedule');
        const res2 = await axios.get('http://localhost:3000/api/customers/user');
        let totalShares = Math.round(res2.data.totalShares);
        let length = res2.data.length;
        let loan= Math.round(res2.data.totalApprovedLoans);
        amount(totalShares, length,loan);
        setTableData(response.data);

        const loanResponse = await axios.get('http://localhost:3000/api/loanRepayments');
        console.log(loanResponse.data);
        setLoanRepayments(loanResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  const filteredTables = tables.filter(table => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      table.SevarthID?.toLowerCase().includes(searchLowerCase) ||
      table.name?.toLowerCase().includes(searchLowerCase)
    );
  });

  const filteredLoanRepayments = loanRepayments.filter(loan => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      loan.SevarthID?.toLowerCase().includes(searchLowerCase) ||
      loan.name?.toLowerCase().includes(searchLowerCase)
    );
  });

  if (!tables.length && !loanRepayments.length) {
    return <div>Loading...</div>;
  }

  const verify = async (cheque, id) => {
    try {
      setSelectedTransaction({ id, cheque });
      setModalOpen(true);
    } catch (e) {
      console.error('Error setting selected transaction:', e);
    }
  }

  const handleChequeNoChange = (e, index) => {
    const { value } = e.target;
    setChequeNos(prevState => ({
      ...prevState || {},
      [index]: value
    }));
  };

  const handleConfirmPayment = async () => {
    try {
      const { id, cheque } = selectedTransaction;
      const res = await axios.post(`http://localhost:3000/api/transactions/varification/${id}`, { cheque });
      setData(res.data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {showLoanRepayment ? 'Loan Repayment Schedule' : 'Subscription Schedule'}
      </h4>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmPayment} />
      <div className=' w-full flex justify-between'>
      <button 
        // onClick={() => setShowLoanRepayment(!showLoanRepayment)} 
        // className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {/* {showLoanRepayment ? 'Show Subscription Schedule' : 'Show Loan Repayment Schedule'} */}
      </button>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="rounded border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:border-primary dark:bg-form-input dark:text-white dark:border-form-strokedark"
      />
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sevarth_ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Cheque No.
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>
        {(showLoanRepayment ? filteredLoanRepayments : filteredTables).map((item, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-5 ${key === (showLoanRepayment ? loanRepayments.length : tables.length) - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {item.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.SevarthID}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item.transaction?.amount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {item.transaction && item.transaction.ChequeNo ? (
                <p className="text-meta-3">{item.transaction.ChequeNo}</p>
              ) : (
                <input
                  value={chequeNos[key] || ""}
                  onChange={(e) => handleChequeNoChange(e, key)}
                  placeholder='ChequeNo.'
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              )}
            </div>
            <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
              <div className="bg-blue-500 cursor-pointer rounded-l p-1 text-white font-bold text-s" onClick={() => { if (chequeNos[key]?.length) { verify(chequeNos[key], item.transaction.id) } }}>
                Click To Verify
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
