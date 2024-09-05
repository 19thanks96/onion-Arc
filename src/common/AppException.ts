export enum AppException {
    unhandledException = 'unhandledException',

}


export class AppError extends Error {
    status: number;
    payload: any;
    type: AppException

    constructor(data: any) {
        super(data?.message);
        this.status = data?.status;
        this.payload = data?.payload
        this.type = data?.type;
    }
}