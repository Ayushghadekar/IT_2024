import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableTwo = () => {
    const [tables, setTableData] = useState();

    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://it-2024.onrender.com/api/customers');
                setTableData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchData();
    }, []);
    const filteredTables = tables ? tables.filter(table => {
        const searchLowerCase = searchQuery.toLowerCase();
        return (
            table.SevarthID.toLowerCase().includes(searchLowerCase) ||
            table.name.toLowerCase().includes(searchLowerCase) || 
            table.Institute.toLowerCase().includes(searchLowerCase) ||
            table.Post.toLowerCase().includes(searchLowerCase)
        );
    }) : [];
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Customers
            </h4>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Sevarth ID or Name"
                className="rounded border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:border-primary dark:bg-form-input dark:text-white dark:border-form-strokedark"
            />
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
                            Institute
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Post
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Shares
                        </h5>
                    </div>
                </div>
                {filteredTables.map((table, key) => (
                    <div
                        className={`grid grid-cols-5 sm:grid-cols-5 ${key === filteredTables.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <Link to={`/profile/${table._id}`}>
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <p className="hidden text-black dark:text-white sm:block">
                                    {table.name}
                                </p>
                            </div>
                        </Link>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{table.SevarthID}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{table.Institute}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-3">{table.Post}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            {table.Shares}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableTwo;
