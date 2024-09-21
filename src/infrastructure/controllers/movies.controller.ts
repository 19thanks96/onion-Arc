import {json, type RequestEvent} from "@sveltejs/kit";
import {MovieService} from "../../core/services/movies.service";
import {inject, injectable} from "tsyringe";
import {UpdateMovieDto} from "$lib/common/cdtos/UpdateMovie.dto";
import {BaseApiController} from "./base/baseApi.controller";

import type {Genre} from "$lib/enum";
import {schemasMovieCreation} from "$lib/common/schemas/Movie.schemas";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
import {throwControllerValidationException} from "../../utils/validation.helpers";
import type {MovieDto} from "$lib/common/cdtos/Movie.dto";


@injectable()
export class MoviesController extends BaseApiController {
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


    getMovies = async (event) =>
        await this.wrapResponse(async () => {
            const url = new URL(event.request.url);
            const start = url.searchParams.get('start');
            const end = url.searchParams.get('end');

            const moviesPositions = {
                start: +start ,
                end: +end ,
            };

            console.log('Movies Positions:', moviesPositions);
            return await this.movieService.getAllMovies(moviesPositions)
            //     const movies = await this.movieService.getAllMovies()
            //     return json(movies, {status: 201})
        })


    postMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            let data = await event.request.formData();

            const newMovie = {
                title: data.get('title') as string,
                description: data.get('description') as string,
                rating: data.get('rating') as string,
                year: data.get('year') as string,
                isAvailable: data.get('isAvailable') as string,
                genre: data.get('genre') as Genre,
            }
            const dto = new CreateMovieDto(newMovie)
            const validationResult = await schemasMovieCreation.safeParse(dto)
            if (!validationResult.success) {
                throwControllerValidationException(validationResult.error.format(), 'choto ne to na beke ')
            }
            console.log(dto, validationResult)
            return await this.movieService.setMovie(dto)
        });


    putMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            const data: MovieDto = await event.request.json()
            const dto = new UpdateMovieDto(data);
            const validationResult = await schemasMovieCreation.safeParse(dto)
            if (!validationResult.success) {
                throwControllerValidationException(validationResult.error.format(), 'choto ne to na beke ')
            }
            return await this.movieService.updateMovie(dto)
        // })
        // await this.wrapResponse(async () => {
        //     let data = await event.request.formData();
        //     const id = data.get('id') as String
        //     const title = data.get('title') as String
        //     const description = data.get('description') as String
        //     const dto = new UpdateMovieDto({id, title, description});
        //     console.log(dto);
        //     return await this.movieService.updateMovie(dto)
        });


    deleteMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            const data = await event.request.json()
            const id = data.id
            return await this.movieService.deleteMovie(id)
        })

}
