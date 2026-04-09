import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { MapPin, Calendar, Ruler, ArrowLeft, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePublicProjects } from "@/hooks/website/usePublicProjects";

const Projects = () => {
  const { projects, loading, error } = usePublicProjects();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Extract unique categories dynamically from DB data
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    // If DB is empty, fall back to defaults
    if (cats.size === 0) return ["الكل", "سكني", "تجاري", "تصميم داخلي"];
    return ["الكل", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects =
    activeCategory === "الكل"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-secondary rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-secondary rotate-45" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-cairo mb-6">
              أعمالنا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-primary-foreground mb-6">
              مشاريع تتحدث عن
              <span className="text-secondary"> نفسها</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 font-cairo leading-relaxed">
              أكثر من 150 مشروعاً ناجحاً يعكس خبرتنا والتزامنا بالجودة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-secondary" />
              <p className="font-cairo">جاري تحميل المشاريع...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-destructive">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p className="font-cairo text-lg font-semibold">عذراً، حدث خطأ أثناء تحميل المشاريع</p>
              <p className="font-cairo text-sm opacity-80 mt-2">{error.message || "يرجى التحقق من الاتصال والمحاولة مرة أخرى"}</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2.5 rounded-full font-cairo text-sm transition-all duration-300 ${activeCategory === category
                      ? "bg-secondary text-secondary-foreground shadow-gold"
                      : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-cairo">
                  لا توجد مشاريع متاحة في هذا القسم حالياً.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-soft card-hover h-full">
                        {/* Image */}
                        <div className="aspect-[4/3] overflow-hidden">
                          {project.images.length > 0 ? (
                            <img
                              src={project.images[0].image_url}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground font-cairo">لا توجد صورة</span>
                            </div>
                          )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-cairo font-semibold">
                          {project.category}
                        </div>

                        {/* Content on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <h3 className="text-xl font-tajawal font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-white/80 text-sm font-cairo">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </div>
                        </div>

                        {/* Static Content */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/70 to-transparent group-hover:opacity-0 transition-opacity duration-500">
                          <h3 className="text-lg font-tajawal font-bold text-white">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-video">
              {selectedProject.images.length > 0 ? (
                <img
                  src={selectedProject.images[0].image_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground font-cairo">لا توجد صورة</span>
                </div>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/80 text-white flex items-center justify-center hover:bg-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-cairo font-semibold">
                {selectedProject.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-tajawal font-bold text-foreground mb-4">
                {selectedProject.title}
              </h2>

              <div className="flex flex-wrap gap-6 text-muted-foreground font-cairo mb-6">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  {selectedProject.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  {selectedProject.year}
                </span>
                {selectedProject.area && (
                  <span className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-secondary" />
                    {selectedProject.area}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground font-cairo leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              <Button
                variant="secondary"
                className="font-cairo font-semibold shadow-gold"
                asChild
              >
                <Link to="/contact">
                  اطلب مشروعاً مشابهاً
                  <ArrowLeft className="mr-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-foreground mb-6">
              هل لديك مشروع في ذهنك؟
            </h2>
            <p className="text-muted-foreground font-cairo text-lg mb-8">
              دعنا نساعدك في تحويل أفكارك إلى واقع. تواصل معنا للحصول على استشارة مجانية
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/contact">
                تواصل معنا الآن
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
