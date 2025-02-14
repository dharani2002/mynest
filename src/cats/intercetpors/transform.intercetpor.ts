import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T>{
    data:T;
}


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        console.log("interceptor:tranforming...")
        return next.handle().pipe(map(data=>({data})))
    }
}

//eg. transform each occuence of null to a empty string
//.pipe(map(value => value === null ? '' : value ));

//we can also overide thrown exceptions using
//.pipe(
//     catchError(err => throwError(() => new BadGatewayException())),
// );

//stream overiding for caching purposes

