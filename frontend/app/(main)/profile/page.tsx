import ProfileInfo from '@/app/components/profiles/userProfile/profileInfo';
import UserReviews from '@/app/components/profiles/userProfile/userReviews';


export default function Profile() {
  return (
    <div className="grid grid-cols-1 pt-5 h-[95%] lg:grid-cols-3 px-5 min-w-80 bg-gray-900 text-white">
      <div className="w-full p-5 lg:col-span-1">
        <ProfileInfo />
      </div>
      <div className="lg:col-span-2 overflow-y-auto p-6 rounded-xl shadow-lg no-scrollbar border border-solid mb-6">
        <UserReviews />
      </div>
    </div>
  );
}