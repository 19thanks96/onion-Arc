import {prisma} from "../../infrastructure/db/prismaClient";
import {inject, injectable} from "tsyringe";
import MoviesRepository from "../repositories/movie.repository";
import {MovieDto} from "$lib/common/cdtos/Movie.dto";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
import type {CreateMovieEntity} from "../entities/Movie.entity";
import  {UpdateMovieDto} from "$lib/common/cdtos/UpdateMovie.dto";


@injectable()
export class MovieService {
    constructor(
        @inject(MoviesRepository) readonly moviesRepository: MoviesRepository,
    ) {
    }
    getMovie = async (movieId: number) => {
        const data = await this.moviesRepository.getMovieById(movieId)
        return data ? ({...new MovieDto(data)}) : null
    }

    getAllMovies = async (positions : {start:number, end:number}) => {
        const data = await this.moviesRepository.getAllMovies(positions)

        return data
    }

    setMovie = async (newMovie: CreateMovieDto) => {
        const data = await this.moviesRepository.setMovie(newMovie)
        return new CreateMovieDto(data)
    }

    updateMovie = async (dto: UpdateMovieDto) => {
        // const initialMovie = await this.moviesRepository.getMovieById(dto.id)
        const data = await this.moviesRepository.putMovie(dto)
        return new UpdateMovieDto(data)
    }

     deleteMovie = async (id: any)=>  {
        const data = await this.moviesRepository.deleteMovie(id)
         return new MovieDto(data)
    }
}