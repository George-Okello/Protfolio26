import { Zap } from "lucide-react";
import { motion } from "motion/react";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "ML & Deep Learning Frameworks",
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Hugging Face Transformers"]
  },
  {
    title: "Deep Learning Architectures",
    skills: ["CNNs", "RNNs", "LSTMs", "Transformers", "GANs", "Attention Mechanisms"]
  },
  {
    title: "Specializations",
    skills: ["Computer Vision", "Natural Language Processing", "Reinforcement Learning"]
  },
  {
    title: "MLOps & DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "MLflow", "Weights & Biases", "DVC", "Jenkins", "Model Versioning", "A/B Testing"]
  },
  {
    title: "Deployment & Cloud",
    skills: ["AWS (EC2, S3, ELB)", "Google Cloud Platform", "REST APIs", "Model Serving", "Autoscaling", "Model Quantization", "Pruning", "Transfer Learning"]
  },
  {
    title: "Data Engineering & Monitoring",
    skills: ["Apache Airflow", "ETL Pipelines", "Feature Stores", "Data Warehousing", "Prometheus", "Grafana", "ELK Stack", "Model Drift Detection"]
  },
  {
    title: "Languages",
    skills: ["Python", "R", "C++", "CUDA", "JavaScript", "SQL", "Bash", "YAML", "JSON"]
  },
  {
    title: "Development Tools & Frameworks",
    skills: ["FastAPI", "Flask", "React Native", "Flutter", "Git", "Jupyter", "Automated Testing"]
  }
];

export function TechnicalSkills({ isDark }: { isDark: boolean }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.section 
      className={`py-24 border-t ${isDark ? "border-white/10" : "border-black/10"} relative`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="px-6 md:px-12 w-full space-y-12">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-widest opacity-40 italic mb-2">Technical Proficiency</span>
          <h2 className="text-4xl font-serif tracking-tight">
            AI Engineering & MLOps
          </h2>
          <p className="opacity-80 font-light max-w-2xl mt-4">
            Comprehensive skill set spanning academic research modeling to scalable industry deployment and infrastructure.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`p-6 border group hover:-translate-y-1 transition-all duration-300 ${
                isDark 
                  ? "border-white/10 bg-[#1A1A1A] hover:border-white/30 hover:bg-[#222]" 
                  : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
              }`}
            >
              <h3 className="text-sm font-sans font-medium tracking-tight mb-4 flex items-center gap-2">
                <Zap className={`w-3 h-3 transition-colors duration-300 ${isDark ? "opacity-50 group-hover:text-orange-400 group-hover:opacity-100" : "opacity-40 group-hover:text-orange-600 group-hover:opacity-100"}`} />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-widest border transition-colors duration-300 ${
                      isDark ? "border-white/20 text-white/70 group-hover:border-white/50 group-hover:text-white" : "border-black/20 text-black/70 group-hover:border-black/40 group-hover:text-black"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
