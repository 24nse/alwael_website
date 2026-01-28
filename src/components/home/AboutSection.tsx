import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectInterior from "@/assets/project-interior.jpg";

const features = [
  "خبرة تتجاوز 25 عاماً في السوق اليمني",
  "فريق هندسي متخصص ومعتمد دولياً",
  "التزام بالجودة والمواعيد المحددة",
  "استخدام أحدث التقنيات والمواد",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background geometric-pattern">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <img
                  src={projectInterior}
                  alt="تصميم داخلي فاخر"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-strong p-6 max-w-[200px]">
                <div className="text-4xl font-tajawal font-bold text-secondary mb-1">
                  25+
                </div>
                <div className="text-foreground font-cairo">
                  سنة من الخبرة والإنجازات
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-secondary/30 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
              من نحن
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-foreground mb-6">
              نبني الثقة قبل
              <span className="text-secondary"> المباني</span>
            </h2>

            <p className="text-lg text-muted-foreground font-cairo leading-relaxed mb-6">
              منذ تأسيسها، رسخت شركة الوعل للعقارات والمقاولات مكانتها كواحدة من
              أبرز الشركات في اليمن. نفخر بتقديم خدمات شاملة
              في البناء والتطوير العقاري، مع التزامنا الثابت بأعلى معايير الجودة.
            </p>

            <p className="text-muted-foreground font-cairo leading-relaxed mb-8">
              نؤمن بأن كل مشروع هو قصة نجاح جديدة، ونعمل بشغف لتحويل رؤى عملائنا
              إلى واقع ملموس يفوق توقعاتهم.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-foreground font-cairo text-sm">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/about">
                اعرف المزيد عنا
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
