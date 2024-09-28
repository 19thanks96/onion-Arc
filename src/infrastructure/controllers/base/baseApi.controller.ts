import {json} from "@sveltejs/kit";
import {AppError, AppException} from "../../../common/AppException";
import type {Response} from "@playwright/test";


export class BaseApiController {

    protected async wrapResponse<T>(apiFunction: (...args: any[]) => Promise<T>, ...args: any[]): Promise<Response>  {
        try {
            const data = await apiFunction();
            // @ts-ignore
            return json({data, success: true}, { status: 200 });
        } catch (error: any) {
            console.log(error);
            // @ts-ignore
            return json({
                success: false,
                message: error?.message ,
                status: error?.status,
                payload: error?.payload,
                type: error instanceof AppError ? error?.type : AppException.unhandledException
            },  {
                status: error?.status || 500
            });
        }
    }
}
