
export class MovieDto  {
    id: number;
    title: string;
    description?: string;

    constructor(model: any) {
        this.id = model.id;
        this.title = model?.title;
        this.description = model?.description;

    }
}