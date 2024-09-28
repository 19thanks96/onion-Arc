import {Genre} from "$lib/enum";

export class CreateMovieDto  {
    title: string;
    description?: string | null;
    createdAt?: Date | string | null;
    year?:   Date | string | null;
    rating?: number  | null;
    isAvailable?: boolean  | null;
    genre?: keyof typeof Genre | null;

    constructor(model: any) {
        this.title = model?.title;
        this.description =  model?.description !== '' ? model?.description : null;
        this.createdAt = model?.createdAt ? new Date(model?.createdAt) : null;
        this.year = model?.year !== 'undefined' ? new Date(model?.year) : null
        this.rating =   +model?.rating ;
        this.isAvailable = model?.isAvailable !== 'true';
        this.genre = model?.genre !== 'undefined' ? model?.genre as keyof typeof Genre : null;

    }
}

