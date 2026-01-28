import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Award, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-building.jpg";

const stats = [
  { icon: Building, value: "150+", label: "مشروع منجز" },
  { icon: Users, value: "500+", label: "عميل سعيد" },
  { icon: Award, value: "25+", label: "سنة خبرة" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="مبنى الوعل الفاخر"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Geometric Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-secondary/30 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-secondary/20 rotate-12 hidden lg:block" />
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-secondary/40 rotate-45 hidden lg:block animate-float" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm text-secondary text-sm font-cairo mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              نبني المستقبل بخبرة وإتقان
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-tajawal font-bold text-white leading-tight mb-6 text-shadow"
          >
            نُحَوِّل
            <span className="text-secondary"> أحلامك </span>
            إلى
            <br />
            واقع معماري فاخر
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-cairo leading-relaxed mb-8 max-w-2xl"
          >
            شركة الوعل للعقارات والمقاولات، خبرة تمتد لأكثر من 25 عاماً في البناء والتطوير العقاري.
            نقدم حلولاً متكاملة تجمع بين الجودة والابتكار والالتزام بأعلى المعايير.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button
              size="lg"
              variant="secondary"
              className="font-cairo font-semibold text-base px-8 shadow-gold hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/contact">
                ابدأ مشروعك الآن
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-cairo font-semibold text-base px-8 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              asChild
            >
              <Link to="/projects">
                <Play className="ml-2 w-5 h-5" />
                استعرض مشاريعنا
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-tajawal font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70 font-cairo">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-sm font-cairo">اسحب للأسفل</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
