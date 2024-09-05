import {json, type RequestEvent} from "@sveltejs/kit";
import {prisma} from "../db/prismaClient";
import {MovieService} from "../../core/services/movies.service";
import {inject, injectable} from "tsyringe";
import type {MovieDto} from "$lib/common/cdtos/Movie.dto";
import type {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
import {UpdateMovieDto} from "$lib/common/cdtos/UpdateMovie.dto";
import {BaseApiController} from "./base/baseApi.controller";
import type {Response} from "@playwright/test";



@injectable()
export class MoviesController extends BaseApiController  {
    constructor(
        @inject(MovieService) readonly movieService: MovieService,
    ) {
        super();
    }
    getMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {

            const url = new URL(event.request.url);
            const id = url.searchParams.get('id');

            return await this.movieService.getMovie(+id)

        })


    getMovies = async () =>
        await this.wrapResponse(async () => {
            return await this.movieService.getAllMovies()
        //     const movies = await this.movieService.getAllMovies()
        //     return json(movies, {status: 201})
        })


    postMovie = async (event: RequestEvent)   =>
        await this.wrapResponse(async () => {
            let data = await event.request.formData();
            const title = data.get('title') as String
            const description = data.get('description') as String
            return await this.movieService.setMovie({title, description})
        });


    putMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            const data: MovieDto = await event.request.json()
            const dto = new UpdateMovieDto(data);
            return await this.movieService.updateMovie(dto)
        })


    deleteMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            const data = await event.request.json()
            const id = data.id
            return await this.movieService.deleteMovie(id)
        })

}
