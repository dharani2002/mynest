import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface UserEntity{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    roles:string[];
}
export const User=createParamDecorator(
    (data:string,ctx:ExecutionContext)=>{
        const request=ctx.switchToHttp().getResponse()
        const user= request.user

        return data? user?.[data]:user
    },
)