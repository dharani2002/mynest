import {z} from 'zod';

export const userSchema=z
.object({
    id:z.number(),
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email(),
    roles:z.array(z.string())
})
.required();

export type userDto=z.infer<typeof userSchema>