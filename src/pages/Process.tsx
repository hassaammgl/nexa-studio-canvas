import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Palette, Code, Rocket, BarChart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'We start by understanding your business, goals, audience, and competitive landscape through comprehensive research and stakeholder interviews.',
    deliverables: ['Stakeholder Interviews', 'Competitive Analysis', 'User Research', 'Technical Audit'],
    duration: '1-2 weeks',
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Armed with insights, we craft a comprehensive digital strategy that aligns with your business objectives and sets clear KPIs.',
    deliverables: ['Strategy Document', 'Information Architecture', 'Content Strategy', 'Technical Specifications'],
    duration: '1-2 weeks',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Our designers create stunning, user-centered designs that bring your brand to life and optimize for conversion.',
    deliverables: ['Wireframes', 'Visual Design', 'Design System', 'Interactive Prototypes'],
    duration: '2-4 weeks',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Our developers build your solution using cutting-edge technologies, ensuring performance, scalability, and maintainability.',
    deliverables: ['Frontend Development', 'Backend Development', 'API Integration', 'Quality Assurance'],
    duration: '4-8 weeks',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'We deploy with precision, ensuring a smooth launch with comprehensive testing, monitoring, and support.',
    deliverables: ['Deployment', 'Performance Testing', 'Security Audit', 'Team Training'],
    duration: '1 week',
  },
  {
    icon: BarChart,
    title: 'Growth',
    description: 'Post-launch, we continue to optimize and scale your digital presence based on real user data and business metrics.',
    deliverables: ['Analytics Setup', 'A/B Testing', 'Conversion Optimization', 'Ongoing Support'],
    duration: 'Ongoing',
  },
];

const Process = () => {
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
              Our Process
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6"
            >
              How We <span className="gradient-text">Make It Happen</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Our proven 6-step process ensures every project is delivered on time, 
              on budget, and exceeds expectations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <span className="text-primary text-sm font-semibold">
                        Step {index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="px-3 py-1 rounded-full bg-secondary">
                      Duration: {step.duration}
                    </span>
                  </div>
                </div>
                
                <div className={`card-glass p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-3">
                    {step.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Let's discuss your project and see how our process can deliver results for your business.
          </motion.p>
          <Link to="/contact">
            <motion.button
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Process;
