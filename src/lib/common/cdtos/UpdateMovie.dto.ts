import {Genre} from "$lib/enum";

export class UpdateMovieDto {
    id: number;
    title: string;
    description?: string;
    createdAt?: Date | string;
    year?:   Date | string;
    rating?: number | string;
    isAvailable?: boolean | string;
    genre?: keyof typeof Genre;

    constructor(model: any) {
        this.id = +model.id;
        this.title = model?.title;
        this.description =  model?.description !== '' ? model?.description : undefined;
        this.createdAt = model?.createdAt ? new Date(model?.createdAt) : undefined;
        this.year = model?.year  ? new Date(model?.year) : undefined
        this.rating =   model?.rating  ? +model?.rating : undefined;
        this.isAvailable = model?.isAvailable;
        this.genre = model?.genre  ? model?.genre as keyof typeof Genre : undefined;

    }
}
