
import {container} from "tsyringe";
import type {RequestEvent} from "@sveltejs/kit";
import {MoviesController} from "../../infrastructure/controllers/movies.controller";
import type {PageServerLoadEvent} from "../../../.svelte-kit/types/src/routes/[slug]/$types";
// import {actions} from "../+page.server";
// import {metadata} from "reflect-metadata/no-conflict";

const moviesController = container.resolve(MoviesController)
export const ssr = false;

export async function load({params, fetch}: PageServerLoadEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const slug = params?.slug;
    const [resMovie] = await Promise.all([
        fetch(`/api/movie/id?id=${slug}`, {method: 'GET'})
    ])
    const [dataMovie] = await Promise.all([
        resMovie.json()

    ]);


    return {
        movie: dataMovie,
    };
}