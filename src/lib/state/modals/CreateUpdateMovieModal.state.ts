import {writable} from "svelte/store";
import type {MovieDto} from "$lib/common/cdtos/Movie.dto";
import {Genre, type Modal} from "$lib/enum";
import _ from "lodash";

export const initialCreateUpdateMovieModalState: MovieDto & Modal = {
    isOpen: false,
    errors: {} as any,
    id: 0,
    title: '',
    description: '',
    rating: undefined,
    createdAt: undefined,
    isAvailable: undefined,
    year: undefined,
    genre: undefined
}


export const CreateUpdateMovieModalState = writable(_.cloneDeep(initialCreateUpdateMovieModalState));