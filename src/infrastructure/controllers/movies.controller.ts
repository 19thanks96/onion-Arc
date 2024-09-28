import {json, type RequestEvent} from "@sveltejs/kit";
import {MovieService} from "../../core/services/movies.service";
import {inject, injectable} from "tsyringe";
import {UpdateMovieDto} from "$lib/common/cdtos/UpdateMovie.dto";
import {BaseApiController} from "./base/baseApi.controller";

import type {Genre} from "$lib/enum";
import {schemasMovieCreation, schemasMovieUpdation} from "$lib/common/schemas/Movie.schemas";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
import {throwControllerValidationException} from "../../utils/validation.helpers";
import type {MovieDto} from "$lib/common/cdtos/Movie.dto";
import type {Response} from "@playwright/test";


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
            const id = url.searchParams.get('id') || 1;
            console.log(id, 'id!')
            return await this.movieService.getMovie(+id)
        })


    getMovies = async (event: { request: { url: string | URL; }; }): Promise<Response> => {
        return await this.wrapResponse(async () => {
            const url = new URL(event.request.url);
            const start = url.searchParams.get('start') || '0';
            const end = url.searchParams.get('end') || '5';
            const filters = url.searchParams.get('filters') || 'Id';
            const sortOrder = url.searchParams.get('sortOrder') === '0' ? 'asc' : 'desc';
            let handleFiltration = {
                Id: 'id',
                Title: 'title',
                Description: 'description',
                Created: 'createdAt',
                Year: 'year',
                Rating: 'rating',
                Genre: 'genre',
            }
            const moviesPositions = {
                start: +start,
                end: +end,
                filters: handleFiltration[filters as keyof typeof handleFiltration],
                sortOrder,
            };

            return await this.movieService.getAllMovies(moviesPositions)
        })
    }


    postMovie = async (event: RequestEvent) => {
        return await this.wrapResponse(async () => {
            let data = await event.request.formData();

            const isAvailable = (data.get('isAvailable') as string) === 'true'
            const rating = (data.get('rating') as string) !== 'undefined'

            const newMovie = {
                title: data.get('title') as string,
                description: data.get('description') as string,
                rating: rating ? +rating  : null,
                year: data.get('year') as string,
                isAvailable: isAvailable ? isAvailable : null ,
                genre: data.get('genre') as Genre,
            }
            const dto = new CreateMovieDto(newMovie)
            const validationResult = await schemasMovieCreation.safeParse(dto)
            if (!validationResult.success) {
                throwControllerValidationException(validationResult.error.format(), 'choto ne to na beke ')
            }
            return await this.movieService.setMovie(dto)
        });
    }


    putMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () : Promise<UpdateMovieDto>  => {
            const data: MovieDto = await event.request.json()
            const dto: UpdateMovieDto = new UpdateMovieDto(data);
            const validationResult = await schemasMovieUpdation.safeParse(dto)
            if (!validationResult.success) {
                throwControllerValidationException(validationResult.error.format(), 'choto ne to na beke ')
            }
            console.log(validationResult, dto)
            return await this.movieService.updateMovie(dto)
        });


    deleteMovie = async (event: RequestEvent) =>
        await this.wrapResponse(async () => {
            const data = await event.request.json()
            const id = data.id
            return await this.movieService.deleteMovie(id)
        })

}
