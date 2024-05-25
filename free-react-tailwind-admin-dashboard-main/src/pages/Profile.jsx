
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoanForm from './Form/LoanForm';
import TableFour from '../components/Tables/TableFour';

const Profile = () => {
  const [user, setUser] = useState('');
  const [loan, setLoan] = useState([]);
  const [loanReq, setLoanReq] = useState(false)
  const[loan_id,setLoanId]=useState();
  const [checkPaymentFor,setCheckPayment]=useState(false)
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
        setUser(response.data);
        setLoan(response.data.Loan)
    
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData(); // Call fetchData here

  }, [id]);
  const payment=()=>{
    setCheckPayment(false)
  }
  const getName = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
      return response.data.name
    } catch {

    }
  }
  const loanId=(id)=>{
    setLoanId(id)
  }
  const ApproveLoan=async(id)=>{
    try {
      const response = await axios.put(`http://localhost:3000/api/loans/${id}`, {Status:"Approved"});
      console.log(response);
    } catch (error) {
      
    }
  }
  console.log(checkPaymentFor)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
const update=()=>{
  fetchData();
}
console.log(loan);
  return (
    <DefaultLayout>
      <div className='w-[100%] grid grid-cols-5 gap-3'>
        <div className=' col-span-1 h-[100%] flex flex-col content-between'>
          <div className=' bg-white h-46 w-[100%] mb-4'>
            <img src="/image/profile.png" alt="profile" className='h-46 w-[100%]' />
            <div className=' relative bottom-10  left-45 text-5xl font-bold z-30'>+</div>
          </div>
          <div className=' bg-[#093774] w-[100%] text-white font-bold text-xl text-center'>Date: {formatDate(user.timestamp)}</div>
        </div>
        <div className='col-span-4 bg-[#f1ead2] p-4 border-2 border-[#093774]'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex gap-x-2'>
              <label className="font-bold text-black" > Name:-</label>
              <input value={user.name} placeholder="Pranav Sandip Hole" className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-[55rem] ' />
            </div>
            <div className='flex gap-x-2'>
              <label className="font-bold text-black" > Designation:-</label>
              <input value={user.Post} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-[55rem]' />

            </div>
          </div>
          <div className='grid grid-cols-2 gap-y-3 mt-4 gap-x-2 '>
            <div className='flex gap-x-2'>
              <label className="font-bold text-black" > Ph_Number:-</label>
              <input value={user.phone} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />

            </div>
            <div className="flex gap-x-2">
              <label className="font-bold text-black" >Sevarth_ID:-</label>
              <input value={user.SevarthID} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />

            </div>
            <div className="flex gap-x-2">
              <label className="font-bold text-black">Salary:-</label>
              <input value={user.Income} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />

            </div>
            <div className="flex gap-x-2">
              <label className="font-bold text-black" >Institute </label>
              <input value={user.Institute} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
            </div>
            <div className="flex gap-x-2">
              <label className="font-bold text-black" > Joining:-</label>
              <input value={formatDate(user.DateOfJoining)} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />

            </div>
            <div className="flex gap-x-2">
              <label className="font-bold text-black"  > Retirement:-</label>
              <input value={formatDate(user.DateOfRetirement)} className=' text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />

            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#093774]  text-white font-bold text-xl text-center mt-4 w-fit p-4' onClick={() => setLoanReq(!loanReq)}> {loanReq ? (<div>close</div>) : (<div>Loan Request</div>)}</div>
      <div className='m-4 w-full flex justify-center'>{loanReq ? (<LoanForm id={id} update={update}/>) : (<div></div>)}</div>

{checkPaymentFor? (<TableFour id={loan_id} check={payment} />)  :(
      <div className=''>
        {loan.map((item, index) => (
          <div key={index} className='grid grid-cols-6 mt-4 bg-[#fff0bd]'>
            <div className='p-4 border-2 border-[#093774] col-span-5'>
              <div>
                <div className='grid grid-cols-2 gap-y-3 mt-4 gap-x-2'>
                  <div className='flex gap-x-2'>
                    <label className="font-bold text-black">Loan Amount:</label>
                    <input defaultValue={item.amount} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Type:</label>
                    <input defaultValue={item.type} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Nominee:</label>
                    <input defaultValue={item.Nomini} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Relation:</label>
                    <input defaultValue={item.NominiRelation} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Reason:</label>
                    <input defaultValue={item.DemandForLone} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Status:</label>
                    <input defaultValue={item.Status} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Cheque No:</label>
                    <input defaultValue={item.PaymentChequeNo} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                  <div className="flex gap-x-2">
                    <label className="font-bold text-black">Retirement:</label>
                    <input defaultValue={formatDate(item.endDate)} className='text-black bg-transparent focus:outline-none border-b-2 border-[#093774] w-full max-w-md' />
                  </div>
                </div>
              </div>
            </div>
            <div className='border-[#093774] border-2 min-h-max'>
              <div>
                <div>
                {item.Status==="Approved" ? (<div className='font-bold text-white text-l h-16 flex items-center justify-center text-center bg-[#093774]' onClick={()=>{setCheckPayment(true);setLoanId(item._id)}}>Check Payment Status</div>) : (<div className='font-bold text-white text-l h-16 flex items-center justify-center text-center bg-[#093774]' onClick={()=>{ApproveLoan(item._id)}}>Aprove Loan</div>)}
                  <div className='font-bold text-black text-l justify-center text-center'>Name Of Guarantor</div>
                  <ol className='flex flex-col justify-center pl-7'>
                    <li className='text-black'>1){item.Gurentier1Name}</li>
                    <li className='text-black'>2){item.Gurentier2Name}</li>
                  </ol>
                </div>
                <div className='flex flex-row mt-4'>
                  <p className='text-black'><span className='font-bold text-black text-l mt-5 pl-6'>Place:</span> Amravati</p>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>)}
    </DefaultLayout>
  );
};

export default Profile;
