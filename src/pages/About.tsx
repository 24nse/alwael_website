import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { CheckCircle2, Target, Eye, Heart, Users, Award, Building } from "lucide-react";
import projectInterior from "@/assets/project-interior.jpg";
import projectCommercial from "@/assets/project-commercial (1).jpg";

const values = [
  {
    icon: Target,
    title: "الإتقان",
    description: "نسعى للتميز في كل تفصيلة، من التصميم وحتى التنفيذ النهائي.",
  },
  {
    icon: Heart,
    title: "الأمانة",
    description: "الشفافية والصدق مع عملائنا هي أساس كل علاقة نبنيها.",
  },
  {
    icon: Users,
    title: "العمل الجماعي",
    description: "نؤمن بقوة الفريق الواحد والتعاون لتحقيق أفضل النتائج.",
  },
  {
    icon: Award,
    title: "الابتكار",
    description: "نبحث دائماً عن حلول جديدة ومبتكرة تفوق التوقعات.",
  },
];

const milestones = [
  { year: "1999", title: "تأسيس الشركة", description: "انطلاق رحلة الوعل في عالم المقاولات" },
  { year: "2005", title: "التوسع الإقليمي", description: "افتتاح فروع في جدة والدمام" },
  { year: "2010", title: "100 مشروع", description: "الوصول لإنجاز 100 مشروع متميز" },
  { year: "2015", title: "شراكات دولية", description: "توقيع شراكات مع شركات عالمية" },
  { year: "2020", title: "التحول الرقمي", description: "تبني أحدث التقنيات في البناء" },
  { year: "2024", title: "150+ مشروع", description: "استمرار النمو والتميز" },
];

const About = () => {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

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
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-cairo mb-6">
              من نحن
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-primary-foreground mb-6">
              نبني الثقة منذ
              <span className="text-secondary"> 1999</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 font-cairo leading-relaxed">
              ربع قرن من الإنجازات والتميز في عالم العقارات والمقاولات
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-muted-foreground font-cairo leading-relaxed">
                <p>
                  بدأت رحلة شركة الوعل للعقارات والمقاولات في عام 1999، برؤية طموحة
                  لتقديم خدمات بناء متميزة تجمع بين الجودة العالية والابتكار في التصميم.
                </p>
                <p>
                  على مدار أكثر من 25 عاماً، نمت الشركة لتصبح واحدة من أبرز الشركات
                  في اليمن، مع سجل حافل يضم أكثر من 150 مشروعاً
                  ناجحاً في مختلف المجالات السكنية والتجارية.
                </p>
                <p>
                  اليوم، نفخر بفريق يضم أكثر من 200 متخصص، من مهندسين ومعماريين
                  وحرفيين مهرة، جميعهم يشاركون شغفنا بتحويل أحلام عملائنا إلى واقع.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={projectCommercial}
                alt="مبنى الوعل التجاري"
                className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-secondary rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-tajawal font-bold text-foreground mb-4">
                رؤيتنا
              </h3>
              <p className="text-muted-foreground font-cairo leading-relaxed">
                أن نكون الخيار الأول في مجال العقارات والمقاولات في اليمن،
                السعودية، من خلال تقديم مشاريع استثنائية تحدث فارقاً في حياة الناس
                وتسهم في بناء مستقبل أفضل.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-tajawal font-bold text-foreground mb-4">
                مهمتنا
              </h3>
              <p className="text-muted-foreground font-cairo leading-relaxed">
                تقديم حلول عقارية وإنشائية متكاملة بأعلى معايير الجودة والاحترافية،
                مع الالتزام التام بالمواعيد والميزانيات المحددة، وبناء علاقات طويلة
                الأمد مع عملائنا قائمة على الثقة والشفافية.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
              قيمنا
            </span>
            <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-foreground">
              المبادئ التي
              <span className="text-secondary"> نؤمن بها</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-soft card-hover"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-cairo text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-cairo mb-4">
              مسيرتنا
            </span>
            <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-primary-foreground">
              محطات في رحلة
              <span className="text-secondary"> النجاح</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 right-1/2 w-px bg-secondary/30 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <div className="text-secondary font-tajawal font-bold text-2xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-primary-foreground font-tajawal font-bold text-lg mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-primary-foreground/70 font-cairo text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-secondary shrink-0 hidden md:block" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
