
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
//creates an decorator of name @roles that takes in array of string
//we could also use bulit in @setMetaData decorator