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

    getAllMovies = async (positions) : Promise<MovieEntity[] & { count: number }> => {

        // Get the total count of movies
        const count = await prisma.movies.count();

        // Get the list of movies with pagination
        const movies = await prisma.movies.findMany({
            skip: positions.start,
            take: positions.end - positions.start,
        });

        // Return both movies and count
        return { data: movies, count };
    };

    getMovieById = async (id: number): Promise<MovieEntity | null> => {
        return prisma.movies.findFirst({
            where: {id}
        });
    }

    setMovie = async (movie: CreateMovieDto): Promise<MovieEntity> => {
        return await prisma.movies.create({
            data: {
                title: movie.title,
                description: movie?.description,
                year: movie?.year,
                rating: movie?.rating,
                isAvailable: movie?.isAvailable,
                genre: movie?.genre,
            },
        });
    }

    putMovie = async (movieEntity: MovieEntity): Promise<Response>  => {
        console.log(movieEntity)
        return await prisma.movies.update({
            where: {
                id: movieEntity.id,
            },
            data: {
                title: movieEntity.title,
                description: movieEntity.description,
                genre: movieEntity.genre,
                rating: movieEntity.rating,
                year: movieEntity.year,
                isAvailable: movieEntity.isAvailable,
            },
        });
    }

    // @ts-ignore
    deleteMovie = async (id: number)=> {
        return await prisma.movies.delete({
            where: {id: id}
        })
    }
}
