import {injectable} from "tsyringe";
import {prisma} from "../../infrastructure/db/prismaClient";
import type {CreateMovieEntity, MovieEntity} from "../entities/Movie.entity";
import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";

interface IMoviesRepository {
    getAllMovies(positions:{start:number, end:number, filters: string, sortOrder : string}) : Promise<{data: MovieEntity[],  count: number }>,
    getMovieById(id: number): Promise<MovieEntity | null>,
    setMovie(movie: CreateMovieDto): Promise<CreateMovieEntity>,
    putMovie(movieEntity: MovieEntity): Promise<MovieEntity>,
    deleteMovie(id: number): Promise<MovieEntity>,
}

@injectable()
export default class MoviesRepository implements IMoviesRepository {

    getAllMovies = async (positions:{start:number, end:number, filters: string, sortOrder : string}) : Promise<{data: MovieEntity[],  count: number }> => {
        const count = await prisma.movies.count();

        const movies  = await prisma.movies.findMany({
            orderBy: {
                [positions.filters]: positions.sortOrder,
            },
            skip: positions.start,
            take: positions.end - positions.start,
        });

        return { data: movies, count };
    };

    getMovieById = async (id: number): Promise<MovieEntity | null> =>
        await prisma.movies.findFirst({
            where: {
                id
            }
        });


    setMovie = async (movie: CreateMovieDto): Promise<CreateMovieEntity> =>
         await prisma.movies.create({
            data: {
                title: movie.title,
                description: movie?.description,
                year: movie?.year,
                rating: movie?.rating,
                isAvailable: movie?.isAvailable,
                genre: movie?.genre,
            },
        });


    putMovie = async (movieEntity: MovieEntity)  =>
         await prisma.movies.update({
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



    deleteMovie = async (id: number)=>
         await prisma.movies.delete({
            where: {id: id}
        })
}
