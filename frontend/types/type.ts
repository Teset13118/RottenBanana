export interface Anime {
  title: string;
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    embed_url : string
  }
  rating: string;
  synopsis: string;
  season: string;
  year: string;
  genres: {
    name: string;
  }[];
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    username: string;
    nickname: string;
  };
  animeId: string;
  animeName: string;
  animePic: string;
  text: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  nickname: string;
  about: string;
  email: string;
  createdAt: string;
};

export interface Statistics {
  averageScore: number;
  totalReviews: number;
  scoreDistribution: {
    [key: number]: number;
  };
  totalScore: number;
}
