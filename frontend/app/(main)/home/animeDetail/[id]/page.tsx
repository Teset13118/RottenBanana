import AnimeInfo from '@/app/components/animeDetail/animeInfo';
import Reviews from '@/app/components/animeDetail/review/review';


export default function Info() {
  return (
    <>
      <div className='bg-gray-900'>
        <AnimeInfo />
        <Reviews />
      </div>
    </>
  );
}