import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "محمد العتيبي",
    role: "مستثمر عقاري",
    content:
      "تعاملت مع شركة الوعل في مشروع سكني كبير، وأذهلتني جودة العمل والالتزام بالمواعيد. فريق محترف بكل ما تعنيه الكلمة.",
    rating: 5,
  },
  {
    id: 2,
    name: "فاطمة الشهري",
    role: "صاحبة فيلا",
    content:
      "من التصميم وحتى التنفيذ، كانت تجربة مميزة. اهتموا بأدق التفاصيل وحققوا لي بيت أحلامي بالضبط كما تصورته.",
    rating: 5,
  },
  {
    id: 3,
    name: "عبدالله القحطاني",
    role: "رجل أعمال",
    content:
      "بنوا لي مقر شركتي الجديد بجودة استثنائية. التصميم عصري والتنفيذ ممتاز. أنصح بهم بشدة لأي مشروع تجاري.",
    rating: 5,
  },
  {
    id: 4,
    name: "نورة المطيري",
    role: "مصممة ديكور",
    content:
      "كوني مصممة، لدي معايير عالية جداً. الوعل تجاوزت توقعاتي في كل جانب من جوانب التنفيذ والتشطيب.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-muted geometric-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-cairo mb-4">
            آراء عملائنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-foreground mb-6">
            ماذا يقول
            <span className="text-secondary"> عملاؤنا</span>
          </h2>
          <p className="text-muted-foreground font-cairo text-lg">
            ثقة عملائنا هي أغلى إنجازاتنا، إليكم بعض آرائهم
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-medium relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Quote className="w-6 h-6 text-secondary" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl font-cairo text-foreground leading-relaxed mb-8">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-xl font-tajawal font-bold text-secondary">
                  {testimonials[currentIndex].name[0]}
                </span>
              </div>
              <div>
                <div className="font-tajawal font-bold text-foreground text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground font-cairo text-sm">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-border hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-border hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
