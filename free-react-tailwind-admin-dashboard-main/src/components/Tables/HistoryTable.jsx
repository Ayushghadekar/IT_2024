import { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';

const History = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/transactions/getHistory`);
        const sortedHistory = response.data.history.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistory(sortedHistory);
        setFilteredHistory(sortedHistory);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = history.filter(record => record.name.toLowerCase().includes(searchTerm));
    setFilteredHistory(filtered);
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Customers
        </h4>

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-center">Name</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-center">Payment For</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-center">Cheque No</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-center">Date</h5>
            </div>
          </div>
          {filteredHistory.map((record, key) => (
            <div
              className={`grid grid-cols-4 sm:grid-cols-4 ${key === filteredHistory.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                }`}
              key={record._id}
            >
              <div className="flex justify-center items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden  text-center text-black dark:text-white sm:block">{record.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{record.paymentFor}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{record.chequeNo}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{formatDate(record.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default History;
