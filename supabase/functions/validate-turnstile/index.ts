// Supabase Edge Function: validate-turnstile
// Description: Verifies the Cloudflare Turnstile token before allowing data processing.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY")

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const { token, remoteip } = await req.json()

        if (!token) {
            return new Response(JSON.stringify({ error: "Missing token" }), { status: 400 })
        }

        const formData = new FormData()
        formData.append("secret", TURNSTILE_SECRET_KEY!)
        formData.append("response", token)
        if (remoteip) formData.append("remoteip", remoteip)

        const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            body: formData,
            method: "POST",
        })

        const outcome = await result.json()

        if (outcome.success) {
            return new Response(JSON.stringify({ success: true }), { 
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            })
        } else {
            return new Response(JSON.stringify({ success: false, error: outcome["error-codes"] }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            })
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
