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
        fetch('/api/movies?start=0&end=5&filters=Id&sortOrder=0', {method: 'GET'}),
    ])
    const [dataMovies,] = await Promise.all([
        resMovies.json(),
    ]);

    if(dataMovies.success === true) {
        const count = dataMovies.data.count;

        return {
            movies: {
                data: dataMovies.data.data,
                success: dataMovies.success,
                count: count
            },
        };
    } else {
        return dataMovies
    }
}