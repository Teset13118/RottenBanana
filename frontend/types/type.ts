export interface Anime {
    title: string;
    mal_id: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }

export interface Comment {
    _id: string;
    userId: {
      _id: string;
      username: string;
    };
    animeId: string;
    text: string;
    score: number;
    createdAt: string;
    updatedAt: string;
  }

export interface User  {
    _id: number;
    username: string;
    email: string;
  };