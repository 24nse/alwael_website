import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface PublicContentSection {
    id: string;
    section_key: string;
    title: string;
    content: string;
    image_url: string | null;
}

export function usePublicContent(sectionKey?: string) {
    const [content, setContent] = useState<PublicContentSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchContent();
    }, [sectionKey]);

    const fetchContent = async () => {
        try {
            setLoading(true);

            let query = supabase
                .from('content_sections')
                .select('*')
                .eq('is_active', true);

            if (sectionKey) {
                query = query.eq('section_key', sectionKey);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            setContent(data || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch content');
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const getSection = (key: string) => {
        return content.find(section => section.section_key === key);
    };

    return { content, loading, error, refetch: fetchContent, getSection };
}
