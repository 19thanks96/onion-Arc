
export interface MovieEntity  {
    id: number;
    title: string;
    description?: string | null;
}

export interface CreateMovieEntity  {
    title: string;
    description?: string | null;
}