import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2025',
    excerpt: 'Explore the cutting-edge design trends that will shape the digital landscape this year, from AI-powered personalization to immersive 3D experiences.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
    category: 'Design',
    date: 'Dec 1, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Why Your Business Needs a 3D Website Experience',
    excerpt: 'Discover how immersive 3D elements can transform user engagement and conversions for your digital presence.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    category: 'Technology',
    date: 'Nov 28, 2024',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Maximizing E-Commerce Conversions with UX Design',
    excerpt: 'Learn proven strategies to optimize your online store for maximum sales and customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    category: 'E-Commerce',
    date: 'Nov 25, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Building Accessible Websites: A Complete Guide',
    excerpt: 'Why accessibility matters and how to ensure your website is usable by everyone.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
    category: 'Development',
    date: 'Nov 20, 2024',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'The Psychology of Color in Web Design',
    excerpt: 'How color choices impact user behavior and brand perception online.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=500&fit=crop',
    category: 'Design',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Performance Optimization: Making Websites Blazing Fast',
    excerpt: 'Technical strategies to improve your website speed and user experience.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    category: 'Development',
    date: 'Nov 10, 2024',
    readTime: '10 min read',
    featured: false,
  },
];

const featuredPost = blogPosts.find(post => post.featured);
const regularPosts = blogPosts.filter(post => !post.featured);

const Blog = () => {
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
              Our Blog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6"
            >
              Insights & <span className="gradient-text">Ideas</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Thoughts on design, development, and building products that matter.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-12">
          <div className="container-wide">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to={`/blog/${featuredPost.id}`} className="block group">
                <div className="grid lg:grid-cols-2 gap-8 items-center card-glass p-4 md:p-8">
                  <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="glass px-3 py-1 rounded-full text-xs font-medium text-foreground">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="card-glass p-12 text-center max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-6"
            >
              Get the latest insights delivered to your inbox. No spam, just value.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <motion.button
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
