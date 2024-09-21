import type {PageServerLoadEvent} from "../../.svelte-kit/types/src/routes/$types";
import {container} from "tsyringe";
import type {RequestEvent} from "@sveltejs/kit";
import {MoviesController} from "../infrastructure/controllers/movies.controller";

const moviesController = container.resolve(MoviesController)
export const ssr = false;

export const actions = {
    postMovie: async (event: RequestEvent) => {
        const controllerResult = await moviesController.postMovie(event);
        return await controllerResult.json()
    },
}
export async function load({fetch}: PageServerLoadEvent) {

    const [resMovies] = await Promise.all([
        fetch('/api/movies?start=0&end=5', {method: 'GET'}),
    ])
    const [dataMovies,] = await Promise.all([
        resMovies.json(),
    ]);

    if(dataMovies.success === true) {
        const count = dataMovies.data.count;
        const sortedArray = dataMovies.data.data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);

        return {
            movies: {
                data: sortedArray,
                success: dataMovies.success,
                count: count
            },
        };
    } else {
        return dataMovies
    }
}