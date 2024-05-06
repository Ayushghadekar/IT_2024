import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Calendar = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Board Member" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm flex justify-center">
        <img className=' w-[40%]' src='./image/boardMamber.jpg'/>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Calendar;
