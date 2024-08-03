import { z } from "zod";
export const spaceSchema = z.object({
    spaceName:z.string().min(2,{message:"Space name must be at least 2 characters long"}).max(100,{message:"Space name cannot be longer than 100"}),
    headerTitle:z.string().min(2,{message:"Header Title must be at least 2 characters"}).max(100,{message:"Header Title cannot be longer than 100"}),
    isSquare:z.boolean().default(false),
    customMessage:z.string().optional(),
    question:z.string().array().min(1,{message:"There should be at least 1 question"}),
    isStars:z.boolean().default(true),
    collectionType:z.string(),
    language:z.string(),
    imageUrl:z.string().default('/hulk.jpeg')
})