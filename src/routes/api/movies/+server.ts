import {MoviesController} from "../../../infrastructure/controllers/movies.controller";
import {container} from "tsyringe";
import type {Response} from "@playwright/test";

const moviesController = container.resolve(MoviesController)

export const GET = async (event)  =>
    await moviesController.getMovies(event)

export const POST  = async (e)  =>
    await moviesController.postMovie(e);


export const PUT = async (e):Promise<Response>  =>
    await moviesController.putMovie(e)

export const DELETE = async (e):Promise<Response>  =>
    await moviesController.deleteMovie(e)
