import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface PublicTeamMember {
    id: string;
    name: string;
    position: string;
    department: string;
    phone: string;
    email: string;
    image_url: string | null;
    bio: string | null;
    display_order: number;
}

export function usePublicTeam() {
    const [teamMembers, setTeamMembers] = useState<PublicTeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);

            const { data, error: fetchError } = await supabase
                .from('team_members')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (fetchError) throw fetchError;

            setTeamMembers(data || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch team members');
            console.error('Error fetching team members:', err);
        } finally {
            setLoading(false);
        }
    };

    return { teamMembers, loading, error, refetch: fetchTeamMembers };
}
