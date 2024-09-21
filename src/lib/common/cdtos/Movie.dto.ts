import {Genre} from "$lib/enum";


export class MovieDto  {
    id: number;
    title: string;
    description?: string;
    isAvailable?: boolean;
    createdAt?: Date;
    year?:   Date;
    rating?: number;
    genre?: Genre;

    constructor(model: any) {
        this.id = model.id;
        this.title = model?.title;
        this.description = model?.description;
        this.isAvailable = model?.isAvailable;
        this.createdAt = model?.createdAt;
        this.year = model?.year
        this.rating = model?.rating
        this.genre = model?.genre as keyof typeof Genre
    }
}