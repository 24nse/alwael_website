import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Building2, 
  Home, 
  Palette, 
  ClipboardList, 
  Lightbulb,
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "البناء والتشييد",
    description: "نقدم خدمات بناء متكاملة للمشاريع السكنية والتجارية بأعلى معايير الجودة والسلامة.",
    features: ["مباني سكنية", "أبراج تجارية", "مجمعات صناعية"],
  },
  {
    icon: Home,
    title: "التطوير العقاري",
    description: "نطور مشاريع عقارية مبتكرة تلبي احتياجات السوق وتحقق أعلى العوائد الاستثمارية.",
    features: ["مشاريع سكنية", "مراكز تجارية", "مشاريع متعددة الاستخدام"],
  },
  {
    icon: Palette,
    title: "التصميم الداخلي",
    description: "نبدع في تصميم المساحات الداخلية بأسلوب عصري يجمع بين الجمال والوظيفية.",
    features: ["تصميم المنازل", "المكاتب التجارية", "الفنادق والمطاعم"],
  },
  {
    icon: ClipboardList,
    title: "إدارة المشاريع",
    description: "نوفر إدارة احترافية شاملة للمشاريع من التخطيط وحتى التسليم.",
    features: ["تخطيط استراتيجي", "متابعة ميدانية", "ضبط الجودة"],
  },
  {
    icon: Lightbulb,
    title: "الاستشارات الهندسية",
    description: "نقدم استشارات هندسية متخصصة تساعدك في اتخاذ القرارات الصحيحة.",
    features: ["دراسات جدوى", "تحليل تقني", "حلول مبتكرة"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-foreground mb-6">
            حلول متكاملة لكل
            <span className="text-secondary"> احتياجاتك</span>
          </h2>
          <p className="text-muted-foreground font-cairo text-lg">
            نقدم مجموعة شاملة من الخدمات العقارية والإنشائية المصممة لتلبية 
            احتياجاتك وتحقيق تطلعاتك بأعلى مستويات الجودة.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-soft card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-tajawal font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-cairo text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm font-cairo text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-secondary font-cairo text-sm font-semibold group-hover:gap-3 transition-all duration-300"
              >
                اعرف المزيد
                <ArrowLeft className="w-4 h-4" />
              </Link>
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
            <Link to="/services">
              استعرض جميع خدماتنا
              <ArrowLeft className="mr-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
