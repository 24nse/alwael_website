import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { MapPin, Calendar, Ruler, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartments from "@/assets/project-apartments.jpg";
import projectCommercial from "@/assets/project-commercial (1).jpg";
import projectInterior from "@/assets/project-interior.jpg";

const categories = ["الكل", "سكني", "تجاري", "تصميم داخلي", "صناعي"];

const projects = [
  {
    id: 1,
    title: "فيلا النخيل الفاخرة",
    category: "سكني",
    location: "ابن سيناء - المكلا",
    year: "2024",
    area: "850 م²",
    description: "فيلا فاخرة بتصميم عصري يجمع بين الأصالة والمعاصرة، تتضمن 5 غرف نوم، مسبح، وحديقة خاصة.",
    image: projectVilla,
  },
  {
    id: 2,
    title: "مجمع الواحة السكني",
    category: "سكني",
    location: "ابن سيناء - المكلا",
    year: "2023",
    area: "15,000 م²",
    description: "مجمع سكني يضم 48 وحدة سكنية متنوعة، مع مرافق ترفيهية ومساحات خضراء واسعة.",
    image: projectApartments,
  },
  {
    id: 3,
    title: "برج الأعمال المركزي",
    category: "تجاري",
    location: "ابن سيناء - المكلا",
    year: "2024",
    area: "25,000 م²",
    description: "برج مكتبي من 20 طابقاً مجهز بأحدث التقنيات الذكية ومعايير الاستدامة.",
    image: projectCommercial,
  },
  {
    id: 4,
    title: "تصميم شقة الأفق",
    category: "تصميم داخلي",
    location: "ابن سيناء - المكلا",
    year: "2024",
    area: "280 م²",
    description: "تصميم داخلي فاخر لشقة بنتهاوس، بأسلوب عصري يجمع بين الأناقة والراحة.",
    image: projectInterior,
  },
  {
    id: 5,
    title: "مجمع الرياض التجاري",
    category: "تجاري",
    location: "ابن سيناء - المكلا",
    year: "2023",
    area: "35,000 م²",
    description: "مركز تجاري متكامل يضم محلات تجارية، مطاعم، ومناطق ترفيهية.",
    image: projectCommercial,
  },
  {
    id: 6,
    title: "فيلا الأمير",
    category: "سكني",
    location: "ابن سيناء - المكلا",
    year: "2022",
    area: "1,200 م²",
    description: "قصر فاخر بتصميم كلاسيكي مع لمسات عصرية، يضم 7 غرف نوم ومرافق متعددة.",
    image: projectVilla,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
                <div className="relative rounded-2xl overflow-hidden shadow-soft card-hover">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
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
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
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
                <span className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-secondary" />
                  {selectedProject.area}
                </span>
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
