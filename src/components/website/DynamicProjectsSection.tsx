import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicProjects } from '@/hooks/website/usePublicProjects';

export function DynamicProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('الكل');
    const { projects, loading, error } = usePublicProjects({ limit: 6 });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Derive categories dynamically from DB data
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.category).filter(Boolean));
        if (cats.size === 0) return ['الكل', 'سكني', 'تجاري', 'تصميم داخلي'];
        return ['الكل', ...Array.from(cats)];
    }, [projects]);

    const filteredProjects =
        activeCategory === 'الكل'
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    if (loading) {
        return (
            <section ref={ref} className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
                        <div className="h-4 bg-muted rounded w-64 mx-auto mb-12"></div>
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-96 bg-muted rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section ref={ref} className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-destructive font-cairo">حدث خطأ في تحميل المشاريع</p>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return null;
    }

    return (
        <section ref={ref} className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
                        أعمالنا
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-foreground mb-6">
                        مشاريع تتحدث عن
                        <span className="text-secondary"> نفسها</span>
                    </h2>
                    <p className="text-muted-foreground font-cairo text-lg">
                        نفتخر بمجموعة من المشاريع المتميزة التي تعكس خبرتنا والتزامنا بالجودة
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full font-cairo text-sm transition-all duration-300 ${activeCategory === category
                                    ? 'bg-secondary text-secondary-foreground shadow-gold'
                                    : 'bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden shadow-soft card-hover"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] overflow-hidden">
                                {project.images.length > 0 ? (
                                    <img
                                        src={project.images[0].image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        width="800"
                                        height="600"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-muted-foreground font-cairo">لا توجد صورة</span>
                                    </div>
                                )}
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Category Badge */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-cairo font-semibold">
                                {project.category}
                            </div>

                            {/* Featured Badge */}
                            {project.featured && (
                                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-yellow-500 text-yellow-900 text-xs font-cairo font-semibold">
                                    مميز
                                </div>
                            )}

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <h3 className="text-xl font-tajawal font-bold text-white mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 text-sm font-cairo mb-3 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-4 text-white/80 text-sm font-cairo mb-4">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {project.location}
                                    </span>
                                    {project.year && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {project.year}
                                        </span>
                                    )}
                                    {project.area && (
                                        <span className="flex items-center gap-1">
                                            <Ruler className="w-4 h-4" />
                                            {project.area}
                                        </span>
                                    )}
                                </div>
                                {project.features.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.features.slice(0, 3).map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-white/20 text-white px-2 py-1 rounded font-cairo"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 text-secondary font-cairo font-semibold text-sm hover:gap-3 transition-all"
                                >
                                    عرض التفاصيل
                                    <ArrowLeft className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Static Title (visible when not hovering) */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-primary/80 to-transparent group-hover:opacity-0 transition-opacity duration-500">
                                <h3 className="text-lg font-tajawal font-bold text-white">
                                    {project.title}
                                </h3>
                                <span className="text-white/70 text-sm font-cairo">
                                    {project.location}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Button
                        variant="secondary"
                        size="lg"
                        className="font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
                        asChild
                    >
                        <Link to="/projects">
                            عرض جميع المشاريع
                            <ArrowLeft className="mr-2 w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

export default DynamicProjectsSection;
