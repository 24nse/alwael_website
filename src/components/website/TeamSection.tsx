import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { usePublicTeam } from '@/hooks/website/usePublicTeam';

export function TeamSection() {
    const { teamMembers, loading, error } = usePublicTeam();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    if (loading) {
        return (
            <section ref={ref} className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
                        <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section ref={ref} className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-destructive font-cairo">حدث خطأ في تحميل البيانات</p>
                </div>
            </section>
        );
    }

    if (teamMembers.length === 0) {
        return null;
    }

    return (
        <section ref={ref} id="team" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
                        فريقنا
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-foreground mb-6">
                        فريق من <span className="text-secondary">المحترفين</span>
                    </h2>
                    <p className="text-muted-foreground font-cairo text-lg">
                        فريق ذو خبرة واسعة في مجال العقارات والمقاولات
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                            className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 card-hover"
                        >
                            {member.image_url && (
                                <div className="mb-4 flex justify-center">
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-secondary/20"
                                        loading="lazy"
                                        width="96"
                                        height="96"
                                    />
                                </div>
                            )}
                            <h3 className="font-tajawal font-bold text-lg text-center mb-1">
                                {member.name}
                            </h3>
                            <p className="text-secondary text-center mb-2 font-cairo font-semibold">
                                {member.position}
                            </p>
                            <p className="text-muted-foreground text-sm text-center mb-4 font-cairo">
                                {member.department}
                            </p>
                            {member.bio && (
                                <p className="text-sm text-muted-foreground mb-4 font-cairo text-center">
                                    {member.bio}
                                </p>
                            )}
                            <div className="flex flex-col gap-2 text-sm">
                                {member.phone && (
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground font-cairo">
                                        <Phone className="w-4 h-4" />
                                        <span dir="ltr">{member.phone}</span>
                                    </div>
                                )}
                                {member.email && (
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground font-cairo">
                                        <Mail className="w-4 h-4" />
                                        <span dir="ltr">{member.email}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TeamSection;
