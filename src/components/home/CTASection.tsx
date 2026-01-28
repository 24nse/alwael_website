import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12 lg:p-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-secondary/20 rotate-45 hidden lg:block" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-primary-foreground mb-6">
                هل لديك مشروع في ذهنك؟
                <br />
                <span className="text-secondary">دعنا نحققه معاً</span>
              </h2>
              <p className="text-primary-foreground/80 font-cairo text-lg leading-relaxed mb-8">
                نحن جاهزون لمساعدتك في تحقيق رؤيتك. تواصل معنا اليوم للحصول على
                استشارة مجانية ودراسة أولية لمشروعك.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-cairo font-semibold text-base shadow-gold hover:scale-105 transition-transform"
                  asChild
                >
                  <Link to="/contact">
                    احصل على استشارة مجانية
                    <ArrowLeft className="mr-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-cairo font-semibold text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href="tel:+96750000000">
                    <Phone className="ml-2 w-5 h-5" />
                    اتصل بنا الآن
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground/70 font-cairo text-sm mb-1">
                    اتصل بنا
                  </div>
                  <a
                    href="tel:+96750000000"
                    className="text-primary-foreground font-tajawal font-bold text-xl hover:text-secondary transition-colors"
                    dir="ltr"
                  >
                    +967 5 000 0000
                  </a>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground/70 font-cairo text-sm mb-1">
                    راسلنا على
                  </div>
                  <a
                    href="mailto:info@alwael.com"
                    className="text-primary-foreground font-tajawal font-bold text-xl hover:text-secondary transition-colors"
                  >
                    info@alwael.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
