import { z } from 'zod';

export const projectSchema = z.object({
    title: z
        .string()
        .trim()
        .max(200, "Title must be less than 200 characters."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters.")
        .max(1500, "Description must be less than 1500 characters."),

    repoURL: z.
        string()
        .transform((val) => val === "" ? null : val)
        .nullable()
        .default(null)
        .refine((val) => val === null || /^https?:\/\/.+/.test(val), {
            message: "Must be a valid URL"
        }),

    liveURL: z.
        string()
        .transform((val) => val === "" ? null : val)
        .nullable()
        .default(null)
        .refine((val) => val === null || /^https?:\/\/.+/.test(val), {
            message: "Must be a valid URL"
        }),

    startDate: z
        .coerce.date()
        .optional()
        .default(() => new Date()),

    endDate: z
        .union([
            z.string().transform((val) => (val === "" ? null : new Date(val))),
            z.date(),
            z.null(),
        ])
        .default(null),

    status: z
        .enum(["Planned", "In Progress", "Completed"])
        .default("Planned"),

    techStack: z
        .array(z.string().trim())
        .default([])
        .refine(arr => arr.length === new Set(arr).size, {
            message: "Duplicate values in TechStack."
        })

}).refine(
    (data) => !data.endDate || data.startDate <= data.endDate,
    {
        message: "End date must be on or after start date",
        path: ["endDate"],
    }
);