import { z } from "zod";

const baseGoalSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters.")
        .max(150, "Title cannot exceed 150 characters."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters.")
        .max(1000, "Description cannot exceed 1000 characters."),

    isCompleted: z.boolean().default(false),

    startDate: z.coerce.date().default(() => new Date()),

    endDate: z.coerce.date(),
});

export const goalsSchema = baseGoalSchema.refine(
    (data) => data.startDate < data.endDate,
    {
        message: "End date must be after start date",
        path: ["endDate"],
    }
);

export const goalsPatchSchema = baseGoalSchema.partial();
