import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException{
    constructor(){
        super("forbidden",HttpStatus.FORBIDDEN)
    }
}
//exception filters are after client side whereas pipes are just before the route endpoint