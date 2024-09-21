export class AppError extends Error {
    status: number;
    payload: any;
    type: string

    constructor(data: any) {
        super(data?.message);
        this.status = data?.status;
        this.payload = data?.payload
        this.type = data?.type;
    }
}


export const throwServiceValidationException = (appException: string, payload?: any) => {
    throw new AppError({
        message: 'Validation exception',
        status: 400,
        payload,
        type: appException
    })
}

export const throwControllerValidationException = (payload: any, appException: string) => {
    throw new AppError({
        message: 'Validation exception',
        status: 400,
        payload,
        type: appException
    })
}