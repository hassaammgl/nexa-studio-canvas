import { motion } from 'framer-motion';
import { Award, Users, Target, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Result-Driven',
    description: 'Every decision we make is guided by measurable outcomes and real business impact.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We genuinely love what we do, and it shows in every pixel and line of code.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as an extension of your team, not just another vendor.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We refuse to compromise on quality, pushing boundaries on every project.',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: '15+ years crafting digital experiences for Fortune 500 companies.',
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Award-winning designer with a passion for user-centered solutions.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Full-stack expert specializing in React, Next.js, and 3D web experiences.',
  },
  {
    name: 'Emily Watson',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Orchestrates seamless project delivery with military precision.',
  },
];

const About = () => {
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
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6"
            >
              We're a Team of{' '}
              <span className="gradient-text">Digital Craftspeople</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Founded in 2014, NEXA Studio has grown from a two-person startup 
              to an award-winning digital agency with a global client base. We combine 
              strategic thinking with creative excellence to deliver results that matter.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                From Garage to Global
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a passion project between two college friends has evolved 
                  into one of the most sought-after digital agencies in the industry. Our 
                  journey began with a simple belief: great digital experiences should be 
                  accessible to ambitious companies of all sizes.
                </p>
                <p>
                  Today, we've helped over 150 clients across 20+ industries transform their 
                  digital presence. From startups to Fortune 500 companies, our work has 
                  generated over $2M in revenue for our clients.
                </p>
                <p>
                  But numbers only tell part of the story. What drives us is the thrill of 
                  solving complex problems, the satisfaction of exceeding expectations, and 
                  the relationships we build along the way.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
                  alt="NEXA Studio team working"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-1">10+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Values
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mt-4"
            >
              What We Stand For
            </motion.h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mt-4"
            >
              Meet the <span className="gradient-text">Creators</span>
            </motion.h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
