import ProfileInfo from '@/app/components/profiles/userProfile/profileInfo';
import UserReviews from '@/app/components/profiles/userProfile/userReviews';


export default function Profile() {
  return (
    <div className="grid grid-cols-1 pt-5 h-[95%] lg:grid-cols-3 px-5 min-w-80">
      <div className="w-full p-5 lg:col-span-1">
        <ProfileInfo />
      </div>
      <div className="lg:col-span-2 h-[574px] overflow-y-auto p-6 rounded-xl shadow-lg no-scrollbar border border-solid">
        <UserReviews />
      </div>
    </div>
  );
}