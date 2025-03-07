import { AnimeThisSeason } from "@/app/components/animeList/animeThisSeason";
import { AnimeSeasonWinter } from "@/app/components/animeList/animeSeasonWinter";
import { AnimeSeasonFall } from "@/app/components/animeList/animeSeasonFall";
import { AnimeSeasonSummer } from "@/app/components/animeList/animeSeasonSummer";
import { AnimeSeasonSpring } from "@/app/components/animeList/animeSeasonSpring";
import { AnimeUpcoming } from "@/app/components/animeList/animeUpcoming";


export default function Home() {
  return (
    <>
      <AnimeThisSeason />
      <AnimeSeasonWinter />
      <AnimeSeasonSpring/>
      <AnimeSeasonSummer/>
      <AnimeSeasonFall />
      <AnimeUpcoming />
    </>
  )
}