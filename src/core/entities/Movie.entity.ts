import {Genre} from "$lib/enum";

export interface MovieEntity  {
    id: number;
    title: string;
    description?: string | null;
    createdAt?: Date | null | undefined;
    year?: Date | null;
    rating?: number  | null,
    isAvailable?:  boolean | null;
    genre?: keyof typeof Genre | null;
}

export interface CreateMovieEntity  {
    title: string;
    description?: string | null;
    createdAt: Date | null;
    year?: Date | null;
    rating?: number  | null,
    isAvailable?:  boolean | null;
    genre?: keyof typeof Genre | null;
}