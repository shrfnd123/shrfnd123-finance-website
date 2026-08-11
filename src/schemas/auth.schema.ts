import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const loginSchemaResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginSchemaResponse = z.infer<typeof loginSchemaResponse>;
