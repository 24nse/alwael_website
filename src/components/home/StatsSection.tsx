import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building, Users, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Building,
    value: 150,
    suffix: "+",
    label: "مشروع مكتمل",
    description: "مشاريع سكنية وتجارية في جميع أنحاء اليمن",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "عميل سعيد",
    description: "ثقة عملائنا هي أغلى ما نملك",
  },
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "سنة خبرة",
    description: "ربع قرن من التميز والريادة",
  },
  {
    icon: Clock,
    value: 98,
    suffix: "%",
    label: "نسبة الالتزام",
    description: "التزام بالمواعيد والجودة",
  },
];

const CountUp = ({ end, suffix, isInView }: { end: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-secondary" />
              </div>

              {/* Value */}
              <div className="text-4xl md:text-5xl font-tajawal font-bold text-primary-foreground mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>

              {/* Label */}
              <div className="text-secondary font-tajawal font-semibold text-lg mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-primary-foreground/60 font-cairo text-sm hidden md:block">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
