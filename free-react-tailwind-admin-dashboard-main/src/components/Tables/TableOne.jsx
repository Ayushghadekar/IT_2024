import { useEffect, useState } from 'react';
import axios from 'axios';

const TableOne = () => {
  const [tables, setTableData] = useState();
  const [data,setdata]=useState();
  const [chequeNos, setChequeNos] = useState([]);
  console.log(chequeNos)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customers/schedule');
        setTableData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, [data]);
  if (!tables) {
    return <div>Loading...</div>; // Render a loading indicator until tables data is fetched
  }
  const verify = async (cheque, id) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/transactions/varification/${id}`, {cheque:cheque});
      setChequeNos(Array(tables.length).fill(''));
      setdata(res.data)
      console.log(res);
    } catch (e) {

    }
  }
  const handleChequeNoChange = (e, index) => {
    const { value } = e.target;
    setChequeNos(prevState => ({
      ...prevState || {}, // Set default value to an empty object if prevState is undefined
      [index]: value
    }));
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Subscription Schedule
      </h4>

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
            Subscription
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
        {tables.map((table, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-5 ${key === tables.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}

          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {table.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{table.SevarthID}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{table.transaction?.amount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {table.transaction && table.transaction.ChequeNo ? (
                <p className="text-meta-3">{table.transaction.ChequeNo}</p>
              ) : (

                <input
                  value={chequeNos[key] || ""}
                  onChange={(e) => handleChequeNoChange(e, key)}
                  placeholder='ChequeNo.'
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              )}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5" onClick={() => verify(chequeNos[key], table.transaction.id)}>

              {table.transaction?.Status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
