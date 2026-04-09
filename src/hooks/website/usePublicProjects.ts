import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/** Raw row shape returned from Supabase (matches the DB schema) */
export interface PublicProjectRaw {
    id: string;
    title: string;
    description: string | null;
    category: string;
    location: string | null;
    area_sqm: number | null;
    completion_date: string | null;
    features: string[] | null;
    status: string;
    featured: boolean;
    created_at: string;
    images: { id: string; image_url: string; display_order: number }[];
}

/** Normalised shape used by components */
export interface PublicProject {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    /** e.g. "850 م²" */
    area: string | null;
    /** e.g. "2024" */
    year: string | null;
    features: string[];
    status: string;
    featured: boolean;
    created_at: string;
    images: { id: string; image_url: string; display_order: number }[];
    /** Raw DB fields preserved for consumers that need them */
    area_sqm: number | null;
    completion_date: string | null;
}

function normalise(raw: PublicProjectRaw): PublicProject {
    return {
        ...raw,
        description: raw.description ?? '',
        location: raw.location ?? '',
        features: raw.features ?? [],
        area: raw.area_sqm != null ? `${raw.area_sqm} م²` : null,
        year: raw.completion_date
            ? new Date(raw.completion_date).getFullYear().toString()
            : null,
    };
}

export function usePublicProjects(options?: { featuredOnly?: boolean; limit?: number }) {
    const [projects, setProjects] = useState<PublicProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options?.featuredOnly, options?.limit]);

    const fetchProjects = async () => {
        try {
            setLoading(true);

            let query = supabase
                .from('projects')
                .select(`
                    *,
                    images:project_images(id, image_url, display_order)
                `)
                .order('created_at', { ascending: false });

            if (options?.featuredOnly) {
                query = query.eq('featured', true);
            }

            if (options?.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            const normalised = (data as PublicProjectRaw[] || []).map((project) => ({
                ...project,
                images: (project.images || []).sort(
                    (a, b) => a.display_order - b.display_order
                ),
            })).map(normalise);

            setProjects(normalised);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    return { projects, loading, error, refetch: fetchProjects };
}
