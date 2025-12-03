import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Palette, ShoppingCart, Box, Smartphone, 
  Lightbulb, ArrowRight, Check 
} from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with Next.js, React, and TypeScript that scale with your business.',
    features: [
      'Custom Web Applications',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Performance Optimization',
      'CMS Implementation',
    ],
    price: 'From $15,000',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that creates memorable experiences and drives conversions.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'Usability Testing',
      'Design Handoff',
    ],
    price: 'From $8,000',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'High-converting online stores with Shopify, custom solutions, and headless architecture.',
    features: [
      'Shopify Development',
      'Custom E-Commerce Platforms',
      'Payment Integration',
      'Inventory Management',
      'Conversion Optimization',
    ],
    price: 'From $12,000',
  },
  {
    icon: Box,
    title: '3D & Motion Design',
    description: 'Immersive 3D experiences and stunning animations that captivate your audience.',
    features: [
      'Interactive 3D Websites',
      'WebGL Development',
      'Motion Graphics',
      'Product Visualization',
      'AR/VR Experiences',
    ],
    price: 'From $20,000',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that users love.',
    features: [
      'iOS Development',
      'Android Development',
      'React Native Apps',
      'App Store Optimization',
      'Push Notifications',
    ],
    price: 'From $25,000',
  },
  {
    icon: Lightbulb,
    title: 'Digital Strategy',
    description: 'Strategic guidance for digital transformation and growth.',
    features: [
      'Digital Audits',
      'Growth Strategy',
      'Technology Consulting',
      'Team Training',
      'Ongoing Support',
    ],
    price: 'From $5,000',
  },
];

const Services = () => {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6"
            >
              Services That <span className="gradient-text">Drive Growth</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              From strategy to execution, we provide end-to-end digital solutions 
              that help businesses stand out and succeed in the digital landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="card-glass p-12 text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Need a Custom Solution?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              We understand that every business is unique. Let's discuss your specific 
              needs and create a tailored solution that fits your goals and budget.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/contact">
                <motion.button
                  className="btn-primary inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
