import {inject, injectable} from "tsyringe";
import MoviesRepository from "../repositories/movie.repository";
import {MovieDto} from "$lib/common/cdtos/Movie.dto";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
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

    getAllMovies = async (positions : {start:number, end:number, filters: string, sortOrder : string}) => {
        return await this.moviesRepository.getAllMovies(positions)

    }

    setMovie = async (newMovie: CreateMovieDto) => {
        console.log(newMovie)
        const data = await this.moviesRepository.setMovie(newMovie)
        return new CreateMovieDto(data)
    }

    updateMovie = async (dto: UpdateMovieDto) => {
        const data = await this.moviesRepository.putMovie(dto)
        return new UpdateMovieDto(data)
    }

     deleteMovie = async (id: any)=>  {
        const data = await this.moviesRepository.deleteMovie(id)
         return new MovieDto(data)
    }
}