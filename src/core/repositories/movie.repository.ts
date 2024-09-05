import {injectable} from "tsyringe";
import {prisma} from "../../infrastructure/db/prismaClient";
import type {CreateMovieEntity, MovieEntity} from "../entities/Movie.entity";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";

interface IMoviesRepository {
    getAllMovies(): Promise<MovieEntity[]>,
    getMovieById(id: number): Promise<MovieEntity[]>,

    setMovie(movie: FormData): Promise<MovieEntity>,
    putMovie(movieEntity: MovieEntity): Promise<Response>,
    deleteMovie(id: number): Promise<MovieEntity>,
}

@injectable()
export default class MoviesRepository implements IMoviesRepository {

    getAllMovies = async () : Promise<MovieEntity[]> => {
        return prisma.movies.findMany();
    }

    getMovieById = async (id: number): Promise<MovieEntity[] | null> => {
        return prisma.movies.findFirst({
            where: {id}
        });
    }

    setMovie = async (movie: CreateMovieDto): Promise<MovieEntity> => {
        return prisma.movies.create({
            data: {
                title: movie.title,
                description: movie.description,
            },
        });
    }

    putMovie = async (movieEntity: MovieEntity): Promise<Response>  => {
        return await prisma.movies.update({
            where: {
                id: movieEntity.id,
            },
            data: {
                title: movieEntity.title,
                description: movieEntity.description,
            },
        });
    }

    deleteMovie = async (id: number)=> {
        return await prisma.movies.delete({
            where: {id: id}
        })
    }
}
