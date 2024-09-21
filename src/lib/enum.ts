

export enum Genre {
 ACTION = "Action",
 COMEDY = 'Comedy',
 DRAMA = 'Drama',
 HORROR = 'Horror',
 SCIFI = 'Sci-Fi',
 ROMANCE = 'Romance',
 THRILLER = 'Thriller',
 ANIMATION = 'Cartoon Animation',
}


export type Modal = {
 isOpen: boolean;
 errors: { [key: string]: any };

}