import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';

const LoanForm = ({ id , update}) => {
  const [formData, setFormData] = useState({
    customerId: id,
    amount: '',
    interestRate: 0.09,
    type: 'Urgent',
    term: '',
    DemandForLone: '',
    monthlyPayment:'',
    Nomini: '',
    NominiRelation: '',
    PaymentChequeNo: '',
    Status: 'underProcessing',
    Gur1: '',
    Gur2: '',
  });
  console.log(id);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(amount===50000){
      formData.type="Urgent";
    }else{
      formData.type="Long Term";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:3000/api/loans/', formData);
      console.log(res);
      alert(res.data);
      // Clear form data after successful submission
      setFormData({
        ...formData,
        amount: '',
        type: '',
        term: '',
        monthlyPayment: '',
        startDate: '',
        endDate: '',
        DemandForLone: '',
        Nomini: '',
        NominiRelation: '',
        Gur1: '',
        Gur2: '',
      });
      update();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 w-[70%]">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Registration</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <label className="mb-2.5 block text-black dark:text-white">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter loan type"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <label className="mb-2.5 block text-black dark:text-white">InterestRate</label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">Term</label>
              <input
                type="number"
                name="term"
                value={formData.term}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">DemandForLone</label>
              <input
                type="text"
                name="DemandForLone"
                value={formData.DemandForLone}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
               <label className="mb-2.5 block text-black dark:text-white">Monthly Income</label>
              <input
                type="number"
                name="monthlyPayment"
                value={formData.monthlyPayment}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">Nomini</label>
              <input
                type="text"
                name="Nomini"
                value={formData.Nomini}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">NominiRelation</label>
              <input
                type="text"
                name="NominiRelation"
                value={formData.NominiRelation}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">Gurentier1 Sevarth-Id</label>
              <input
                type="text"
                name="Gur1"
                value={formData.Gur1}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-2.5 block text-black dark:text-white">Gurentier2 Sevarth-Id</label>
              <input
                type="text"
                name="Gur2"
                value={formData.Gur2}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {/* Continue with other fields similarly */}

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
