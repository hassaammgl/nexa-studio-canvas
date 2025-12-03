import { motion } from 'framer-motion';

const clients = [
  'Google', 'Meta', 'Apple', 'Amazon', 'Netflix', 'Spotify',
  'Stripe', 'Shopify', 'Figma', 'Notion', 'Slack', 'Vercel'
];

export const ClientMarquee = () => {
  return (
    <section className="py-16 border-y border-border/50 overflow-hidden bg-card/30">
      <div className="container-wide mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-wider"
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>
      
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Marquee */}
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
