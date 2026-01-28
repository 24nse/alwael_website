import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم طويل جداً"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح").max(255, "البريد الإلكتروني طويل جداً"),
  phone: z.string().trim().min(9, "رقم الهاتف غير صحيح").max(20, "رقم الهاتف طويل جداً"),
  service: z.string().min(1, "الرجاء اختيار الخدمة"),
  message: z.string().trim().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل").max(1000, "الرسالة طويلة جداً"),
});

const contactInfo = [
  {
    icon: Phone,
    title: "اتصل بنا",
    value: "+967 5 000 0000",
    href: "tel:+96750000000",
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

const services = [
  { value: "construction", label: "البناء والتشييد" },
  { value: "development", label: "التطوير العقاري" },
  { value: "interior", label: "التصميم الداخلي" },
  { value: "management", label: "إدارة المشاريع" },
  { value: "consulting", label: "الاستشارات الهندسية" },
  { value: "other", label: "أخرى" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

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

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-tajawal font-bold text-foreground mb-2">
                      تم الإرسال بنجاح!
                    </h3>
                    <p className="text-muted-foreground font-cairo">
                      شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-cairo">
                          الاسم الكامل *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك الكامل"
                          className={`font-cairo ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm font-cairo">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-cairo">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className={`font-cairo ${errors.email ? "border-destructive" : ""}`}
                          dir="ltr"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm font-cairo">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-cairo">
                          رقم الهاتف *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+967 7X XXX XXXX"
                          className={`font-cairo ${errors.phone ? "border-destructive" : ""}`}
                          dir="ltr"
                        />
                        {errors.phone && (
                          <p className="text-destructive text-sm font-cairo">{errors.phone}</p>
                        )}
                      </div>

                      {/* Service */}
                      <div className="space-y-2">
                        <Label className="font-cairo">الخدمة المطلوبة *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={handleServiceChange}
                        >
                          <SelectTrigger className={`font-cairo ${errors.service ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="اختر الخدمة" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                                className="font-cairo"
                              >
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-destructive text-sm font-cairo">{errors.service}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-cairo">
                        رسالتك *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك هنا... أخبرنا عن مشروعك واحتياجاتك"
                        rows={5}
                        className={`font-cairo resize-none ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm font-cairo">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="secondary"
                      className="w-full font-cairo font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                          جاري الإرسال...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          إرسال الرسالة
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
