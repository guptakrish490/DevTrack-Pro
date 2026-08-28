import { z } from 'zod';

export const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must have atleast 3 characters.")
        .max(100, "Title must have less than 100 characters."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters long.")
        .max(1000, "Description must have less than 1000 characters."),

    priority: z
        .enum(["Low", "Medium", "High"], {
            required_error: "Priority is required.",
        }),

    status: z
        .enum(["Planned", "In Progress", "Completed"])
        .default("Planned"),

    startDate: z
        .union([
            z.string().transform((val) => (val === "" ? new Date() : new Date(val))),
            z.date(),
            z.null(),
        ])
        .default(new Date()),

    completedAt: z
        .union([
            z.string().transform((val) => (val === "" ? null : new Date(val))),
            z.date(),
            z.null(),
        ])
        .default(null),

    dueDate: z
        .union([
            z.string().transform((val) => (val === "" ? null : new Date(val))),
            z.date(),
            z.null(),
        ])
        .default(null),

    relatedProject: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
        .nullable()
        .optional(),


}).refine(
    (data) => !data.dueDate || data.startDate <= data.dueDate,
    {
        message: "Due date must be on or after start date",
        path: ["dueDate"],
    }
).refine(
    (data) => !data.completedAt || data.startDate <= data.completedAt,
    {
        message: "Completed date must be on or after start date",
        path: ["completedAt"],
    }
)