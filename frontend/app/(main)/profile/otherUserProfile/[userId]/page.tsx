import OtherUserProfileInfo from "@/app/components/profiles/otherUserProfile/otherProfileInfo";
import OtherUserReviews from "@/app/components/profiles/otherUserProfile/otherReviews";


export default function OtherUserProfile() {
  return (
    <div className="grid grid-cols-1 pt-5 h-[95%] lg:grid-cols-3 px-5 min-w-80">
      <div className="w-full p-5 lg:col-span-1">
        <OtherUserProfileInfo />
      </div>
      <div className="lg:col-span-2 h-[574px] overflow-y-auto p-6 rounded-xl shadow-lg no-scrollbar border border-solid">
        <OtherUserReviews />
      </div>
    </div>
  );
}