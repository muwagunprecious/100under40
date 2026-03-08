import { z } from 'zod';

export const nominationSchema = z.object({
    // Nominee Details
    nomineeName: z.string().min(2, "Nominee name must be at least 2 characters"),
    nomineeEmail: z.string().email("Invalid email address"),
    nomineePhone: z.string().optional(),
    nomineeSocial: z.string().min(3, "Social media handle/link is required"),
    nomineeAge: z.coerce.number().min(18, "Nominee must be at least 18").max(40, "Nominee must be 40 or under"),
    categoryId: z.string().min(1, "Please select a category"),

    // Achievement
    achievements: z.string().min(50, "Please provide a detailed description (min 50 characters)"),
    supportingDocs: z.string().optional(), // Can be a URL or list of URLs

    // Nominator Details
    nominatorName: z.string().min(2, "Your name must be at least 2 characters"),
    nominatorEmail: z.string().email("Invalid email address"),
    nominatorPhone: z.string().optional(),
});

export type NominationFormData = z.infer<typeof nominationSchema>;
