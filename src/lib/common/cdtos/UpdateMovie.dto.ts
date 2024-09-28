import {Genre} from "$lib/enum";

export class UpdateMovieDto {
    id: number;
    title: string;
    description?: string | null;
    createdAt?: Date | null ;
    year?:   Date  | null;
    rating?: number | null;
    isAvailable?: boolean  | null;
    genre?: keyof typeof Genre | null;

    constructor(model: any) {
        this.id = +model.id;
        this.title = model?.title;
        this.description =  model?.description !== '' ? model?.description : null;
        this.createdAt = model?.createdAt ? new Date(model?.createdAt) : null;
        this.year = model?.year  ? new Date(model?.year) : null
        this.rating =   model?.rating  ? +model?.rating : null;
        this.isAvailable = model?.isAvailable === true;
        this.genre = model?.genre  ? model?.genre as keyof typeof Genre : null;

    }
}
