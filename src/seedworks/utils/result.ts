export interface IResult<T> {
    statusCode: number;
    message: string;
    data: T;
}

export class Result<T> implements IResult<T> {
    statusCode: number = 200;
    data: T;
    message: string = '';

    constructor(data?: T, status?: number, message?: string) {
        this.statusCode = status || 200;
        this.message = message || '';
        if (data)
            this.data = data;
        else
            this.data = Object({});
    }

    /*
    * name: Result
    */
    static Response<T>(data?: T, statusCode?: number, message?: string) {
        return new Result<T>(data, statusCode, message);
    }
}