import { z } from 'zod';

export const userSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .max(20, "Name must have less than 20 characters."),

    gender: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.enum(["Male", "Female", "Others"]).nullable().optional()
    ),

    location: z
        .string()
        .optional(),

    username: z
        .string()
        .trim()
        .min(8, "Username must be at least 8 characters.")
        .max(13, "Username must be at most 13 characters."),

    email: z
        .string()
        .trim()
        .email("Must be a valid email address."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(13, "Password must be at most 13 characters.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),

    links: z
        .array(
            z.object({
                platform: z.string().trim().min(1, "Platform name is required."),
                url: z.preprocess(
                    (val) => (val === "" ? null : val),
                    z.string().url("Must be a valid URL.").nullable()
                )
            })
        )
        .optional(),

    others: z
        .object({
            workplace: z.string().optional(),
            role: z.string().optional(),
            instituteName: z.string().optional(),
            skills: z.array(z.string().trim()).optional(),
        })
        .optional(),

    bio: z
        .string()
        .trim()
        .max(3000, "Bio must be less than 3000 characters.")
        .min(30, "You can atleast define yourself in 30 characters. Can't you?"),

    avatarURL: z
        .string()
        .url("Must be a valid URL.")
        .default("https://www.gravatar.com/avatar/?d=mp"),

    currentStreak: z
        .number()
        .default(1),

    longestStreak: z
        .number()
        .default(1),
})