import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";


@Injectable()
export class ValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}

export class ZodValidationPipe implements PipeTransform{
    constructor(private schema :ZodSchema){}
    transform(value: any, metadata: ArgumentMetadata) {
        try {
           const parsedValue=this.schema.parse(value)
           console.log("pipe:validating...")
           return parsedValue 
        } catch (error) {
            throw new BadRequestException("Validation failed")
        }
    }
}
// lets make a pipe that ensures incoming request has a valid body
// why a validation pipe?
// we could do validation in route handler method itself but that would break SRP
// we could create validation middleware  but it has be generic thats not feasible
