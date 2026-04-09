import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ConsultationForm } from "@/components/website/ConsultationForm";

const contactInfo = [
  {
    icon: Phone,
    title: "اتصل بنا",
    value: "+967 773 795 665",
    href: "tel:+967773795665",
  },
  {
    icon: Mail,
    title: "راسلنا",
    value: "info@alwael.com",
    href: "mailto:info@alwael.com",
  },
  {
    icon: MapPin,
    title: "زرنا",
    value: "ابن سيناء - المكلا، برج الوعل",
    href: "#",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    value: "الأحد - الخميس: 8 ص - 5 م",
    href: "#",
  },
];

const Contact = () => {
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
              تواصل معنا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-primary-foreground mb-6">
              نحن هنا
              <span className="text-secondary"> لمساعدتك</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 font-cairo leading-relaxed">
              تواصل معنا للحصول على استشارة مجانية ودراسة أولية لمشروعك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-tajawal font-bold text-foreground mb-4">
                  معلومات التواصل
                </h2>
                <p className="text-muted-foreground font-cairo">
                  نسعد بتواصلكم معنا عبر أي من الوسائل التالية
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted hover:bg-secondary/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      <info.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-tajawal font-semibold text-foreground">
                        {info.title}
                      </div>
                      <div className="text-muted-foreground font-cairo text-sm">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-secondary mx-auto mb-2" />
                  <p className="text-muted-foreground font-cairo">
                    ابن سيناء - المكلا، اليمن
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl shadow-soft p-8">
                <h2 className="text-2xl font-tajawal font-bold text-foreground mb-6">
                  أرسل لنا رسالة
                </h2>

                {/* Using Dynamic Form Component */}
                <ConsultationForm />

              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
