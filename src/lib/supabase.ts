import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export a safe client instance
// This prevents the app from crashing if environment variables are missing
export const supabase = (() => {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error(
            '❌ MISSING SUPABASE CREDENTIALS: Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
        );

        // Return a dummy client that fails gracefully for common operations
        // This allows the app to load "Error" states instead of crashing blank
        const chainable = {
            select: () => chainable,
            insert: () => Promise.resolve({ error: { message: 'Supabase not configured' }, data: null }),
            update: () => Promise.resolve({ error: { message: 'Supabase not configured' }, data: null }),
            delete: () => Promise.resolve({ error: { message: 'Supabase not configured' }, data: null }),
            eq: () => chainable,
            order: () => chainable,
            limit: () => chainable,
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            // This makes the object awaitable, resolving to an error
            then: (resolve: any) => Promise.resolve({ data: [], error: { message: 'Supabase Credentials Missing' } }).then(resolve)
        };

        return {
            from: () => chainable,
            auth: {
                signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
                signOut: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                getSession: () => Promise.resolve({ data: { session: null } }),
            }
        } as any;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
})();
