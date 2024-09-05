import {json} from "@sveltejs/kit";
import {AppError, AppException} from "../../../common/AppException";


export class BaseApiController {

    protected async wrapResponse<T>(apiFunction: (...args: any[]) => Promise<T>, ...args: any[]) {
        try {
            const data = await apiFunction();
            return json({data, success: true});
        } catch (error: any) {
            console.log(error);
            return json({
                success: false,
                message: error?.message ,
                status: error?.status,
                payload: error?.payload,
                type: error instanceof AppError ? error?.type : AppException.unhandledException
            });
        }
    }
}