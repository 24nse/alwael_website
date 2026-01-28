import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  Building2,
  Home,
  Palette,
  ClipboardList,
  Lightbulb,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const services = [
  {
    id: "construction",
    icon: Building2,
    title: "البناء والتشييد",
    description:
      "نقدم خدمات بناء شاملة للمشاريع السكنية والتجارية والصناعية، مع الالتزام بأعلى معايير الجودة والسلامة المهنية.",
    features: [
      "بناء المباني السكنية والفلل",
      "تشييد الأبراج التجارية والمكتبية",
      "إنشاء المجمعات الصناعية والمستودعات",
      "أعمال الهياكل الخرسانية والحديدية",
      "التشطيبات الداخلية والخارجية",
    ],
    image: "🏗️",
  },
  {
    id: "development",
    icon: Home,
    title: "التطوير العقاري",
    description:
      "نطور مشاريع عقارية مبتكرة تجمع بين الجودة العالية والتصميم العصري، مع تحقيق أفضل العوائد الاستثمارية.",
    features: [
      "تطوير المجمعات السكنية",
      "إنشاء المراكز التجارية",
      "مشاريع متعددة الاستخدام",
      "دراسات الجدوى الاقتصادية",
      "إدارة الأصول العقارية",
    ],
    image: "🏢",
  },
  {
    id: "interior",
    icon: Palette,
    title: "التصميم الداخلي",
    description:
      "نبدع في تصميم المساحات الداخلية بأسلوب فريد يجمع بين الجمال والوظيفية، مع مراعاة ذوق العميل واحتياجاته.",
    features: [
      "تصميم الديكور السكني",
      "تصميم المكاتب والمساحات التجارية",
      "تصميم الفنادق والمطاعم",
      "اختيار الأثاث والإكسسوارات",
      "الإشراف على التنفيذ",
    ],
    image: "🎨",
  },
  {
    id: "management",
    icon: ClipboardList,
    title: "إدارة المشاريع",
    description:
      "نوفر إدارة احترافية شاملة للمشاريع من مرحلة التخطيط وحتى التسليم النهائي، مع ضمان الالتزام بالجودة والمواعيد.",
    features: [
      "التخطيط الاستراتيجي للمشاريع",
      "إعداد الجداول الزمنية والميزانيات",
      "المتابعة الميدانية المستمرة",
      "ضبط الجودة وإدارة المخاطر",
      "التقارير الدورية الشاملة",
    ],
    image: "📋",
  },
  {
    id: "consulting",
    icon: Lightbulb,
    title: "الاستشارات الهندسية",
    description:
      "نقدم استشارات هندسية متخصصة تساعدك في اتخاذ القرارات الصحيحة لمشروعك، مع حلول مبتكرة وعملية.",
    features: [
      "الدراسات الهندسية والفنية",
      "تحليل التربة والأساسات",
      "مراجعة المخططات والتصاميم",
      "تقييم المباني القائمة",
      "حلول الطاقة المستدامة",
    ],
    image: "💡",
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "الصيانة والترميم",
    description:
      "نقدم خدمات صيانة شاملة للمباني والمرافق، مع فريق متخصص متاح على مدار الساعة لتلبية احتياجاتكم.",
    features: [
      "الصيانة الدورية والوقائية",
      "ترميم وتجديد المباني",
      "صيانة الأنظمة الميكانيكية والكهربائية",
      "خدمات الطوارئ على مدار الساعة",
      "عقود الصيانة السنوية",
    ],
    image: "🔧",
  },
];

const Services = () => {
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
              خدماتنا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-primary-foreground mb-6">
              حلول شاملة لكل
              <span className="text-secondary"> احتياجاتك</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 font-cairo leading-relaxed">
              نقدم مجموعة متكاملة من الخدمات العقارية والإنشائية بأعلى معايير الجودة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h2 className="text-3xl font-tajawal font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground font-cairo text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 font-cairo text-foreground"
                      >
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="secondary"
                    className="font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link to="/contact">
                      اطلب هذه الخدمة
                      <ArrowLeft className="mr-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                {/* Image/Icon */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1" : ""
                  } flex items-center justify-center`}
                >
                  <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center text-9xl shadow-soft">
                    {service.image}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-primary-foreground mb-6">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="text-primary-foreground/80 font-cairo text-lg mb-8">
              تواصل معنا لمناقشة احتياجاتك الخاصة، فريقنا جاهز لتقديم حلول مخصصة لك
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

export default Services;
