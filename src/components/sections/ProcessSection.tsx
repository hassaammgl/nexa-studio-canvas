import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Palette, Code, Rocket, BarChart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Deep dive into your business, audience, and goals.',
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Craft a comprehensive digital strategy.',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Create stunning, user-centered designs.',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Build with cutting-edge technologies.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy with precision and care.',
  },
  {
    icon: BarChart,
    title: 'Growth',
    description: 'Optimize and scale for success.',
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-foreground mt-4"
            >
              How We <span className="gradient-text">Make It Happen</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/process" className="btn-secondary inline-flex items-center gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Step Number */}
                <div className="absolute top-0 right-0 lg:right-auto lg:-left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
