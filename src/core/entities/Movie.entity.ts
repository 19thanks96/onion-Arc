import {Genre} from "$lib/enum";

export interface MovieEntity  {
    id: number;
    title: string;
    description?: string | null;
    year?: Date | null;
    rating?: number | string,
    isAvailable?: boolean | string;
    genre?: keyof typeof Genre;
}

export interface CreateMovieEntity  {
    title: string;
    description?: string | null;
    year?: Date | null;
    rating?: number | null,
    isAvailable?: boolean | string;
    genre?: keyof typeof Genre;
}