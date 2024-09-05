import {MoviesController} from "../../../../infrastructure/controllers/movies.controller";
import {container} from "tsyringe";
import type {Response} from "@playwright/test";
import type {RequestEvent} from "@sveltejs/kit";

const moviesController = container.resolve(MoviesController)

export const GET = async (event:RequestEvent)  =>
    await moviesController.getMovie(event)


