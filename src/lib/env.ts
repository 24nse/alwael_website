import { z } from 'zod';

/**
 * Build-time environment variable validation.
 * This module validates that all required environment variables are present
 * and correctly formatted. If any are missing, the application will fail
 * immediately with a clear error message instead of silently degrading.
 */
const envSchema = z.object({
    VITE_SUPABASE_URL: z
        .string({ required_error: '❌ VITE_SUPABASE_URL is required' })
        .url('❌ VITE_SUPABASE_URL must be a valid URL (e.g., https://xxx.supabase.co)'),
    VITE_SUPABASE_ANON_KEY: z
        .string({ required_error: '❌ VITE_SUPABASE_ANON_KEY is required' })
        .min(30, '❌ VITE_SUPABASE_ANON_KEY appears invalid (too short)'),
});

function validateEnv() {
    const result = envSchema.safeParse({
        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    });

    if (!result.success) {
        const errors = result.error.issues
            .map((issue) => `  • ${issue.message}`)
            .join('\n');

        const message = [
            '',
            '╔══════════════════════════════════════════════════════╗',
            '║      MISSING ENVIRONMENT VARIABLES                  ║',
            '╚══════════════════════════════════════════════════════╝',
            '',
            errors,
            '',
            'Fix: Create a .env file in the project root with:',
            '  VITE_SUPABASE_URL=https://your-project.supabase.co',
            '  VITE_SUPABASE_ANON_KEY=your-anon-key-here',
            '',
            'See .env.example for reference.',
            '',
        ].join('\n');

        throw new Error(message);
    }

    return result.data;
}

export const env = validateEnv();
