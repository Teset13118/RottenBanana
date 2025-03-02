import AnimeInfo from '@/app/components/animeDetail.tsx/animeInfo';
import Reviews from '@/app/components/animeDetail.tsx/review/review';


export default function Info() {
  return (
    <>
      <div>
        <AnimeInfo />
        <Reviews />
      </div>
    </>
  );
}