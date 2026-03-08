import { motion } from "framer-motion";
import { getProjects } from "@/lib/projects";

const PortfolioGallery = () => {
  const projects = getProjects();

  // Masonry-like heights
  const heights = ["h-64", "h-80", "h-72", "h-96", "h-64", "h-80"];

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Portfolio</h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid group"
            >
              <div className={`relative ${heights[i % heights.length]} rounded-xl overflow-hidden glass cursor-pointer`}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-xs tracking-[0.2em] uppercase text-accent mb-3">{project.category}</span>
                  <h3 className="text-xl font-display font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
