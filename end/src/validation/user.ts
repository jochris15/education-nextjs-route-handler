import { z } from "zod";

export const schemaUser = z.object({
    name: z.string({
        message: "Username Required"
    }),
    email: z.string({
        message: "Email Required"
    }).email({
        message: "Invalid email format"
    }),
    password: z.string({
        message: "Password Required"
    }).min(5, {
        message: "Password min 5 characters"
    }).max(255, {
        message: "Password max 255 characters"
    })
});

export type TUser = z.infer<typeof schemaUser>; 
