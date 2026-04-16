import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Linkedin, Mail, Phone, Loader2, AlertCircle } from "lucide-react";
import { usePublicTeam } from "@/hooks/website/usePublicTeam";

const Team = () => {
  const { teamMembers, loading, error } = usePublicTeam();

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
              فريقنا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-primary-foreground mb-6">
              العقول المبدعة
              <span className="text-secondary"> وراء نجاحنا</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 font-cairo leading-relaxed">
              فريق من الخبراء والمتخصصين يعملون بشغف لتحقيق رؤيتك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-secondary" />
              <p className="font-cairo">جاري تحميل الفريق...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-destructive">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p className="font-cairo text-lg font-semibold">عذراً، حدث خطأ أثناء تحميل بيانات الفريق</p>
              <p className="font-cairo text-sm opacity-80 mt-2">{error.message || "يرجى المحاولة مرة أخرى"}</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-cairo">
              لا توجد بيانات للفريق حالياً.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft card-hover h-full flex flex-col">
                    {/* Avatar */}
                    <div className="aspect-square bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                      {member.avatar_url ? (
                        <img
                          src={member.avatar_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="400"
                        />
                      ) : (
                        <span>👨‍💼</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-tajawal font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-cairo font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground font-cairo text-sm leading-relaxed mb-4 flex-1">
                        {member.bio || "عضو متميز في فريقنا."}
                      </p>

                      {/* Social Links */}
                      <div className="flex gap-2 mt-auto">
                        {member.linkedin_url ? (
                          <a
                            href={member.linkedin_url}
                            target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                            aria-label="تابعنا على لينكد إن"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        ) : null}

                        {/* Always show generic mail contact for now as it's not in DB explicitly per member usually, or add if present */}
                        <a
                          href={`mailto:contact@alwael.com`}
                          className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                          aria-label="تواصل عبر البريد الإلكتروني"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-muted geometric-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-foreground mb-6">
              انضم إلى فريقنا
            </h2>
            <p className="text-muted-foreground font-cairo text-lg mb-8">
              نبحث دائماً عن المواهب المتميزة للانضمام إلى عائلة الوعل.
              إذا كنت تبحث عن بيئة عمل محفزة وفرص للنمو، نرحب بك.
            </p>
            <a
              href="mailto:careers@alwael.com"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
            >
              <Mail className="w-5 h-5" />
              أرسل سيرتك الذاتية
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
