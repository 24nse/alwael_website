import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "خدماتنا", path: "/services" },
    { name: "مشاريعنا", path: "/projects" },
  ];

  const services = [
    "البناء والتشييد",
    "التطوير العقاري",
    "التصميم الداخلي",
    "إدارة المشاريع",
    "الاستشارات الهندسية",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Building2 className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-tajawal font-bold text-primary-foreground">
                  الوعل
                </span>
                <span className="text-xs text-primary-foreground/70">
                  للعقارات والمقاولات
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 font-cairo leading-relaxed">
              نبني أحلامك بأيدٍ خبيرة. شركة رائدة في مجال العقارات والمقاولات،
              نقدم خدمات متكاملة بأعلى معايير الجودة والاحترافية.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-tajawal font-bold mb-6 text-secondary">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-cairo text-primary-foreground/80 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-tajawal font-bold mb-6 text-secondary">
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="font-cairo text-primary-foreground/80 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-tajawal font-bold mb-6 text-secondary">
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-cairo text-primary-foreground/80">
                  ابن سيناء - المكلا، اليمن
                  <br />
                 الشارع العام - بجانب بنك الكريمي
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <a
                  href="tel:+96750000000"
                  className="font-cairo text-primary-foreground/80 hover:text-secondary transition-colors"
                  dir="ltr"
                >
                  +967 5 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <a
                  href="mailto:info@alwael.com"
                  className="font-cairo text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  info@alwael.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-cairo text-sm text-primary-foreground/70">
              © {currentYear} شركة الوعل للعقارات والمقاولات. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="font-cairo text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link
                to="/terms"
                className="font-cairo text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
