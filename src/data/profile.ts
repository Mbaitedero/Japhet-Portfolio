export type ProjectCategory = 'Data Engineering' | 'Machine Learning' | 'BI'

export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  results: string[]
  technologies: string[]
  details: string
  architecture: string[]
  github?: string
  featured?: boolean
}

export const profile = {
  name: "Japhet ALLAH-N'DIGUIM",
  initials: 'JA',
  role: 'Élève Ingénieur Data',
  positioning: 'Data Engineering · Machine Learning / MLOps · Business Intelligence',
  location: 'Fès, Maroc',
  email: 'allahndiguimj@gmail.com',
  phone: '+212 777 757 825',
  linkedin: 'https://linkedin.com/in/japhet-allah-n-diguim-764878320',
  github: 'https://github.com/Mbaitedero',
  whatsapp: 'https://wa.me/212777757825',
  tagline: 'Je conçois des pipelines de données fiables et des modèles ML industrialisés, du Lakehouse jusqu’au tableau de bord.',
  about: 'Élève ingénieur en 5e année Data Science & IA, spécialisé en ingénierie des données. Je transforme des données complexes en pipelines robustes, modèles prédictifs industrialisés et outils d’aide à la décision. Rigoureux, autonome et orienté production, j’aime relier la qualité technique à un impact métier concret dans les domaines bancaire, fintech, retail et touristique.',
  metrics: [
    { value: '0,983', label: 'AUC ROC', note: 'détection de fraude' },
    { value: '87,6 %', label: 'Rappel', note: 'classe frauduleuse' },
    { value: '13', label: 'tâches', note: 'DAG Airflow' },
    { value: '16 593', label: 'titres', note: 'analysés' },
    { value: '200+', label: 'profils', note: 'collectés par scraping' },
  ],
  skills: [
    { title: 'Data Engineering', icon: 'pipeline', skills: ['Databricks', 'PySpark', 'Delta Lake', 'Unity Catalog', 'Apache Airflow', 'Apache Spark', 'Kafka', 'Talend', 'Hadoop', 'ETL / ELT', 'Architecture Medallion'] },
    { title: 'Machine Learning & Deep Learning', icon: 'model', skills: ['Scikit-learn', 'HistGradientBoosting', 'Random Forest', 'XGBoost', 'KMeans', 'PyTorch', 'TensorFlow', 'Déséquilibre de classes'] },
    { title: 'MLOps & Déploiement', icon: 'deploy', skills: ['MLflow', 'Tracking & registre', 'Champion / challenger', 'Docker / Docker Compose', 'Astro CLI', 'FastAPI', 'Prometheus / Grafana', 'pytest', 'Ruff'] },
    { title: 'BI & Visualisation', icon: 'chart', skills: ['Power BI', 'DAX', 'Modélisation en étoile', 'Streamlit', 'R / Shiny', 'Dash', 'SSAS / SSRS', 'MDX'] },
    { title: 'Bases de données', icon: 'database', skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'DuckDB', 'Elasticsearch'] },
    { title: 'Outils', icon: 'tools', skills: ['Python', 'SQL', 'Git / GitHub', 'Linux', 'Excel avancé'] },
  ] satisfies SkillGroup[],
  experience: [
    {
      title: 'Pipeline Data & BI bancaire — Reporting réglementaire et détection de fraude',
      organization: 'Projet de Fin d’Année · ENSA Fès',
      date: '2025 — 2026',
      featured: true,
      bullets: [
        'Architecture Medallion sur Databricks : ingestion, feature engineering avancé et modélisation en étoile.',
        'Orchestration de bout en bout avec un DAG Airflow de 13 tâches, déployé avec Astro CLI et Docker / Docker Compose.',
        'Modèle HistGradientBoostingClassifier sur 16 features : AUC ROC 0,983 et rappel de 87,6 % sur la classe frauduleuse.',
        'Suivi du cycle de vie ML avec MLflow : tracking, registre Unity Catalog et promotion champion / challenger.',
        'Exposition et supervision via FastAPI, Dash, Prometheus / Grafana, tests automatisés avec pytest et Ruff.',
        'Trois tableaux de bord Power BI avec indicateurs alignés sur Bank Al-Maghrib : LCR / NSFR, perte attendue et classification des créances.',
      ],
    },
    {
      title: 'Stagiaire Data Analyst / Data Science',
      organization: 'ENSA Fès · Département Génie Électrique',
      date: 'Juil. — Août 2025',
      bullets: [
        'Collecte de 200+ profils d’artisans de la Médina via web scraping avec BeautifulSoup et Selenium.',
        'Segmentation par clustering KMeans avec un Silhouette Score de 0,67 pour la promotion touristique locale.',
      ],
    },
  ],
  education: [
    { title: 'Cycle Ingénieur — Data Science & Intelligence Artificielle', institution: 'ENSA de Fès', date: '2024 — 2027' },
    { title: 'Classes Préparatoires Intégrées (CPI)', institution: 'ENSA de Fès', date: '2022 — 2024' },
  ],
  certification: 'Certification Data Engineer · ForceN Sénégal',
  languages: [
    { name: 'Français', level: 'Courant' },
    { name: 'Anglais', level: 'Lecture & documentation technique' },
    { name: 'Ngambaye', level: 'Langue maternelle' },
  ],
  projects: [
    {
      id: 'banking', title: 'Pipeline Data & BI bancaire', category: 'Data Engineering', featured: true,
      description: 'Plateforme de données pour le reporting réglementaire et la détection de fraude.',
      results: ['AUC ROC 0,983', 'Rappel 87,6 %', '13 tâches Airflow'],
      technologies: ['Databricks', 'Airflow', 'MLflow', 'Power BI'],
      details: 'Projet de Fin d’Année réunissant architecture Medallion sur Databricks, orchestration Airflow, modèle HistGradientBoosting, suivi MLflow champion / challenger, APIs de service et tableaux de bord réglementaires.',
      architecture: ['Bronze', 'Silver', 'Gold', 'ML', 'Dashboard'],
    },
    {
      id: 'games', title: 'Video Games Analytics', category: 'Data Engineering',
      description: 'Pipeline de bout en bout pour analyser 16 593 titres de jeux vidéo.',
      results: ['16 593 titres', 'DuckDB OLAP', 'API FastAPI'],
      technologies: ['Python', 'PySpark', 'DuckDB', 'Elasticsearch'],
      details: 'Analyse des classements éditeurs, tendances temporelles et performance par genre. Pipeline end-to-end avec ingestion, nettoyage, feature engineering, stockage colonne Parquet, moteur analytique DuckDB et double moteur DuckDB / Elasticsearch.',
      architecture: ['Ingestion', 'Nettoyage', 'Parquet', 'DuckDB', 'API'],
      github: 'https://github.com/Mbaitedero/videogames-analytics',
    },
    {
      id: 'university', title: 'Gestion Système Universitaire', category: 'BI',
      description: 'Data Warehouse et OLAP pour le pilotage d’un système universitaire.',
      results: ['7 dimensions', '10 pipelines', 'OLAP SSAS / MDX'],
      technologies: ['MySQL', 'MongoDB', 'SQL Server', 'SSAS / SSRS'],
      details: 'Data Warehouse multidimensionnel en étoile alimenté par des pipelines ETL. Modélisation NoSQL avec MongoDB, analyse multidimensionnelle via cube OLAP SSAS, requêtes MDX et rapports SSRS.',
      architecture: ['Sources', 'ETL', 'Entrepôt', 'Cube OLAP', 'Rapports'],
      github: 'https://github.com/Mbaitedero/Gestion-Syst-me-Universitaire',
    },
    {
      id: 'credit', title: 'Application Credit Scoring — Fintech', category: 'Machine Learning',
      description: 'Solution de scoring crédit distribuée et interface de suivi.',
      results: ['Sparklyr', 'Random Forest', 'Shiny'],
      technologies: ['Apache Spark', 'Sparklyr', 'R', 'Shiny'],
      details: 'Pipeline ETL / ML avec Sparklyr pour préparer les données de scoring à l’échelle. Modèle Random Forest et interface Shiny de suivi entreprise : monitoring, batch scoring, auditabilité et traçabilité des décisions.',
      architecture: ['ETL / ML', 'Spark', 'Scoring', 'Monitoring'],
    },
  ] satisfies Project[],
}

export const cvFiles = [
  { label: 'Data Engineer', path: '/cv/CV_Japhet_ALLAH-NDIGUIM_Data-Engineer.pdf' },
  { label: 'Data Scientist', path: '/cv/CV_Japhet_ALLAH-NDIGUIM_Data-Scientist.pdf' },
  { label: 'Data Analyst', path: '/cv/CV_Japhet_ALLAH-NDIGUIM_Data-Analyst.docx' },
]
