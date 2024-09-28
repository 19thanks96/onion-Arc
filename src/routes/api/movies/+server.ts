import {MoviesController} from "../../../infrastructure/controllers/movies.controller";
import {container} from "tsyringe";
import type {Response} from "@playwright/test";
import type {RequestEvent} from "@sveltejs/kit";

const moviesController = container.resolve(MoviesController)

export async function GET(event: RequestEvent):Promise<Response> {
    return await moviesController.getMovies(event);
}

export async function POST (e):Promise<Response>  {
    return await moviesController.postMovie(e);
}

export async function PUT (e):Promise<Response> {
    return await moviesController.putMovie(e)
}

export async function DELETE (e):Promise<Response> {
    return await moviesController.deleteMovie(e)
}