import {z} from "zod";
import {Genre} from "$lib/enum";


export const schemasMovieCreation = z.object({

    title: z.string().min(3, 'Must be more than 3 letters'),
    description: z.string().min(3, 'Must be more than 3 letters or nothing').or(z.null()).optional(),
    createdAt: z.date().or(z.null()).optional(),
    year:   z.date().or(z.null()).optional(),
    rating: z.number().min(0, 'Must be more than 0').max(10, 'Must be less than 10').or(z.null()).optional(),
    isAvailable: z.boolean().or(z.null()).optional(),
    genre: z.enum(Object.keys(Genre) as [keyof typeof Genre]).or(z.null()).optional(),
})

export const schemasMovieUpdation = z.object({
    id: z.number(),
    title: z.string().min(3, 'Must be more than 3 letters'),
    description: z.string().min(3, 'Must be more than 3 letters or nothing').or(z.null()).optional(),
    createdAt: z.date().optional(),
    year:   z.date().optional(),
    rating: z.number().min(1, 'Must be equal 1 or more than 1').max(10, 'Must be less than 10').or(z.null()).optional(),
    isAvailable: z.boolean().optional(),
    genre: z.enum(Object.keys(Genre) as [keyof typeof Genre]).or(z.null()).optional(),
})

// const result = schemasMovieCreation.safeParse({
//     title: 'Test',
//     description: '',// This should be valid
//     genre: "ACTION"
// });
//
// console.log('result test validation!', result);