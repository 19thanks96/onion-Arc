
export class CreateMovieDto  {
    title: string;
    description?: string;

    constructor(model: any) {
        this.title = model?.title;
        this.description = model?.description;

    }
}

