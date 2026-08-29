import { z } from "zod";


const baseFields = {
    title: z
        .string()
        .trim()
        .max(200, "Title must be less than 200 characters."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters.")
        .max(1500, "Description must be less than 1500 characters."),

    repoURL: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .default(null),

    liveURL: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .default(null),

    startDate: z.coerce.date().optional().default(() => new Date()),

    endDate: z
        .union([
            z.string().transform((val) => (val === "" ? null : new Date(val))),
            z.date(),
            z.null(),
        ])
        .default(null),

    status: z.enum(["Planned", "In Progress", "Completed"]).default("Planned"),

    techStack: z.array(z.string().trim()).default([]),
};

const baseSchema = z.object(baseFields);

export const projectSchema = baseSchema
    .refine(
        (data) => !data.endDate || data.startDate <= data.endDate,
        {
            message: "End date must be on or after start date",
            path: ["endDate"],
        }
    )
    .refine(
        (data) => data.status !== "Completed" || data.endDate !== null,
        {
            message: "End date is required when project is marked Completed",
            path: ["endDate"],
        }
    )
    .refine(
        (data) => data.repoURL === null || /^https?:\/\/.+/.test(data.repoURL),
        { message: "Must be a valid URL", path: ["repoURL"] }
    )
    .refine(
        (data) => data.liveURL === null || /^https?:\/\/.+/.test(data.liveURL),
        { message: "Must be a valid URL", path: ["liveURL"] }
    )
    .refine(
        (data) => data.techStack.length === new Set(data.techStack).size,
        { message: "Duplicate values in TechStack.", path: ["techStack"] }
    );

// Step 4: derive PATCH schema (no refinements)
export const projectPatchSchema = baseSchema.partial();
