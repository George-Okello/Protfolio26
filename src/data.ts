import { Project, Experience, Education, Award, Publication } from "./types";

export const personalInfo = {
  name: "George Okello",
  fullName: "George Okello Ouma",
  title: "Computational Neuroscientist & AI Researcher",
  location: "Nairobi, Kenya 00100",
  phone: "+254706772057",
  email: "georgeokelloouma@gmail.com",
  website: "https://gokello.me/",
  linkedin: "linkedin.com/in/georgeokello",
  languages: [
    { name: "English", level: "Native" },
    { name: "Swahili", level: "Native" },
    { name: "Japanese", level: "Intermediate (B1)" },
    { name: "French", level: "Basic" }
  ],
  bio: "Committed to developing computational models that bridge artificial intelligence, network science, and cognitive neuroscience to understand complex brain functions, multi-agent social interactions, and enhance human-computer interaction.",
  researchInterests: [
    "Network Science",
    "Computational Neuroscience",
    "Cognitive Science & Behavioral AI",
    "Neural Signal Processing (EEG-based)",
    "Bilingual Language Dynamics",
    "Multi-Agent Reinforcement Learning",
    "Interpretable & Explainable AI",
    "Complex Adaptive Systems"
  ]
};

export const projects: Project[] = [
  {
    id: "eeg-load",
    title: "EEG-Based Cognitive Load Classification",
    category: "Neuroscience",
    summary: "Real-time cognitive state estimation using lightweight Transformer architectures.",
    description: "Developed lightweight Transformer architectures for real-time cognitive state estimation using the SEED-VIG dataset, outperforming classic CNN and LSTM baselines.",
    metrics: [
      { label: "Classification Accuracy", value: "79%" },
      { label: "Explainability Metric", value: "Grad-CAM/Attention" }
    ],
    details: [
      "Designed and trained lightweight Transformer models for sequence modeling of EEG channels.",
      "Achieved 79% accuracy, significantly outperforming benchmark CNN and LSTM architectures.",
      "Integrated Grad-CAM and self-attention visualizations to map feature importances directly to brain areas, boosting trust and interpretability in neuroadaptive applications."
    ],
    tech: ["PyTorch", "Transformers", "EEG", "Grad-CAM", "Attention Mechanisms", "Signal Processing"],
    visualType: "brain"
  },
  {
    id: "bilingual-dynamics",
    title: "Bilingual Language Switching Dynamics",
    category: "Neuroscience",
    summary: "Simulating Anterior Cingulate Cortex control costs during English-Spanish code-switching.",
    description: "Investigated neural mechanisms underlying code-switching using multilingual BERT representations on the UN Parallel Corpus to model cognitive control trajectories.",
    metrics: [
      { label: "Data Source", value: "UN Parallel Corpus" },
      { label: "Target Region", value: "Simulated ACC (sACC)" }
    ],
    details: [
      "Modeled bilingual lexical retrieval and code-switching costs using deep neural representations.",
      "Developed a novel simulated Anterior Cingulate Cortex (sACC) activation metric to quantify cognitive control demands during language switches.",
      "Revealed continuous activation trajectories and symmetric control costs across English-Spanish switching directions."
    ],
    tech: ["BERT", "NLP", "Cognitive Modeling", "Anatomy-Inspired Metrics", "Python", "PyTorch"],
    visualType: "language"
  },
  {
    id: "noisy-rl",
    title: "Reinforcement Learning Under Noisy Observations",
    category: "AI & ML",
    summary: "LSTM-DQN variants evaluated in memory-constrained visual N-back paradigm tasks.",
    description: "Evaluated robustness of deep Q-network (DQN) variants in a modified CartPole environment with noisy visual feedback to understand temporal credit assignment.",
    metrics: [
      { label: "Statistical Significance", value: "p = 0.0034" },
      { label: "Effect Size (Cohen's d)", value: "-0.422" }
    ],
    details: [
      "Tested standard, Noisy, and LSTM-based Deep Q-Networks under severe sensory perturbations.",
      "Demonstrated significant performance advantages for LSTM-DQN under memory constraints, indicating superior credit assignment over time.",
      "Contributed new insights to the problem of partial observability in neuro-inspired reinforcement learning."
    ],
    tech: ["Reinforcement Learning", "DQN", "LSTM-DQN", "Noisy Nets", "OpenAI Gym", "CartPole"],
    visualType: "agents"
  },
  {
    id: "cognitive-biases-rl",
    title: "When AI Thinks Like Humans: Cognitive Biases in RL",
    category: "Cognitive Science",
    summary: "Simulating human cognitive biases in reinforcement learning agents using a multi-armed bandit setup.",
    description: "Developed and evaluated RL agents exhibiting classic human cognitive biases (Loss Aversion, Anchoring, Confirmation, Optimism) within a multi-armed bandit problem to understand how irrational heuristics affect decision-making.",
    metrics: [
      { label: "Simulated Biases", value: "4 Distinct Types" },
      { label: "Environment", value: "Multi-Armed Bandit" }
    ],
    details: [
      "Loss Aversion: Improved learning by making agents quickly discard low-reward arms.",
      "Anchoring & Confirmation Bias: Often caused agents to get stuck on early impressions or cling to false beliefs.",
      "Optimism Bias: Enhanced early exploration and helped agents find the optimal arm faster.",
      "Demonstrated that cognitive biases can sometimes act as beneficial heuristics in uncertain, real-world scenarios."
    ],
    tech: ["Reinforcement Learning", "Multi-Armed Bandit", "Cognitive Biases", "Behavioral Economics", "Python"],
    visualType: "brain"
  },
  {
    id: "agri-chatbot",
    title: "Agricultural AI Chatbot & Advisor",
    category: "Social Impact",
    summary: "Climate-adaptive NLP system providing localized weather and agricultural guidance to Kenyan farmers.",
    description: "Designed and implemented an NLP-driven conversational agent to assist Kenyan smallholders, backed by a Mozilla Foundation Research Grant.",
    metrics: [
      { label: "Funding Body", value: "Mozilla Foundation" },
      { label: "Impact Target", value: "Kenyan Smallholders" }
    ],
    details: [
      "Created an NLP chatbot providing localized, real-time weather forecasts and evidence-based agricultural guidance.",
      "Integrated real-time meteorological data pipelines with sustainable farming rules to aid climate-adaptive decision making.",
      "Featured on the official Mozilla Foundation Blog as a scalable AI solution for food security in resource-constrained regions."
    ],
    tech: ["NLP", "Weather APIs", "Climate Models", "Decision Support Systems", "Python", "Local Databases"],
    visualType: "network"
  },
  {
    id: "interpretable-medical",
    title: "Interpretable Medical AI",
    category: "AI & ML",
    summary: "Explainable decision trees for reversible cardiac condition detection using LIME and SHAP.",
    description: "Developed clear decision-support models for cardiac diagnostic classification, achieving high performance while maintaining complete clinical transparency.",
    metrics: [
      { label: "Diagnostic Accuracy", value: "83%" },
      { label: "Explainability Tools", value: "LIME / SHAP" }
    ],
    details: [
      "Built and optimized decision tree models specifically designed to represent transparent clinical reasoning paths.",
      "Applied local interpretable model-agnostic explanations (LIME) and SHAP values to explain predictions on a patient-by-patient basis.",
      "Balanced the trade-off between predictive accuracy and clinician trust in critical healthcare systems."
    ],
    tech: ["Decision Trees", "LIME", "SHAP", "Explainable AI (XAI)", "Cardiac Diagnostics", "Scikit-Learn"],
    visualType: "chart"
  },
  {
    id: "complex-network-dynamics",
    title: "Network Dynamics in Multi-Agent Systems",
    category: "Network Science",
    summary: "Graph neural networks for analyzing the structural properties and information flow in multi-agent environments.",
    description: "Investigated how network topology influences collective behavior and decision-making in artificial multi-agent systems, using Graph Neural Networks (GNNs) to model communication bottlenecks.",
    metrics: [
      { label: "Topology Analyzed", value: "Small-World & Scale-Free" },
      { label: "Information Transfer", value: "+34% Efficiency" }
    ],
    details: [
      "Applied graph theory and network science methodologies to map information flow in decentralized AI systems.",
      "Identified critical hub agents and structural bottlenecks that dictate system-wide convergence in complex adaptive networks.",
      "Developed an interpretable GNN framework to predict macroscopic behaviors from microscopic network interactions."
    ],
    tech: ["Graph Neural Networks", "NetworkX", "PyTorch Geometric", "Complex Systems", "Multi-Agent Systems"],
    visualType: "network"
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-cultivate-vol",
    role: "Volunteer",
    company: "Cultivate Food Rescue",
    location: "South Bend, Indiana",
    period: "Jul 2024",
    bullets: [
      "Packed and prepared meals for over 3,500 children for distribution."
    ],
    type: "Service"
  },
  {
    id: "exp-apu-ra",
    role: "Research Assistant",
    company: "Asia Pacific University (APU)",
    location: "Kuala Lumpur, Malaysia",
    period: "Jul 2025 - Dec 2025",
    bullets: [
      "Collaborated with faculty on advanced machine learning research projects within the MSc AI program.",
      "Contributed to scientific manuscripts, preparing drafts for journals and conference submissions.",
      "Designed and executed computational experiments, keeping detailed logs of models, losses, and hyperparameters.",
      "Authored critical technical and mathematical sections for peer-reviewed publications."
    ],
    type: "Research"
  },
  {
    id: "exp-nd-vr",
    role: "Visiting Researcher",
    company: "University of Notre Dame",
    location: "Indiana, USA",
    period: "May 2024 - Aug 2024",
    bullets: [
      "Developed an epidemiological forecasting model for mosquito outbreak predictions using weather time-series data and machine learning.",
      "Created interactive geo-visualizations using Folium maps to represent epidemiological risks for decision-makers.",
      "Contributed to computer vision research for 3D game developments, evaluating real-world imagery recognition algorithms.",
      "Collaborated daily with interdisciplinary, international teams of biologists, public health officials, and computer scientists."
    ],
    type: "Research"
  },
  {
    id: "exp-strath-ds",
    role: "Data Science Fellow",
    company: "Strathmore University",
    location: "Nairobi, Kenya",
    period: "Sep 2022 - Feb 2023",
    bullets: [
      "Conducted statistical analyses and developed complex visualizations to interpret institutional research outcomes.",
      "Applied sophisticated loss functions and detailed variance analysis to refine model evaluations and diagnostic performance.",
      "Authored comprehensive technical reports detailing the mathematical formulations of predictive models.",
      "Presented research methodologies and findings to academic boards and at regional conferences."
    ],
    type: "Research"
  },
  {
    id: "exp-strath-inst",
    role: "Instructor",
    company: "Strathmore University",
    location: "Nairobi, Kenya",
    period: "Feb 2023 - Feb 2025",
    bullets: [
      "Delivered technical lectures and hands-on laboratory workshops for the Data Science Certificate program.",
      "Taught foundational programming concepts in Python, emphasizing robust data manipulation using Pandas and NumPy.",
      "Developed high-quality curriculum, coding assignments, and grading rubrics for machine learning courses.",
      "Mentored dozens of students on their capstone projects, research methodologies, and career directions."
    ],
    type: "Teaching"
  },
  {
    id: "exp-strath-bi",
    role: "Business Intelligence Analyst (ML/AI Engineer)",
    company: "Strathmore University",
    location: "Nairobi, Kenya",
    period: "Feb 2023 - Feb 2025",
    bullets: [
      "Built and deployed scalable data pipelines extracting, transforming, and loading diverse corporate data streams.",
      "Implemented highly interactive dashboards for consulting clients, delivering data-driven insights that guided C-suite strategy.",
      "Developed proof-of-concept prototypes, including audio spectrogram analysis tools and LLM integrations with relational databases.",
      "Applied advanced statistical methods and predictive models to improve institutional decision-making systems."
    ],
    type: "Professional"
  },
  {
    id: "exp-re-pca",
    role: "People and Culture Analyst",
    company: "The ResourceEdge",
    location: "Nairobi, Kenya",
    period: "Jan 2023 - Present",
    bullets: [
      "Assisted in Strategic Human Resource Management (SHRM) initiatives, applying people analytics models to team dynamics.",
      "Conducted systematic, data-driven evaluations of job candidates utilizing resume screening algorithms and psychometric metrics.",
      "Applied predictive analytics to candidate profiling and hiring success factors, optimizing recruiting operations.",
      "Supported organizational culture assessments and complex workforce planning initiatives through statistical modeling."
    ],
    type: "Professional"
  },
  {
    id: "exp-psc-support",
    role: "System Support Intern",
    company: "Parliamentary Service Commission",
    location: "Nairobi, Kenya",
    period: "Mar 2021 - Jul 2021",
    bullets: [
      "Oversaw technical operations for live broadcasts of parliamentary sessions on YouTube, ensuring stable streams and perfect audio quality.",
      "Managed real-time hardware and software support during active sittings, addressing issues with microphones, presentation systems, and tablets.",
      "Ensured all critical legislative chamber technologies were fully updated, audited, and running optimally prior to each session.",
      "Contributed to national IT infrastructure diagnostics and security enhancement audits.",
      "Gained deep knowledge in large-scale system administration, networking, and critical cybersecurity protocols."
    ],
    type: "Service"
  },
  {
    id: "exp-knls-vol",
    role: "Library Assistant (Volunteer)",
    company: "Kenya National Library Service (KNLS)",
    location: "Nairobi, Kenya",
    period: "Jan 2020 - Mar 2020",
    bullets: [
      "Organized large library collections and updated digital catalog systems as part of an undergraduate community-service program.",
      "Coordinated mobile library deliveries to underprivileged schools, bringing critical educational materials to resource-scarce communities.",
      "Conducted active orientation sessions and literacy workshops for visiting student groups, promoting reading culture.",
      "Fostered community outreach initiatives supporting literacy, access, and educational equity."
    ],
    type: "Service"
  }
];

export const educations: Education[] = [
  {
    id: "edu-strath-bbit",
    degree: "Bachelor of Business Information Technology",
    school: "Strathmore University",
    location: "Nairobi, Kenya",
    period: "",
    bullets: [
      "Double focus on Computer Science and Business Administration.",
      
    ],
    thesis: {
      title: "Developing an intrusion detection system using Neural Networks for automated network threat detection",
      description: "Designed a multi-layer perceptron neural network trained on network flow packets to identify real-time intrusion signatures with high accuracy."
    }
  },
  {
    id: "edu-apu-msc",
    degree: "Master of Science in Artificial Intelligence",
    school: "Asia Pacific University (APU)",
    location: "Kuala Lumpur, Malaysia",
    period: "",
    bullets: [
      "Deep specialization in Advanced Machine Learning, Neuro-Symbolic AI, and Reinforcement Learning.",
      "Collaborated with leading research professors on EEG and cognitive modeling.",
      "Authored and compilled  multiple research manuscripts for publication."
    ],
    thesis: {
      title: "Exploring computational approaches to understanding collaborative behaviors between intelligent agents",
      description: "Developing models that investigate how social hierarchies, trust, and communication emerge in multi-agent reinforcement learning (MARL) structures."
    }
  },
  {
    id: "edu-phd",
    degree: "Ph.D. in Network Science",
    school: "Central European University (CEU)",
    location: "Vienna, Austria",
    period: "",
    bullets: [
      "Focusing on the intersection of network science, artificial intelligence, and complex systems.",
      "Investigating the structural properties and dynamics of complex networks in multi-agent systems and cognitive architectures."
    ]
  }
];

export const awards: Award[] = [
  {
    id: "award-innovate-africa",
    title: "Innovate Africa Challenge Winner",
    issuer: "Smart Africa Initiative for AI Innovation",
    period: "2024 - 2025",
    description: "Recognized for innovative AI solutions addressing critical socio-economic challenges across the African continent. Awarded for developing scalable, localized, climate-adaptive intelligence platforms.",
    link: "smartafrica.org/innovate-africa-challenge"
  },
  {
    id: "award-mozilla-grant",
    title: "Mozilla Foundation Research Grant",
    issuer: "Mozilla Foundation",
    period: "2023",
    description: "Awarded a competitive research grant under 'AI for Social Impact' for developing accessible, localized agricultural decision support systems for Kenyan smallholders. Project was featured on the official Mozilla Foundation Blog."
  }
];

export const publications: Publication[] = [
  {
    id: "pub-indaba-2026",
    title: "DC-AFL: Drift-Corrected Asynchronous Federated Learning for Infrastructure-Constrained Healthcare Networks",
    authors: "Betsy Muriithi-Ochieng', Alvin Igobwa, George Okello",
    status: "Under Review",
    type: "Conference",
    summary: "A framework combining a Version Memory Buffer, Hessian-approximated drift correction, and two-parameter polynomial damping to address the infrastructure exclusion problem in federated learning across sub-Saharan Africa. Submitted to Deep Learning Indaba 2026.",
    link: ""
  },
  {
    id: "pub-multimodal-pipeline",
    title: "Multi-Modal Data Pipeline Integration on Cross-Platform Applications: A Comprehensive Literature Review",
    authors: "Dr. Hema Latha Krishna (APU), George Okello Ouma (The ResourceEdge)",
    status: "In Preparation",
    summary: "A systematic review exploring the standard engineering patterns, latency-minimization protocols, and cross-platform architectures used to integrate multi-modal sensor and data streams.",
    link: ""
  },
  {
    id: "pub-neurosymbolic-ai",
    title: "Neuro-Symbolic AI for Verifiable and Ethical Reasoning in Critical Societal Applications: A Systematic Literature Review",
    authors: "George Okello Ouma (The ResourceEdge)",
    status: "In Preparation",
    summary: "An exploration into the fusion of neural-network learning architectures and symbolic logic frameworks, addressing verifiable correctness and compliance with ethical guidelines in high-stakes public systems.",
    link: ""
  },
  {
    id: "pub-social-hierarchies",
    title: "Computational Modelling of Social Hierarchies & Trust Dynamics Using Multiagent Reinforcement Learning",
    authors: "George Okello Ouma (The ResourceEdge)",
    status: "In Preparation",
    summary: "Investigating the emergence of social hierarchies, cooperative strategies, and trust structures among autonomous learning agents in partially observable, competitive-cooperative tasks.",
    link: ""
  }
];

export const certifications = [
  {
    id: "cert-ds",
    title: "Certificate in Data Science",
    description: "Advanced statistical methods and machine learning."
  },
  {
    id: "cert-cs",
    title: "Certificate in Cyber Security Analysis",
    description: "Focused on pentesting, offensive tactics, and defensive methods."
  },
  {
    id: "cert-repair",
    title: "Certificate in Computer and Mobile Repair",
    description: "Hardware-software integration and physical component architecture."
  }
];

