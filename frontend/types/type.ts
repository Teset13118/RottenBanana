export interface Anime {
  title: string;
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    username: string;
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
