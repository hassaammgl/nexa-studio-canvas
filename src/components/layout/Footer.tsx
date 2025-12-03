import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Web Development', path: '/services#web' },
    { name: 'UI/UX Design', path: '/services#design' },
    { name: 'E-Commerce', path: '/services#ecommerce' },
    { name: '3D & Animation', path: '/services#3d' },
  ],
  resources: [
    { name: 'Case Studies', path: '/work' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Process', path: '/process' },
    { name: 'FAQ', path: '/faq' },
  ],
};

const socialLinks = [
  { name: 'Twitter', url: '#', icon: '𝕏' },
  { name: 'LinkedIn', url: '#', icon: 'in' },
  { name: 'Dribbble', url: '#', icon: '◉' },
  { name: 'GitHub', url: '#', icon: '⌘' },
];

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">N</span>
                </div>
                <span className="text-xl font-bold text-foreground">NEXA</span>
                <span className="text-xl font-light text-muted-foreground">Studio</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We build high-performance, animated, conversion-driven digital experiences 
              for ambitious companies ready to dominate their markets.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@nexastudio.dev</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors link-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors link-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors link-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-border">
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-muted-foreground">
                Get the latest insights on web design, development, and digital trends.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <motion.button
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 NEXA Studio. All rights reserved. Made with{' '}
              <span className="text-primary">♥</span> by NEXA
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
