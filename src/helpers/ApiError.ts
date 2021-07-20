export default class ApiError extends Error {
    status: number;

    message: string;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
