import {Genre} from "$lib/enum";

export class CreateMovieDto  {
    title: string;
    description?: string;
    createdAt?: Date | string;
    year?:   Date | string;
    rating?: number | string;
    isAvailable?: boolean | string;
    genre?: keyof typeof Genre;

    constructor(model: any) {
        this.title = model?.title;
        this.description =  model?.description !== '' ? model?.description : undefined;
        this.createdAt = model?.createdAt ? new Date(model?.createdAt) : undefined;
        this.year = model?.year !== 'undefined' ? new Date(model?.year) : undefined
        this.rating =   model?.rating !== 'undefined' ? +model?.rating : undefined;
        this.isAvailable = model?.isAvailable === 'true';
        this.genre = model?.genre !== 'undefined' ? model?.genre as keyof typeof Genre : undefined;

    }
}

