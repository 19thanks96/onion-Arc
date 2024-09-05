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
    putMovie: async (event: RequestEvent) => {
        const controllerResult = await moviesController.putMovie(event)
        return await controllerResult.json()
    },
    deleteMovie: async (event: RequestEvent) => {
        const controllerResult = await moviesController.deleteMovie(event)
        return await controllerResult.json()
    }
}
export async function load({fetch}: PageServerLoadEvent) {

    const [resMovies] = await Promise.all([
        fetch('/api/movies', {method: 'GET'}),
    ])
    const [dataMovies,] = await Promise.all([
        resMovies.json(),

    ]);

    return {
        movies: dataMovies,
    };
}