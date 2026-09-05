import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "proj-1",
  mathFormulas: [
    {
        "title": "Cosine Similarity pada Dense Vector Embeddings",
        "latex": "\\text{CosineSimilarity}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_{i=1}^d u_i v_i}{\\sqrt{\\sum_{i=1}^d u_i^2} \\sqrt{\\sum_{i=1}^d v_i^2}}",
        "explanation": "Mengukur derajat kedekatan semantik antara vektor pertanyaan pengguna u dan embedding chunk dokumen v dalam ruang dimensi berarah d=1536.",
        "variables": [
            {
                "symbol": "\\mathbf{u}",
                "meaning": "Vektor embedding pertanyaan pengguna"
            },
            {
                "symbol": "\\mathbf{v}",
                "meaning": "Vektor embedding teks dokumen korpus"
            },
            {
                "symbol": "d",
                "meaning": "Dimensi ruang embedding dense (1536)"
            }
        ]
    },
    {
        "title": "Reciprocal Rank Fusion (RRF) Fusi Graf & Vektor",
        "latex": "\\text{RRF}(d \\in D) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}",
        "explanation": "Fungsi fusi peringkat non-parametrik yang menggabungkan hasil peringkat dari traversal graf Cypher berkedalaman n-hop dengan dense semantic search secara adil tanpa bias magnitudo skor.",
        "variables": [
            {
                "symbol": "r_m(d)",
                "meaning": "Peringkat dokumen d dalam sistem retrieval m"
            },
            {
                "symbol": "k",
                "meaning": "Konstanta penghalus peringkat (smoothing constant, k = 60)"
            },
            {
                "symbol": "M",
                "meaning": "Himpunan retrieval {Vector Semantic Search, Cypher Graph Traversal}"
            }
        ]
    }
],
  
    slug: "chatbot-rag-knowledge-graph-neo4j",
    title: "Chatbot RAG dengan Knowledge Graph menggunakan Neo4j",
    tagline: "Enterprise GraphRAG dengan Hybrid Vector Search & Multi-Hop Cypher Graph Traversal",
    category: "GenAI & NLP",
    readTime: "9 min read",
    date: "Januari 2025",
    featured: true,
    shortDescription: "Sistem Tanya-Jawab cerdas (RAG) yang menggabungkan dense vector retrieval dengan Knowledge Graph Neo4j untuk menghilangkan halusinasi dan mendukung penalaran multi-hop pada dokumen regulasi dan data relasional perusahaan.",
    techStack: ["Python", "Neo4j", "LangChain", "Cypher", "OpenAI / Gemini Embeddings", "FastAPI", "Docker"],
    metrics: [
      { label: "Faithfulness Score", value: "96.4%", change: "+34%", helper: "vs Naive RAG benchmark" },
      { label: "Hallucination Rate", value: "< 2.1%", change: "-81%", helper: "Verifikasi berbasis fakta entitas" },
      { label: "Multi-Hop Accuracy", value: "91.8%", change: "+48%", helper: "Pertanyaan lintas relasi multi-dokumen" },
      { label: "Median Latency", value: "680 ms", change: "p95: 1.2s", helper: "Hybrid index retrieval" }
    ],
    executiveSummary: "Solusi RAG (Retrieval-Augmented Generation) konvensional berbasis semantic chunking sering mengalami kegagalan pada dokumen dengan dependensi relasional tinggi, hierarki regulasi, atau skema produk yang kompleks karena hilangnya koneksi struktural antar entitas. Proyek ini membangun GraphRAG arsitektur penuh menggunakan Neo4j Graph Database dan LLM, di mana dokumen diurai menjadi node entitas dan edge relasi, memungkinkan eksekusi dynamic Cypher queries yang akurat dan minim halusinasi.",
    businessProblem: "Tim operasional dan kepatuhan sering menghabiskan 40+ menit untuk memverifikasi klausul kontrak dan regulasi yang saling bertaut di ratusan SOP PDF. Chatbot berbasis vector search biasa sering 'berhalusinasi' atau gagal mengidentifikasi relasi tidak langsung antara aturan anak perusahaan dengan regulasi induk.",
    challenges: [
      "Ambiguitas nama entitas (Entity Resolution) saat mengekstrak ribuan klausa dokumen secara otomatis.",
      "Keseimbangan latensi antara traversal graf Cypher berkedalaman 3-hop dengan pencarian embedding vektor.",
      "Mengonversi pertanyaan bahasa alami pengguna ke query Cypher (Text-to-Cypher) tanpa celah injeksi logika sintaks."
    ],
    architecture: {
      title: "Pipeline GraphRAG Hybrid Retrieval",
      flowDescription: "Dokumen diproses melalui LLM Entity Extractor untuk membentuk relasi graf di Neo4j dan disimpan ke vector index. Saat query masuk, sistem mengeksekusi vector semantic search paralel dengan Cypher schema traversal, lalu melakukan reranking fakta sebelum disintesis oleh LLM.",
      nodes: [
        { step: 1, name: "Document Ingestion & Chunking", desc: "Parsing PDF & Markdown dengan semantic chunking adaptif", tool: "Unstructured / PyPDF" },
        { step: 2, name: "Entity & Relation Extraction", desc: "Ekstraksi otomatis Node (Organisasi, Aturan, Aset) dan Relasi (MENETAPKAN, BERLAKU_UNTUK)", tool: "LLM + Instructor" },
        { step: 3, name: "Knowledge Graph Storage", desc: "Penyimpanan struktur topologi graf berindeks vektor dan full-text", tool: "Neo4j Enterprise" },
        { step: 4, name: "Hybrid Query Router", desc: "Mendeteksi intent pertanyaan: apakah memerlukan semantic similarity atau Graph Hop", tool: "FastAPI / LangGraph" },
        { step: 5, name: "Context Fusion & Synthesis", desc: "Menggabungkan subgrafik fakta terverifikasi ke dalam prompt guardrail", tool: "Gemini / GPT-4o" }
      ]
    },
    dataset: {
      source: "Kumpulan Dokumen Regulasi Internal, SOP Operasional, dan Struktur Katalog Layanan",
      volume: "1,450+ dokumen korpus, menghasilkan 48,200 Node dan 112,800 Edge terindeks",
      keyFeatures: ["entity_name", "entity_type", "relationship_type", "source_doc_id", "temporal_validity", "text_embedding_1536d"],
      preprocessing: [
        "Normalisasi teks dan ekstraksi tabel menggunakan OCR berbasis layout.",
        "Entity canonicalization untuk menggabungkan singkatan dan alias (misal: 'PT LTN' -> 'PT Lintas Telematika Nusantara').",
        "Penetapan bobot relasi berbasis frekuensi ko-eksistensi kalimat."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Graph Modeling & Schema Ontology Design",
        description: "Merancang ontologi formal dengan Node types (Organization, Policy, Exception, Role, Asset) dan relasi berarah terstandarisasi untuk mencegah ledakan relasi semantik yang acak.",
        details: ["Menentukan skema label yang ketat", "Menghindari densitas hub berlebih dengan partisi namespace dokumen"]
      },
      {
        phase: "Fase 2: Automated Triplets Extraction with Guardrails",
        description: "Mengembangkan prompt extraction terstruktur menggunakan Pydantic schema validation untuk menghasilkan relasi (Subject - Predicate - Object) yang konsisten dari teks tidak terstruktur.",
        details: ["Penerapan self-consistency check pada ekstraksi triplet", "Validasi tipe relasi terhadap whitelist ontologi"]
      },
      {
        phase: "Fase 3: Multi-Stage Hybrid Retrieval & Reranking",
        description: "Menggabungkan vector retrieval (cosine similarity pada embedding ringkasan) dengan 2-hop neighborhood expansion di Neo4j untuk menjaring konteks tersembunyi.",
        details: ["Cross-Encoder reranker untuk memberi peringkat top-5 factual triples", "Prompt compression untuk meminimalkan token overhead ke LLM"]
      }
    ],
    interactiveType: "graph-rag",
    codeSnippet: {
      language: "python",
      filename: "graph_retriever.py",
      description: "Implementasi Cypher query generation dan graph context merger menggunakan Neo4j Python Driver",
      code: `from neo4j import GraphDatabase
import numpy as np

class KnowledgeGraphRAG:
    def __init__(self, uri, auth):
        self.driver = GraphDatabase.driver(uri, auth=auth)

    def hybrid_retrieve(self, query_text: str, query_vector: list, top_k: int = 5):
        # 1. Neo4j Vector Index Search
        vector_cypher = """
        CALL db.index.vector.queryNodes('chunk_embeddings', $top_k, $vector)
        YIELD node, score
        MATCH (node)-[:MENTIONS]->(e:Entity)
        OPTIONAL MATCH (e)-[r:RELATION]->(target:Entity)
        RETURN node.text AS chunk_text, score,
               e.name AS entity, type(r) AS relation, target.name AS related_to
        ORDER BY score DESC LIMIT $top_k
        """
        with self.driver.session() as session:
            result = session.run(vector_cypher, top_k=top_k, vector=query_vector)
            return [record.data() for record in result]
            
    def generate_grounded_answer(self, context_records, query):
        triples_summary = "\\n".join([
            f"Fakta: {r['entity']} --[{r['relation']}]--> {r['related_to']}"
            for r in context_records if r['relation']
        ])
        return f"Jawaban berbasis Graph Validated Facts:\\n{triples_summary}"`
    },
    resultsAndImpact: [
      "Mengurangi waktu penelusuran klausul kepatuhan tim dari 45 menit menjadi rata-rata 12 detik.",
      "Mencapai skor Faithfulness RAGAS sebesar 0.964, secara dramatis meminimalkan risiko kepatuhan hukum.",
      "Mendukung pertanyaan kompleks multi-hop seperti: 'Apa prasyarat sertifikasi jika vendor menyediakan layanan cloud tingkat Tier-3?' dengan akurasi 91.8%."
    ],
    businessROI: "Efisiensi jam kerja tim analis setara penghematan 180+ man-hours per bulan dan eliminasi 95% kesalahan interpretasi manual.",
    lessonsLearned: [
      "Knowledge Graph murni tanpa vector search terlalu rapuh terhadap variasi sinonim pengguna.",
      "Kombinasi hybrid: Graph untuk penalaran deterministik + Vector untuk semantic similarity adalah arsitektur optimal untuk enterprise QA."
    ],
    futureRoadmap: [
      "Implementasi Graph Neural Networks (GNN) untuk link prediction fakta baru yang belum tertulis eksplisit.",
      "Integrasi visual graph canvas interaktif langsung di antarmuka chat pengguna."
    ]
  },
  {
    id: "proj-2",
  mathFormulas: [
    {
        "title": "Dekomposisi Generalized Additive Time Series (Prophet)",
        "latex": "y(t) = g(t) + s(t) + h(t) + \\epsilon_t",
        "explanation": "Model aditif dekomposisi deret waktu yang memisahkan harga cabe aktual y(t) menjadi tren jangka panjang g(t), efek musiman berkala s(t), dampak lonjakan hari libur keagamaan h(t), serta residual galat epsilon.",
        "variables": [
            {
                "symbol": "g(t)",
                "meaning": "Fungsi piecewise linear trend dengan kapasitas saturasi"
            },
            {
                "symbol": "s(t)",
                "meaning": "Musiman Fourier periodik (mingguan, bulanan, tahunan)"
            },
            {
                "symbol": "h(t)",
                "meaning": "Efek lonjakan diskrit hari libur & perayaan keagamaan"
            },
            {
                "symbol": "\\epsilon_t",
                "meaning": "Galat residual berdistribusi normal N(0, sigma^2)"
            }
        ]
    },
    {
        "title": "Mean Absolute Percentage Error (MAPE)",
        "latex": "\\text{MAPE} = \\frac{100\\%}{n} \\sum_{t=1}^n \\left| \\frac{y_t - \\hat{y}_t}{y_t} \\right|",
        "explanation": "Metrik evaluasi akurasi peramalan harga komoditas untuk mengukur deviasi relatif persentase harga prediksi terhadap harga realisasi pasar.",
        "variables": [
            {
                "symbol": "y_t",
                "meaning": "Harga riil cabe pasar pada hari t"
            },
            {
                "symbol": "\\hat{y}_t",
                "meaning": "Harga estimasi model ensemble pada hari t"
            },
            {
                "symbol": "n",
                "meaning": "Jumlah total hari observasi evaluasi (test window)"
            }
        ]
    }
],
  
    slug: "jakarta-chili-price-forecasting",
    title: "Analisis & Peramalan Harga Cabe Pasar DKI Jakarta (Time Series Forecasting)",
    tagline: "Forecasting Volatilitas Komoditas Pangan Menggunakan Prophet, XGBoost & Faktor Cuaca Eksternal",
    category: "Time Series & Forecasting",
    readTime: "8 min read",
    date: "November 2024",
    featured: true,
    shortDescription: "Pemodelan prediktif harga harian cabe merah keriting dan rawit di pasar induk Jakarta (Kramat Jati, Senen, dll.) dengan mengintegrasikan data curah hujan BMKG, kalender hari besar keagamaan, dan fluktuasi biaya logistik.",
    techStack: ["Python", "Prophet", "XGBoost", "Statsmodels", "Pandas", "Plotly", "PostgreSQL"],
    metrics: [
      { label: "MAPE (7-Hari)", value: "5.32%", change: "-42%", helper: "vs Model Rata-rata Bergerak Tradisional" },
      { label: "RMSE Akurasi", value: "Rp 3,450 /kg", change: "Stabil", helper: "Pada rentang harga Rp 40k - 110k/kg" },
      { label: "Deteksi Spike Puncak", value: "88.6%", change: "+29%", helper: "Berhasil mengantisipasi lonjakan H-14 Lebaran" },
      { label: "Pasar Dianalisis", value: "5 Pasar Induk", change: "DKI Jakarta", helper: "Kramat Jati, Pasar Senen, dll." }
    ],
    executiveSummary: "Komoditas cabe merah keriting dan cabe rawit merupakan pendorong utama inflasi pangan bergejolak (volatile food inflation) di wilayah metropolitan Jakarta. Proyek ini membangun pipeline peramalan harga multivariat harian hingga 30 hari ke depan dengan mengombinasikan dekomposisi musiman Prophet dengan nonlinear feature interactions dari XGBoost Regressor serta faktor eksogen cuaca dan logistik.",
    businessProblem: "Ketidakpastian harga cabe yang dapat melonjak hingga 250% dalam hitungan minggu mengancam stabilitas biaya bahan baku UMKM kuliner dan mempersulit intervensi pasar oleh dinas ketahanan pangan daerah.",
    challenges: [
      "Keterlambatan data pasokan dari daerah sentra produksi (Jawa Barat, Jawa Tengah, Jawa Timur).",
      "Dampak non-linear curah hujan ekstrem (fenomena La Niña/El Niño) yang menyebabkan gagal panen dan lonjakan mendadak.",
      "Efek kalender ganda (kalender Masehi vs Hijriah yang bergeser tiap tahun) terhadap pola konsumsi musiman."
    ],
    architecture: {
      title: "Pipeline Data & Peramalan Harga Cabe Multivariat",
      flowDescription: "Agregasi harian harga pasar dari API Informasi Pangan Jakarta digabungkan dengan data cuaca BMKG dan harga BBM solar subsidi. Feature engineering menghasilkan lag features, rolling statistics, dan Fourier seasonal terms sebelum dilatih pada ensemble model.",
      nodes: [
        { step: 1, name: "Web Scraping & API Ingestion", desc: "Mengambil harga harian per komoditas dari 5 pasar utama Jakarta", tool: "Requests / BeautifulSoup" },
        { step: 2, name: "Weather & Logistic Fusion", desc: "Join spasial data curah hujan sentra (Brebes, Garut) & biaya BBM", tool: "PostgreSQL / Pandas" },
        { step: 3, name: "Seasonal Decomposition", desc: "Pemisahan tren jangka panjang, siklus mingguan, dan efek hari libur nasional", tool: "Statsmodels STL" },
        { step: 4, name: "Hybrid Forecasting Modeling", desc: "Prophet untuk baseline trend/seasonality + XGBoost untuk residual regresi", tool: "Prophet + XGBoost" },
        { step: 5, name: "Automated Alerting & BI Dashboard", desc: "Trigger notifikasi peringatan dini lonjakan harga ekstrim (>20%)", tool: "Plotly / Streamlit" }
      ]
    },
    dataset: {
      source: "Data Informasi Pangan Jakarta (IPJ) + Data Curah Hujan BMKG Sentra Tani (2019 - 2024)",
      volume: "1,826 hari observasi harian x 5 pasar tradisional utama DKI Jakarta",
      keyFeatures: ["harga_per_kg", "volume_pasokan_ton", "curah_hujan_sentra_mm", "harga_solar_liter", "is_ramadhan", "lag_1d_7d_14d_30d", "rolling_std_7d"],
      preprocessing: [
        "Interpolasi spline kubik untuk menangani hari libur pasar tanpa transaksi.",
        "Deteksi anomali harga menggunakan Isolation Forest untuk memfilter kesalahan input human operator.",
        "Standarisasi z-score pada variabel cuaca eksternal."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Analisis Kausalitas & Lag Correlation",
        description: "Uji Granger Causality membuktikan curah hujan di sentra pertanian memiliki pengaruh signifikan terhadap lonjakan harga di Jakarta dengan jeda waktu (time lag) 9-12 hari.",
        details: ["Menentukan parameter lag dinamis pada model regresi", "Menghitung korelasi parsial cross-market antar pasar wilayah"]
      },
      {
        phase: "Fase 2: Prophet Modeling with Custom Indonesian Holidays",
        description: "Mengonfigurasi kurva pertumbuhan saturasi dan menambahkan event regressor khusus untuk Idul Fitri, Idul Adha, Tahun Baru, dan Natal.",
        details: ["Penyetelan changepoint_prior_scale menggunakan Bayesian Optimization", "Validasi time-series split dengan rolling origin evaluation"]
      },
      {
        phase: "Fase 3: Residual XGBoost Regressor Boosting",
        description: "Mengambil selisih residual hasil prediksi Prophet dan melatih XGBoost dengan 28 lag features untuk menangkap deviasi harga jangka pendek akibat isu pasokan darurat.",
        details: ["Hyperparameter tuning: max_depth=5, learning_rate=0.03, colsample_bytree=0.8", "Evaluasi Mean Absolute Percentage Error (MAPE) pada hold-out test set"]
      }
    ],
    interactiveType: "chili-forecast",
    codeSnippet: {
      language: "python",
      filename: "chili_forecaster.py",
      description: "Pipeline Prophet hybrid dengan regressor cuaca dan libur nasional",
      code: `from prophet import Prophet
import pandas as pd
import numpy as np

def build_chili_prophet_model(df_market: pd.DataFrame, holidays_df: pd.DataFrame):
    # Format data sesuai standar Prophet (ds, y)
    model = Prophet(
        growth='linear',
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False,
        holidays=holidays_df,
        seasonality_mode='multiplicative',
        changepoint_prior_scale=0.05
    )
    
    # Menambahkan regressor eksogen curah hujan sentra & harga BBM
    model.add_regressor('curah_hujan_lag10d', standardize=True)
    model.add_regressor('harga_solar_logistik', standardize=True)
    
    model.fit(df_market)
    return model

def predict_future_spike(model, future_dataframe):
    forecast = model.predict(future_dataframe)
    forecast['is_spike_risk'] = (forecast['yhat_upper'] - forecast['yhat']) / forecast['yhat'] > 0.25
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper', 'is_spike_risk']]`
    },
    resultsAndImpact: [
      "Menurunkan Mean Absolute Percentage Error (MAPE) dari 14.8% (model moving average konvensional) menjadi 5.32%.",
      "Membantu pengusaha katering dan distributor bumbu menghemat hingga 18% biaya belanja dengan forward buying sebelum fase lonjakan.",
      "Menghasilkan dashboard monitoring dinamis yang memperlihatkan tren disparitas harga antar pasar Kramat Jati vs Pasar Senen."
    ],
    businessROI: "Potensi mitigasi risiko kerugian pengadaan bahan baku hingga Rp 65 Juta per bulan bagi jaringan bisnis F&B mitra.",
    lessonsLearned: [
      "Harga komoditas pertanian di pasar Jakarta sangat sensitif terhadap 'panic buying' 3 hari menjelang Idul Fitri.",
      "Model murni auto-regressive (seperti ARIMA) gagal saat musim kemarau panjang El Niño tanpa variabel cuaca eksternal."
    ],
    futureRoadmap: [
      "Mengintegrasikan data citra satelit Sentinel-2 NDVI untuk mengestimasi luas panen cabe secara real-time.",
      "Membuat bot WhatsApp bot peringatan harga harian untuk pedagang pasar tradisional."
    ]
  },
  {
    id: "proj-3",
  mathFormulas: [
    {
        "title": "Formula Nilai Atribusi Marginal Shapley (SHAP TreeExplainer)",
        "latex": "\\phi_i(f, x) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(|F| - |S| - 1)!}{|F|!} \\left[ f_x(S \\cup \\{i\\}) - f_x(S) \\right]",
        "explanation": "Menghitung kontribusi aditif dari fitur ke-i terhadap deviasi probabilitas churn pelanggan individu x dari nilai ekspektasi rata-rata populasi.",
        "variables": [
            {
                "symbol": "F",
                "meaning": "Himpunan seluruh fitur prediktor dalam model"
            },
            {
                "symbol": "S",
                "meaning": "Subset fitur tanpa melibatkan fitur target i"
            },
            {
                "symbol": "\\phi_i",
                "meaning": "Nilai kontribusi fitur i (SHAP value)"
            }
        ]
    },
    {
        "title": "Fungsi Kerugian Terbobot Biaya (Cost-Sensitive Weighted Loss)",
        "latex": "\\mathcal{L}_{\\text{CS}} = -\\frac{1}{N} \\sum_{j=1}^N \\left[ w_1 y_j \\log(\\hat{p}_j) + w_0 (1 - y_j) \\log(1 - \\hat{p}_j) \\right]",
        "explanation": "Optimasi model klasifikasi LightGBM dengan bobot penalti asimetris untuk mencegah kerugian finansial akibat nasabah high-value churn yang luput terdeteksi (False Negative).",
        "variables": [
            {
                "symbol": "w_1",
                "meaning": "Bobot penalti kelas churn positif (Cost(FN)/Cost(FP) = 5.4)"
            },
            {
                "symbol": "w_0",
                "meaning": "Bobot nasabah loyal (w_0 = 1.0)"
            },
            {
                "symbol": "\\hat{p}_j",
                "meaning": "Estimasi probabilitas churn nasabah j"
            }
        ]
    }
],
  
    slug: "customer-churn-prediction-shap",
    title: "Customer Churn Prediction & Uplift Retention Modeling",
    tagline: "Prescriptive Retention Engine Menggunakan LightGBM, SHAP Explainability & Causal Uplift Modeling",
    category: "Predictive Modeling",
    readTime: "8 min read",
    date: "Oktober 2024",
    featured: true,
    shortDescription: "Model pemodelan prediktif churn nasabah/pelanggan berbasis machine learning yang dilengkapi atribusi fitur SHAP per individu serta Uplift Modeling untuk memastikan kampanye retensi hanya menargetkan segmen pelanggan yang tepat (persuadable).",
    techStack: ["Python", "LightGBM", "SHAP", "Scikit-learn", "CausalML", "Optuna", "FastAPI"],
    metrics: [
      { label: "ROC-AUC Score", value: "0.894", change: "+16%", helper: "vs Baseline Logistic Regression" },
      { label: "Precision @ Top 10%", value: "78.2%", change: "+2.4x", helper: "Rasio ketepatan target retensi" },
      { label: "Penghematan Biaya Promosi", value: "Rp 310 Juta", change: "-34% budget waste", helper: "Eliminasi promosi pada 'Sure Things'" },
      { label: "Inference Latency", value: "14 ms", change: "Batch / Realtime", helper: "Dioptimalkan untuk scoring harian" }
    ],
    executiveSummary: "Banyak perusahaan kehilangan 20-30% pelanggan setiap tahun dan melakukan 'blanket discounting' (memberikan voucher ke semua pengguna yang diprediksi churn) yang boros biaya. Proyek ini tidak hanya memprediksi siapa yang akan churn, tetapi menerapkan Causal Uplift Modeling untuk membedakan antara pelanggan yang dapat diselamatkan (Persuadables) dari pelanggan yang tetap churn apa pun yang dilakukan (Lost Causes) atau yang tetap loyal tanpa promo (Sure Things).",
    businessProblem: "Tingginya Customer Acquisition Cost (CAC) membuat retensi pelanggan eksisting 5x lebih bernilai. Namun, tim CRM tidak memiliki kejelasan alasan churn per individu dan sering membuang budget promo pada pengguna yang sebenarnya tidak memerlukan insentif.",
    challenges: [
      "Ketidakseimbangan kelas (imbalanced class) dengan churn rate alami di angka 8-11%.",
      "Kebutuhan interpretabilitas tingkat tinggi agar tim sales dan account executive memahami akar masalah tiap akun pelanggan.",
      "Menghindari fenomena 'Sleeping Dogs'—pelanggan yang jika dikontak promosi justru teringat untuk membatalkan langganan."
    ],
    architecture: {
      title: "End-to-End Predictive Churn & Prescriptive Retention Workflow",
      flowDescription: "Data perilaku transaksi dan interaksi customer support diekstrak secara otomatis. Feature store menghitung recency, frequency, monetary, dan drift kepuasan. Model LightGBM menghasilkan probabilitas churn, SHAP menghasilkan local explanations, dan Uplift T-Learner mengalokasikan strategi intervensi.",
      nodes: [
        { step: 1, name: "Customer Behavioral Aggregation", desc: "Data transaksi, tiket CS, durasi login, dan tren pemakaian kuota", tool: "SQL / BigQuery" },
        { step: 2, name: "Feature Engineering & Drift Detection", desc: "Menghitung delta perubahan aktivitas 30 hari vs 90 hari", tool: "Scikit-learn / Feature-engine" },
        { step: 3, name: "LightGBM Classifier with Optuna", desc: "Optimasi hyperparameter Bayesian dengan bobot penalti scale_pos_weight", tool: "LightGBM / Optuna" },
        { step: 4, name: "SHAP Explainability TreeExplainer", desc: "Menghitung kontribusi tiap variabel terhadap skor churn pelanggan", tool: "SHAP Kernel" },
        { step: 5, name: "Causal Uplift Model & CRM Integration", desc: "Mengklasifikasikan 4 kuadran pelanggan dan mengarahkan aksi retensi", tool: "CausalML / Webhooks" }
      ]
    },
    dataset: {
      source: "Dataset Perilaku Pelanggan Telekomunikasi & Layanan Berlangganan (SaaS/Telco)",
      volume: "70,430 profil pelanggan dengan riwayat penggunaan selama 24 bulan",
      keyFeatures: ["tenure_months", "monthly_charges", "total_charges", "contract_type", "payment_method", "num_support_tickets", "avg_call_duration_delta", "data_usage_drop_rate"],
      preprocessing: [
        "Weight of Evidence (WoE) encoding untuk variabel kategorikal berdimensi tinggi.",
        "Penanganan missing value pada total charges pelanggan baru dengan imputasi berbasis median segmen.",
        "Stratified K-Fold cross validation (5-fold) untuk menjaga distribusi label churn."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Feature Engineering & Behavioral Decay Indicators",
        description: "Menciptakan fitur turunan yang mengukur percepatan penurunan aktivitas (velocity of engagement decay), rasio tiket komplain yang belum selesai, dan rasio biaya bulanan terhadap median industri.",
        details: ["Membuat fitur delta_charges_last_3m", "Menghitung skor rasio keluhan berulang ke tim support"]
      },
      {
        phase: "Fase 2: Cost-Sensitive LightGBM Tuning",
        description: "Mengoptimalkan threshold klasifikasi berdasarkan matriks kerugian finansial bisnis: False Negative (pelanggan churn tanpa terdeteksi) bernilai kerugian 6x lebih besar daripada False Positive (promo terkirim).",
        details: ["Menemukan threshold probabilitas optimal di angka 0.38", "Mengevaluasi Precision-Recall AUC (PR-AUC) kurva"]
      },
      {
        phase: "Fase 3: Explainable AI & Uplift T-Learner",
        description: "Mengekstrak SHAP waterfall plot per pelanggan untuk memberi rekomendasi tindakan spesifik kepada Relationship Manager (misal: tawarkan upgrade fiber optic jika faktor churn utama adalah gangguan koneksi).",
        details: ["Segmentasi pelanggan ke 4 persona Uplift", "Menghubungkan API scoring dengan dashboard CRM internal"]
      }
    ],
    interactiveType: "churn-calculator",
    codeSnippet: {
      language: "python",
      filename: "churn_shap_explainer.py",
      description: "Pipeline pelatihan model LightGBM dengan interpretasi nilai SHAP per pelanggan",
      code: `import lightgbm as lgb
import shap
import numpy as np

def train_churn_model(X_train, y_train, scale_pos_weight=4.2):
    params = {
        'objective': 'binary',
        'metric': 'auc',
        'boosting_type': 'gbdt',
        'n_estimators': 350,
        'learning_rate': 0.04,
        'max_depth': 6,
        'scale_pos_weight': scale_pos_weight,
        'random_state': 42
    }
    model = lgb.LGBMClassifier(**params)
    model.fit(X_train, y_train)
    return model

def explain_customer_risk(model, customer_features, feature_names):
    explainer = shap.TreeExplainer(model)
    shap_values = explainer(customer_features)
    prob = model.predict_proba(customer_features)[0, 1]
    
    # Ambil top-3 driver penyebab risiko churn
    top_driver_indices = np.argsort(np.abs(shap_values.values[0]))[::-1][:3]
    reasons = [
        {"feature": feature_names[i], "impact": float(shap_values.values[0][i])}
        for i in top_driver_indices
    ]
    return {"churn_probability": float(prob), "top_reasons": reasons}`
    },
    resultsAndImpact: [
      "Mencapai ROC-AUC 0.894 dan mengangkat Precision pada kelompok desil teratas (Top 10%) menjadi 78.2%.",
      "Mengurangi budget pemborosan diskon retensi sebesar 34% (Rp 310 Juta) dengan mengecualikan segmen pelanggan yang sebenarnya loyal (Sure Things).",
      "Membekali tim Customer Retention dengan rekomendasi preskriptif per nasabah yang meningkatkan acceptance rate penawaran retensi dari 21% ke 49%."
    ],
    businessROI: "Retensi berhasil menyelamatkan 420+ pelanggan bernilai tinggi dalam kuartal pertama implementasi.",
    lessonsLearned: [
      "Memberikan voucher diskon kepada pelanggan yang mengeluhkan kualitas teknis tidak menyelesaikan masalah fundamental dan hanya menunda churn 1-2 bulan.",
      "Explainability SHAP adalah jembatan krusial agar tim bisnis mempercayai output model machine learning."
    ],
    futureRoadmap: [
      "Mengintegrasikan model churn dengan survival analysis (Cox Proportional Hazards) untuk memprediksi perkiraan *kapan* pelanggan akan churn.",
      "Automasi A/B testing insentif melalui Multi-Armed Bandit."
    ]
  },
  {
    id: "proj-4",
  mathFormulas: [
    {
        "title": "Kerapatan Epsilon-Neighborhood & Core Point DBSCAN",
        "latex": "N_\\varepsilon(p) = \\{q \\in D \\mid \\text{dist}(p, q) \\le \\varepsilon\\}, \\quad |N_\\varepsilon(p)| \\ge \\text{MinPts}",
        "explanation": "Kondisi densitas spasial untuk menetapkan sebuah sesi jaringan p sebagai Core Point lalu memperluas klaster intrusi (density-reachable) dan menandai anomali terisolasi sebagai serangan Zero-Day.",
        "variables": [
            {
                "symbol": "\\varepsilon",
                "meaning": "Jarak radius spasial ketetanggaan maksimum (threshold)"
            },
            {
                "symbol": "\\text{MinPts}",
                "meaning": "Ambang batas minimum jumlah koneksi dalam radius epsilon"
            },
            {
                "symbol": "\\text{dist}(p, q)",
                "meaning": "Jarak metrik Minkowski / Euclidean ternormalisasi antar paket"
            }
        ]
    },
    {
        "title": "Koefisien Silhouette Evaluasi Separasi Klaster",
        "latex": "s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}",
        "explanation": "Mengukur kualitas separasi antara sesi trafik normal dengan jenis serangan siber yang terkelompok, bernilai antara -1 hingga +1.",
        "variables": [
            {
                "symbol": "a(i)",
                "meaning": "Rata-rata jarak titik i ke seluruh titik lain dalam klaster yang sama"
            },
            {
                "symbol": "b(i)",
                "meaning": "Jarak rata-rata terendah dari titik i ke klaster tetangga terdekat"
            }
        ]
    }
],
  
    slug: "network-intrusion-detection-nids-clustering",
    title: "Network Intrusion Detection System (NIDS) with Clustering & Anomaly Detection",
    tagline: "Deteksi Serangan Jaringan & Anomali Tanpa Label Berdasarkan Clustering Aliran Paket Real-Time",
    category: "Predictive Modeling",
    readTime: "10 min read",
    date: "Mei 2025",
    featured: true,
    shortDescription: "Proyek produksi nyata dari pengalaman di PT Lintas Telematika Nusantara: menganalisis 500.000+ data aliran traffic jaringan (PCAP flows), membersihkan logs mentah, dan membangun model unsupervised clustering (DBSCAN & Isolation Forest) untuk mendeteksi serangan siber Zero-Day.",
    techStack: ["Python", "DBSCAN", "Isolation Forest", "PCA / UMAP", "PySpark", "Scapy", "Linux Server"],
    metrics: [
      { label: "Records Diproses", value: "500,000+", change: "Data Riil Server", helper: "Log aliran traffic perusahaan" },
      { label: "Zero-Day Anomaly Detection", value: "94.2%", change: "+37%", helper: "vs Rule-based Snort signatures" },
      { label: "False Positive Reduction", value: "68%", change: "-68% noise", helper: "Mengurangi kelelahan analis SOC" },
      { label: "Throughput Pemrosesan", value: "24,000 req/s", change: "Ultra Fast", helper: "Pipeline streaming C/Python" }
    ],
    executiveSummary: "Sistem pendeteksi intrusi konvensional (NIDS berbasis signature seperti Snort atau Suricata) sering gagal mendeteksi serangan novel, polymorphism malware, dan aktivitas tunneling yang belum pernah didaftarkan dalam database signature. Proyek ini memanfaatkan algoritma Unsupervised Machine Learning untuk memetakan perilaku normal lalu lintas jaringan dan secara otomatis mengisolasi anomali volumetrik maupun perilaku tersembunyi (seperti slow-rate DDoS dan DNS tunneling).",
    businessProblem: "Server infrastruktur perusahaan telematika menghadapi ratusan ribu probe harian. Tim Security Operations Center (SOC) mengalami alert fatigue karena ribuan peringatan palsu per hari dari firewall berbasis aturan statis.",
    challenges: [
      "Volume data PCAP mentah yang sangat besar dengan variasi protokol TCP, UDP, ICMP yang tidak seragam.",
      "Ketiadaan label serangan ground truth yang lengkap dalam lingkungan server produksi nyata.",
      "Kebutuhan mendeteksi anomali dalam rentang mikrodetik agar tidak memperlambat latensi jaringan korporat."
    ],
    architecture: {
      title: "Arsitektur NIDS Clustering & Anomaly Pipeline",
      flowDescription: "Traffic jaringan diekstrak menjadi NetFlow/IPFIX features (durasi flow, bytes/packet ratio, packet inter-arrival times, flag tcp). Fitur dinormalisasi dengan RobustScaler, direduksi menggunakan PCA/UMAP, dan dikelompokkan oleh ensemble DBSCAN + Isolation Forest.",
      nodes: [
        { step: 1, name: "Network Packet Capture & Flow Extraction", desc: "Ekstraksi session bidirectional flows dari interface kartu jaringan", tool: "Scapy / Tshark / Tcpdump" },
        { step: 2, name: "Noise Filtering & Feature Engineering", desc: "Menghitung rasio paket SYN/ACK, entropy payload, dan statistik burstiness", tool: "Python / PySpark" },
        { step: 3, name: "Dimensionality Reduction", desc: "Proyeksi 42 fitur jaringan menjadi komponen utama berbobot variansi tinggi", tool: "PCA & UMAP" },
        { step: 4, name: "Unsupervised Clustering Engine", desc: "Pengelompokan pola normal (dense clusters) dan anomali isolasi (noise points)", tool: "DBSCAN + Isolation Forest" },
        { step: 5, name: "SOC Triage & Alert Dispatcher", desc: "Pengiriman peringatan terkualifikasi beserta metadata flow ke dashboard SOC", tool: "Elasticsearch / Kibana" }
      ]
    },
    dataset: {
      source: "Ratusan ribu data log traffic riil server PT Lintas Telematika Nusantara + Benchmark CICIDS",
      volume: "520,000+ sesi aliran jaringan (flows) dengan 42 variabel statistik",
      keyFeatures: ["flow_duration", "total_fwd_packets", "total_bwd_packets", "packet_length_mean", "packet_length_std", "flow_iat_mean", "syn_flag_count", "fin_flag_count", "rst_flag_count"],
      preprocessing: [
        "Pembersihan flow anomali akibat timeout koneksi parsial dan paket korup.",
        "Robust scaling untuk mencegah pencilan ekstrem (outlier) mendominasi kalkulasi jarak Euclidean.",
        "Log transformation pada variabel yang berdistribusi heavy-tailed (misalnya durasi transfer file berukuran gigabyte)."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Deep Feature Extraction & Flow Profiling",
        description: "Menghitung 42 metrik statistik turunan per aliran komunikasi IP address, termasuk Forward/Backward inter-arrival times dan rasio byte per paket.",
        details: ["Identifikasi tanda tangan port scanning horizontal vs vertikal", "Analisis entropi payload untuk mendeteksi enkripsi tersembunyi"]
      },
      {
        phase: "Fase 2: Unsupervised Clustering (DBSCAN & Isolation Forest)",
        description: "Menggunakan DBSCAN untuk membentuk kluster padat lalu lintas normal (seperti browsing HTTP/HTTPS, panggilan VoIP, sinkronisasi database) dan menandai data di luar kepadatan sebagai kandidat anomali.",
        details: ["Penyetelan parameter epsilon menggunakan k-distance graph knee method", "Ensemble scoring: Isolation Forest anomaly score dikombinasikan dengan jarak cluster DBSCAN"]
      },
      {
        phase: "Fase 3: Validasi Forensik & Integrasi Produksi",
        description: "Melakukan inspeksi manual bersama Network Security Engineer terhadap anomali yang terdeteksi untuk memvalidasi serangan siber sesungguhnya.",
        details: ["Mendeteksi 12 insiden port scanning tersembunyi dan 3 aktivitas botnet C2 traffic", "Integrasi model ke daemon Linux server untuk continuous monitoring"]
      }
    ],
    interactiveType: "nids-clustering",
    codeSnippet: {
      language: "python",
      filename: "nids_clustering_engine.py",
      description: "Pipeline deteksi anomali aliran jaringan menggunakan Isolation Forest & DBSCAN",
      code: `import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import RobustScaler

class NIDSAnomalyDetector:
    def __init__(self, eps=0.65, min_samples=15):
        self.scaler = RobustScaler()
        self.iso_forest = IsolationForest(contamination=0.02, random_state=42, n_jobs=-1)
        self.dbscan = DBSCAN(eps=eps, min_samples=min_samples)
        
    def fit_predict(self, flow_features: np.ndarray):
        scaled_features = self.scaler.fit_transform(flow_features)
        
        # 1. Isolation Forest Anomaly Scoring
        iso_scores = self.iso_forest.fit(scaled_features).score_samples(scaled_features)
        
        # 2. DBSCAN Density Clustering (-1 menandakan noise/outlier)
        cluster_labels = self.dbscan.fit_predict(scaled_features)
        
        # Flagging: jika DBSCAN menganggap noise DAN isolation score sangat rendah
        is_attack = (cluster_labels == -1) & (iso_scores < np.percentile(iso_scores, 2))
        return {
            "cluster_labels": cluster_labels,
            "iso_scores": iso_scores,
            "flagged_attacks": np.where(is_attack)[0]
        }`
    },
    resultsAndImpact: [
      "Mengurangi beban peringatan palsu (False Positive Alerts) yang diterima tim SOC sebesar 68%, meningkatkan fokus pada ancaman nyata.",
      "Berhasil mengidentifikasi serangan brute-force SSH dan automated reconnaissance yang berhasil melewati firewall standar.",
      "Membuktikan keandalan model pada volume ratusan ribu traffic server operasional tanpa lonjakan CPU berlebih (< 12% utilization)."
    ],
    businessROI: "Pencegahan insiden downtime server bernilai kritis dan penghematan biaya lisensi solusi proprietary SIEM ratusan juta per tahun.",
    lessonsLearned: [
      "Parameter DBSCAN epsilon harus diadaptasi secara berkala (adaptive threshold) karena karakteristik traffic jam kerja berbeda drastis dengan malam hari.",
      "Preprocessing data traffic jaringan membutuhkan pemahaman mendalam tentang protokol TCP/IP, bukan sekadar algoritma ML generik."
    ],
    futureRoadmap: [
      "Implementasi Graph Neural Networks (GNN) untuk menganalisis topologi interaksi IP lateral movement di dalam intranet.",
      "Streaming inference langsung pada level eBPF Linux kernel untuk zero-copy packet processing."
    ]
  },
  {
    id: "proj-5",
  mathFormulas: [
    {
        "title": "Elastisitas Harga Permintaan (Price Elasticity of Demand)",
        "latex": "\\varepsilon_p = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\frac{\\partial Q}{\\partial P} \\cdot \\frac{P}{Q} = \\frac{\\partial \\ln Q}{\\partial \\ln P}",
        "explanation": "Mengukur sensitivitas perubahan kuantitas permintaan produk Q terhadap penyesuaian harga jual P dalam model regresi log-log.",
        "variables": [
            {
                "symbol": "\\varepsilon_p",
                "meaning": "Koefisien elastisitas (< -1 elastis, > -1 inelastis)"
            },
            {
                "symbol": "P",
                "meaning": "Harga jual unit produk"
            },
            {
                "symbol": "Q",
                "meaning": "Volume kuantitas terjual"
            }
        ]
    },
    {
        "title": "Optimasi Laba Bersih Tertarget (Profit Maximization)",
        "latex": "\\max_{P} \\Pi(P) = (P - c) \\cdot Q(P) \\implies P^* = \\frac{c \\cdot \\varepsilon_p}{1 + \\varepsilon_p}",
        "explanation": "Menurunkan harga optimum P* yang memaksimalkan marjin kontribusi laba Pi(P) berdasarkan biaya pokok c dan elastisitas terestimasi.",
        "variables": [
            {
                "symbol": "c",
                "meaning": "Cost of Goods Sold (COGS) / Biaya modal pokok per unit"
            },
            {
                "symbol": "P^*",
                "meaning": "Titik harga ekuilibrium matematis penghasil laba tertinggi"
            }
        ]
    }
],
  
    slug: "dynamic-pricing-demand-elasticity",
    title: "Dynamic Pricing & Demand Elasticity Optimization Engine",
    tagline: "Pemodelan Elastisitas Harga & Optimasi Margin E-Commerce dengan Causal Inference",
    category: "Operations & Analytics",
    readTime: "8 min read",
    date: "Agustus 2024",
    featured: false,
    shortDescription: "Mesin penetapan harga dinamis yang mengestimasi koefisien elastisitas harga permintaan (Price Elasticity of Demand) pada 1.200+ SKU ritel e-commerce untuk memaksimalkan laba kotor tanpa menurunkan volume penjualan inti.",
    techStack: ["Python", "Statsmodels", "SciPy Optimize", "BigQuery", "Double Machine Learning", "Plotly"],
    metrics: [
      { label: "Peningkatan Gross Margin", value: "+8.4%", change: "+$140k/bln", helper: "Pada kategori barang elastis tinggi" },
      { label: "Akurasi Estimasi Volume", value: "92.1%", change: "R-squared 0.84", helper: "Berdasarkan simulasi diskon" },
      { label: "Jumlah SKU Dinamis", value: "1,200+ Produk", change: "Multi-kategori", helper: "Elektronik, Fashion, FMCG" },
      { label: "Optimal Price Bounds", value: "Guardrail +-15%", change: "Aman", helper: "Mencegah price gouging reputasi" }
    ],
    executiveSummary: "Banyak peritel menentukan harga produk berdasarkan 'cost-plus 20%' yang kaku atau perang harga reaktif dengan kompetitor. Proyek ini mengimplementasikan Double Machine Learning (DML) untuk mengisolasi efek kausal perubahan harga terhadap kuantitas permintaan barang dengan mengontrol variabel pengganggu (promosi kompetitor, hari dalam bulan/gajian, dan posisi etalase).",
    businessProblem: "Produk dengan elastisitas harga tinggi (konsumen sensitif) sering dijual terlalu mahal sehingga menumpuk di gudang, sedangkan produk inelastis (konsumen tetap beli meski naik) sering diobral berlebihan sehingga membuang margin keuntungan.",
    challenges: [
      "Endogeneity problem: harga sering dinaikkan saat permintaan memang sedang tinggi (misal weekend), membuat korelasi sederhana terlihat positif menyesatkan.",
      "Keterbatasan stok gudang dan tanggal kadaluarsa produk yang membutuhkan dynamic markdown.",
      "Sensitivitas reputasi brand yang menuntut batas atas dan batas bawah deviasi harga (price guardrails)."
    ],
    architecture: {
      title: "Arsitektur Optimasi Elastisitas & Harga",
      flowDescription: "Data historis penjualan dan log scraping harga kompetitor dihubungkan ke model regresi kausal Log-Log. Algoritma Nonlinear Constrained Optimizer (SLSQP) menghitung titik harga rekomendasi yang memaksimalkan total margin.",
      nodes: [
        { step: 1, name: "Competitor Price & Sales ETL", desc: "Integrasi data transaksi internal dengan data perbandingan harga pasar", tool: "BigQuery / dbt" },
        { step: 2, name: "Causal Elasticity Estimator", desc: "Estimasi elastisitas per kluster produk menggunakan DML Residualization", tool: "EconML / Statsmodels" },
        { step: 3, name: "Constrained Profit Optimization", desc: "Maksimisasi fungsi: Profit = (P - Cost) * Q(P) dengan batasan min/max margin", tool: "SciPy Optimize" },
        { step: 4, name: "Inventory Expiry Modifier", desc: "Faktor penyesuaian akselerasi diskon otomatis untuk SKU yang mendekati kadaluarsa", tool: "Custom Heuristic" },
        { step: 5, name: "Pricing API & ERP Sync", desc: "Pengiriman pembaruan harga ke sistem kasir POS dan website marketplace", tool: "FastAPI / Kafka" }
      ]
    },
    dataset: {
      source: "Data Transaksi Multi-Marketplace Ritel & Scraped Competitor Price Logs (2022 - 2024)",
      volume: "1,200,000+ baris transaksi pesanan pada 1,200 SKU aktif",
      keyFeatures: ["product_id", "historical_price", "competitor_min_price", "units_sold", "cost_of_goods_sold", "is_payday_week", "inventory_age_days"],
      preprocessing: [
        "Transformasi logaritmik natural: log(Quantity) vs log(Price) untuk mengukur koefisien elastisitas konstan.",
        "Clustering K-Means untuk mengelompokkan produk slow-moving ke fast-moving guna membagi baseline elastisitas.",
        "Outlier handling pada transaksi bulk B2B yang mendistorsi perilaku konsumen ritel reguler."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Causal Inference & Elasticity Segmentation",
        description: "Menghitung nilai koefisien elastisitas (e). Produk dengan e < -1.5 dikategorikan elastis, sedangkan -1.0 < e < 0 dikategorikan inelastis.",
        details: ["Menggunakan Instrumental Variables (IV) berbasis harga input grosir", "Mencegah bias korelasi semu akhir pekan"]
      },
      {
        phase: "Fase 2: Mathematical Profit Function Formulation",
        description: "Merumuskan persamaan optimasi: max [ (P - COGS) * Q_base * (P / P_base)^elasticity ] dengan batasan bahwa P tidak boleh turun di bawah COGS + 3% dan tidak boleh naik di atas harga tertinggi kompetitor + 5%.",
        details: ["Penerapan algoritma Sequential Least Squares Programming (SLSQP)", "Validasi sensitivitas parameter konvergensi"]
      },
      {
        phase: "Fase 3: A/B Testing & Production Rollout",
        description: "Melakukan eksperimen A/B testing selama 6 minggu pada 200 SKU acak berpasangan (matched pairs) untuk memvalidasi uplift laba kotor sebelum peluncuran menyeluruh.",
        details: ["Uplift margin bersih sebesar +8.4% dengan p-value < 0.01", "Integrasi antarmuka tinjauan harga untuk Category Manager"]
      }
    ],
    interactiveType: "dynamic-pricing",
    codeSnippet: {
      language: "python",
      filename: "elasticity_optimizer.py",
      description: "Fungsi optimasi harga berdasarkan kurva elastisitas permintaan dan batasan margin",
      code: `import numpy as np
from scipy.optimize import minimize

def optimize_price(base_price: float, cogs: float, base_qty: float, elasticity: float, 
                   min_margin_pct=0.10, max_price_mult=1.20):
    """
    Fungsi memaksimalkan Profit = (P - COGS) * Q(P)
    di mana Q(P) = base_qty * (P / base_price) ** elasticity
    """
    def neg_profit(p):
        price = p[0]
        expected_qty = base_qty * ((price / base_price) ** elasticity)
        profit = (price - cogs) * expected_qty
        return -profit  # Minimalkan minus profit untuk mencapai maksimum

    min_price = max(cogs * (1 + min_margin_pct), base_price * 0.85)
    max_price = base_price * max_price_mult
    bounds = [(min_price, max_price)]
    
    res = minimize(neg_profit, x0=[base_price], bounds=bounds, method='SLSQP')
    opt_p = res.x[0]
    expected_qty = base_qty * ((opt_p / base_price) ** elasticity)
    return {
        "optimal_price": round(opt_p, -2),
        "expected_qty": int(expected_qty),
        "projected_profit": round((opt_p - cogs) * expected_qty, 0)
    }`
    },
    resultsAndImpact: [
      "Meningkatkan total Gross Margin sebesar 8.4% secara rata-rata di seluruh kategori produk uji coba.",
      "Mengurangi penumpukan stok barang lambat jual (aging inventory) hingga 22% melalui strategi markdown otomatis.",
      "Memberdayakan Category Manager dengan simulasi kurva 'What-If Price' instan sebelum memutuskan diskon kampanye bulanan."
    ],
    businessROI: "Menghasilkan tambahan profitabilitas kumulatif lebih dari $140,000 dalam 6 bulan masa operasional.",
    lessonsLearned: [
      "Mengubah harga terlalu sering (lebih dari 2x sehari) merusak kepercayaan pelanggan setia dan memicu komplain sosial media.",
      "Guardrail ketat berbasis margin minimum absolut mutlak diperlukan agar algoritma tidak salah merespons anomali sistem scraping."
    ],
    futureRoadmap: [
      "Menerapkan Reinforcement Learning (Contextual Bandits) untuk penetapan harga personalisasi non-diskriminatif berbasis loyalitas.",
      "Integrasi modul prakiraan cuaca instan untuk SKU minuman dingin dan payung."
    ]
  },
  {
    id: "proj-6",
  mathFormulas: [
    {
        "title": "Focal Loss untuk Klasifikasi Transaksi Fraud Ekstrem",
        "latex": "\\text{FL}(p_t) = -\\alpha_t (1 - p_t)^\\gamma \\log(p_t)",
        "explanation": "Fungsi kerugian terfokus yang mengurangi bobot gradien dari jutaan transaksi sah (easy negatives) dan memusatkan pembelajaran pada transaksi penipuan langka bernilai tinggi.",
        "variables": [
            {
                "symbol": "p_t",
                "meaning": "Probabilitas prediksi model terhadap kelas transaksi benar"
            },
            {
                "symbol": "\\gamma",
                "meaning": "Focusing parameter penekan contoh mudah (default gamma = 2.0)"
            },
            {
                "symbol": "\\alpha_t",
                "meaning": "Faktor penyeimbang proporsi kelas fraud (alpha = 0.75)"
            }
        ]
    },
    {
        "title": "Exponential Moving Average (EMA) Anomaly Z-Score",
        "latex": "z_t = \\frac{x_t - \\mu_t}{\\sqrt{\\sigma_t^2 + \\epsilon}}, \\quad \\mu_t = \\alpha x_t + (1 - \\alpha)\\mu_{t-1}",
        "explanation": "Deteksi anomali real-time streaming pada jendela mikro waktu geser untuk menandai lonjakan nominal transaksi di luar kebiasaan akun pemegang kartu.",
        "variables": [
            {
                "symbol": "x_t",
                "meaning": "Nominal transaksi pada timestamp t"
            },
            {
                "symbol": "\\mu_t",
                "meaning": "Rata-rata eksponensial bergerak profil historis pengguna"
            },
            {
                "symbol": "\\sigma_t",
                "meaning": "Standar deviasi varians transaksi berjalan"
            }
        ]
    }
],
  
    slug: "realtime-fraud-detection-spark-kafka",
    title: "End-to-End Real-Time Financial Fraud Detection Streaming Pipeline",
    tagline: "Pipeline Streaming Latensi Rendah (<45ms) Menggunakan Kafka, PySpark & Quantized LightGBM",
    category: "Data Engineering & Streaming",
    readTime: "9 min read",
    date: "Juli 2024",
    featured: false,
    shortDescription: "Arsitektur data streaming produksi berlatensi sub-50 milidetik yang memproses ratusan transaksi per detik untuk memblokir transaksi kartu pembayaran ilegal, pencurian identitas, dan anomali geolokasi mustahil (impossible travel).",
    techStack: ["Apache Kafka", "Apache Spark Streaming", "LightGBM", "Redis", "Docker", "PostgreSQL", "Python"],
    metrics: [
      { label: "End-to-End Latency", value: "38 ms", change: "SLA < 50ms", helper: "Mulai dari penerimaan event hingga keputusan" },
      { label: "PR-AUC Score", value: "0.992", change: "+14%", helper: "Pada rasio ketidakseimbangan kelas 0.17%" },
      { label: "Throughput Uji", value: "3,500 TPS", change: "High Concurrency", helper: "Transaksi per detik stabil" },
      { label: "Penyelamatan Dana", value: "$480k+", change: "Simulasi 6 Bulan", helper: "Fraud chargeback berhasil dicegah" }
    ],
    executiveSummary: "Pada transaksi perbankan dan fintech modern, penipuan harus dicegah *sebelum* transaksi diotorisasi oleh payment gateway. Menunggu batch processing harian berarti uang sudah ditarik oleh pelaku. Proyek ini membangun arsitektur streaming penuh: event ditangkap oleh Apache Kafka, diperkaya dengan stateful features di in-memory Redis, diskoring secara sub-second oleh quantized LightGBM model, dan disimpan ke audit trail PostgreSQL.",
    businessProblem: "Payment fraud mengakibatkan kerugian chargeback fee dan ancaman sanksi kepatuhan dari jaringan kartu pembayaran jika rasio fraud melebihi 0.9% dari total volume transaksi.",
    challenges: [
      "Distribusi kelas yang sangat ekstrem: dari 1.000 transaksi sah, umumnya hanya 1-2 yang merupakan penipuan.",
      "Kendala latensi ketat: evaluasi model machine learning tidak boleh menambah delay lebih dari 50 milidetik pada proses checkout pengguna.",
      "Kebutuhan fitur stateful real-time seperti: 'Berapa kali kartu ini digesek dalam 10 menit terakhir di kota yang berbeda?' (Impossible Travel)."
    ],
    architecture: {
      title: "Streaming Fraud Detection Data Flow",
      flowDescription: "Microservice transaksi mem-publish JSON payload ke Kafka topic 'tx-stream'. Spark Streaming membaca partisi, mengambil customer sliding-window velocity dari Redis, mengeksekusi model inference C-API, dan memicu webhook pemblokiran jika fraud score > 0.85.",
      nodes: [
        { step: 1, name: "Transaction Event Producer", desc: "Simulasi transaksi kartu kredit multi-kanal masuk ke broker streaming", tool: "Kafka Producer API" },
        { step: 2, name: "Stateful Enrichment Store", desc: "Lookup kecepatan transaksi, histori device fingerprint, dan geolokasi", tool: "Redis In-Memory Cache" },
        { step: 3, name: "PySpark Structured Streaming", desc: "Window aggregation (5m, 1h, 24h) dan parsing schema terstruktur", tool: "Apache Spark / Kafka" },
        { step: 4, name: "Quantized ML Inference Engine", desc: "Scoring probabilitas penipuan menggunakan model pohon keputusan optimal", tool: "ONNX / LightGBM" },
        { step: 5, name: "Automated Blocking & Analyst Review", desc: "Otorisasi instan, pemblokiran otomatis, atau challenge OTP 3D-Secure", tool: "FastAPI / Webhook" }
      ]
    },
    dataset: {
      source: "Kumpulan Data Transaksi Keuangan Sintetik Skala Besar + Benchmark ULB Fraud Dataset",
      volume: "2,840,000+ catatan transaksi keuangan terenkripsi",
      keyFeatures: ["tx_amount", "merchant_category_code", "geo_distance_km", "time_since_last_tx_sec", "velocity_tx_10min", "device_trust_score", "card_present_flag"],
      preprocessing: [
        "Focal Loss penalti untuk menangani ketidakseimbangan kelas ekstrem (0.17% fraud prevalence).",
        "Haversine distance calculation untuk mendeteksi pergerakan fisik yang tidak logis (misal Jakarta - Tokyo dalam 15 menit).",
        "Kompilasi model ke format ONNX Runtime untuk memangkas waktu komputasi inferensi menjadi < 3 ms per row."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Distributed Streaming Pipeline Engineering",
        description: "Menyiapkan Kafka cluster 3-broker dengan partisi berbasis user_id hash untuk menjamin urutan (in-order delivery) transaksi dari kartu yang sama.",
        details: ["Konfigurasi exact-once semantics di Spark Structured Streaming", "Penyimpanan state windowing di Redis cluster berlatensi < 1ms"]
      },
      {
        phase: "Fase 2: Feature Engineering on the Fly",
        description: "Mengembangkan 18 fitur dinamis termasuk rasio nominal transaksi terhadap rata-rata belanja historis pengguna (amount / avg_amount_30d).",
        details: ["Ekstraksi pola waktu midnight spending", "Deteksi lonjakan transaksi mikro berulang (card testing attacks)"]
      },
      {
        phase: "Fase 3: Multi-Tier Decision Logic & Model Deployment",
        description: "Mengimplementasikan sistem klasifikasi 3 tingkat: Score < 0.3 (Auto Approve), 0.3 - 0.8 (Trigger OTP / Biometrik), Score > 0.85 (Hard Block).",
        details: ["Threshold kalibrasi menggunakan Precision-Recall F-Beta (beta=0.5) untuk memprioritaskan presisi", "Audit logging ke database analitik untuk investigasi kepatuhan"]
      }
    ],
    interactiveType: "fraud-stream",
    codeSnippet: {
      language: "python",
      filename: "spark_streaming_fraud.py",
      description: "Spark Structured Streaming job membaca Kafka topic dan mengeksekusi fraud scoring",
      code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, expr
import redis

# Inisialisasi Spark Streaming Session
spark = SparkSession.builder \\
    .appName("RealtimeFraudPipeline") \\
    .config("spark.streaming.kafka.maxRatePerPartition", "1000") \\
    .getOrCreate()

# Membaca stream dari Kafka
kafka_stream = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "financial-tx-events") \\
    .load()

def evaluate_fraud_batch(df, epoch_id):
    # Eksekusi scoring batch mikro
    pdf = df.toPandas()
    if pdf.empty:
        return
    # Perhitungan impossible travel velocity dan inferensi model
    pdf['is_impossible_travel'] = (pdf['distance_km'] / (pdf['time_delta_sec'] / 3600.0)) > 900.0
    pdf['fraud_risk_score'] = (pdf['amount'] > 5000000) * 0.4 + pdf['is_impossible_travel'] * 0.6
    
    # Simpan hasil flag anomali
    suspicious = pdf[pdf['fraud_risk_score'] >= 0.8]
    print(f"[Epoch {epoch_id}] Transaksi diproses: {len(pdf)} | Terdeteksi Fraud: {len(suspicious)}")`
    },
    resultsAndImpact: [
      "Mencapai latensi menyeluruh 38 ms dari client touchpoint hingga keputusan otorisasi, jauh di bawah batas SLA perbankan (50 ms).",
      "Mendeteksi 94.8% percobaan card-not-present fraud dengan false-positive rate di bawah 0.08%.",
      "Menghemat estimasi dana chargeback sebesar $480,000 dalam simulasi komparatif 6 bulan terhadap sistem aturan statis."
    ],
    businessROI: "Penurunan biaya klaim sengketa penipuan (dispute costs) hingga 73% dan proteksi penuh terhadap reputasi keamanan merchant.",
    lessonsLearned: [
      "Koneksi jaringan antar Kafka broker dan Redis cluster harus berada dalam satu Availability Zone private cloud untuk menjaga latensi tetap sub-5ms.",
      "Fitur 'velocity 10 menit' jauh lebih prediktif terhadap penipuan kartu kredit daripada demografi pengguna."
    ],
    futureRoadmap: [
      "Mengembangkan model Graph Convolutional Network (GCN) untuk melacak jaringan sindikat penipuan terorganisir (mule accounts).",
      "Penerapan Federated Learning antar lembaga keuangan tanpa membocorkan data rahasia nasabah."
    ]
  },
  {
    id: "proj-7",
  mathFormulas: [
    {
        "title": "Safety Stock Stok Pengaman Berbasis Ketidakpastian Ganda",
        "latex": "\\text{SS} = Z_\\alpha \\cdot \\sqrt{\\bar{L} \\cdot \\sigma_D^2 + \\bar{D}^2 \\cdot \\sigma_L^2}",
        "explanation": "Kalkulasi matematis stok pengaman penyangga fluktuasi permintaan harian konsumen sekaligus keterlambatan waktu tunggu pengiriman pemasok pabrik.",
        "variables": [
            {
                "symbol": "Z_\\alpha",
                "meaning": "Skor Z distribusi normal sesuai tingkat layanan (Z = 1.96 untuk 97.5% Service Level)"
            },
            {
                "symbol": "\\bar{D}, \\sigma_D",
                "meaning": "Rata-rata dan standar deviasi permintaan harian"
            },
            {
                "symbol": "\\bar{L}, \\sigma_L",
                "meaning": "Rata-rata dan varians lead time pengiriman vendor (hari)"
            }
        ]
    },
    {
        "title": "Reorder Point (ROP) & Economic Order Quantity (EOQ)",
        "latex": "\\text{ROP} = (\\bar{D} \\times \\bar{L}) + \\text{SS}, \\qquad \\text{EOQ} = \\sqrt{\\frac{2 D S}{H}}",
        "explanation": "Titik ambang pemesanan ulang otomatis (ROP) dan jumlah kuantitas pemesanan ekonomis (EOQ) yang meminimalkan total biaya penyimpanan dan biaya pemesanan.",
        "variables": [
            {
                "symbol": "S",
                "meaning": "Biaya administrasi & logistik per satu kali pemesanan"
            },
            {
                "symbol": "H",
                "meaning": "Biaya penyimpanan gudang per unit barang per tahun"
            },
            {
                "symbol": "D",
                "meaning": "Total permintaan tahunan"
            }
        ]
    }
],
  
    slug: "supply-chain-inventory-stockout-optimization",
    title: "Multi-Echelon Supply Chain Stockout Prediction & Safety Stock Optimizer",
    tagline: "Peramalan Permintaan Intermiten & Optimasi Reorder Point Otomatis dengan BigQuery ML",
    category: "Operations & Analytics",
    readTime: "8 min read",
    date: "Juni 2024",
    featured: false,
    shortDescription: "Sistem analitik rantai pasok cerdas yang memprediksi risiko kehabisan stok (stockout) dan menghitung reorder point dinamis pada 8 gudang distribusi FMCG dengan memodelkan variabilitas lead time pemasok dan permintaan musiman.",
    techStack: ["Python", "BigQuery ML", "Monte Carlo Simulation", "Pandas", "Tableau", "SQL"],
    metrics: [
      { label: "Penurunan Stockout Incidents", value: "-46%", change: "Signifikan", helper: "Ketersediaan barang naik ke 98.4%" },
      { label: "Pengurangan Biaya Simpan", value: "Rp 420 Juta", change: "-18% Holding Cost", helper: "Mereduksi kelebihan stok (deadstock)" },
      { label: "Gudang Terkoneksi", value: "8 Hub Logistik", change: "Jawa & Sumatera", helper: "Sistem terpusat" },
      { label: "Akurasi Lead Time", value: "93.7%", change: "Simulasi Stokastik", helper: "Model distribusi Weibull" }
    ],
    executiveSummary: "Kehabisan stok barang di gudang distribusi menyebabkan potensi kehilangan penjualan jutaan rupiah, sementara kelebihan stok mengunci modal kerja (working capital) dan memicu biaya simpan tinggi. Proyek ini memodelkan rantai pasok multi-eselon dengan memprediksi pola permintaan tidak teratur (intermittent demand) menggunakan metode Croston / SBA serta simulasi Monte Carlo untuk menghitung Safety Stock dinamis berdasarkan keandalan lead time pemasok.",
    businessProblem: "Tim supply chain sering menggunakan rumus safety stock statis (misal 'stok untuk 2 minggu') yang tidak memperhitungkan variasi pengiriman kapal logistik antar-pulau dan lonjakan pesanan mendadak.",
    challenges: [
      "Banyak SKU suku cadang dan produk khusus memiliki permintaan intermiten (banyak periode nol pesanan diikuti pesanan besar tiba-tiba).",
      "Fluktuasi lead time supplier yang tidak berdistribusi normal (sering memiliki ekor panjang/fat-tailed delay).",
      "Keterbatasan kapasitas fisik gudang yang memerlukan optimasi alokasi ruang bersama."
    ],
    architecture: {
      title: "Pipeline Data Supply Chain & Optimasi Safety Stock",
      flowDescription: "Data inventaris dari ERP SAP diekstrak harian ke Google BigQuery. Model stochastic mengevaluasi distribusi probabilitas permintaan dan keterlambatan lead-time pemasok. Engine optimasi menghitung Reorder Point (ROP) harian dan mengirimkan daftar saran Purchase Order (PO) otomatis.",
      nodes: [
        { step: 1, name: "ERP & WMS Data Ingestion", desc: "Sinkronisasi saldo stok, transaksi keluar-masuk, dan PO terbuka", tool: "BigQuery Transfer / Cloud Storage" },
        { step: 2, name: "Demand Pattern Classification", desc: "Kategorisasi SKU menjadi Smooth, Intermittent, Erratic, atau Lumpy", tool: "SQL Window Functions" },
        { step: 3, name: "Croston & ARIMA Forecasting", desc: "Estimasi volume dan frekuensi kedatangan pesanan secara terpisah", tool: "BigQuery ML / Statsmodels" },
        { step: 4, name: "Monte Carlo Lead-Time Simulation", desc: "10.000 iterasi stokastik untuk menghitung Service Level 98%", tool: "NumPy / Python" },
        { step: 5, name: "Automated PO Suggestions", desc: "Dashboard rekomendasi pengadaan harian kepada Procurement Officer", tool: "Tableau / Web Portal" }
      ]
    },
    dataset: {
      source: "Data ERP Logistik Distribusi FMCG Multi-Gudang (2021 - 2024)",
      volume: "650,000+ baris mutasi stok pada 3,400 SKU di 8 gudang regional",
      keyFeatures: ["warehouse_id", "sku_code", "current_stock", "daily_demand", "supplier_id", "promised_lead_days", "actual_lead_days", "unit_cost"],
      preprocessing: [
        "Pemisahan pesanan promosi khusus dari permintaan organik reguler.",
        "Pemodelan distribusi keterlambatan pemasok menggunakan distribusi Gamma dan Lognormal.",
        "Perhitungan Average Inter-Demand Interval (ADI) dan Square Coefficient of Variation (CV²)."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Syntetos-Boylan Demand Profiling",
        description: "Memetakan semua SKU ke dalam matriks ADI-CV2. Produk intermiten dialihkan dari pemodelan moving average biasa ke algoritma Croston Syntetos-Boylan Approximation (SBA) untuk menghindari bias over-forecasting.",
        details: ["Threshold ADI > 1.32 sebagai penanda intermiten", "Pengurangan bias estimasi demand hingga 28%"]
      },
      {
        phase: "Fase 2: Stochastic Monte Carlo Simulation for Safety Stock",
        description: "Menghitung Safety Stock bukan dengan rumus baku Z * sigma_L * sigma_D, melainkan menjalankan 10.000 simulasi sampling acak dari distribusi empiris lead time dan demand harian guna menemukan titik reorder yang menjamin target Service Level 98%.",
        details: ["Mengakomodasi risiko fat-tail supply disruption", "Perhitungan Economic Order Quantity (EOQ) dinamis"]
      },
      {
        phase: "Fase 3: Enterprise Reporting & Alert Triggers",
        description: "Membangun visualisasi interaktif di Tableau yang membagi status stok ke dalam 3 zona: 'Kritis/Reorder Segera' (merah), 'Optimal' (hijau), dan 'Kelebihan/Overstock' (kuning).",
        details: ["Integrasi automated email digest ke tim procurement harian", "Pengukuran Fill Rate KPI bulanan"]
      }
    ],
    interactiveType: "supply-chain",
    codeSnippet: {
      language: "python",
      filename: "safety_stock_sim.py",
      description: "Simulasi Monte Carlo untuk menghitung Reorder Point dengan probabilitas stockout < 2%",
      code: `import numpy as np

def calculate_dynamic_rop(historical_demand: np.ndarray, historical_lead_days: np.ndarray, 
                          service_level: float = 0.98, n_simulations: int = 10000):
    """
    Simulasi Monte Carlo untuk menentukan Reorder Point (ROP)
    saat demand dan lead time keduanya bervariasi secara stokastik.
    """
    # 1. Bootstrapping sampling lead time
    sampled_lead_times = np.random.choice(historical_lead_days, size=n_simulations, replace=True)
    
    lead_time_demands = np.zeros(n_simulations)
    for i in range(n_simulations):
        lt = int(np.ceil(sampled_lead_times[i]))
        # Sampling total demand selama periode lead time
        daily_d = np.random.choice(historical_demand, size=lt, replace=True)
        lead_time_demands[i] = np.sum(daily_d)
        
    # Reorder point adalah persentil sesuai service level
    rop = np.percentile(lead_time_demands, service_level * 100)
    avg_demand = np.mean(historical_demand)
    avg_lt = np.mean(historical_lead_days)
    safety_stock = rop - (avg_demand * avg_lt)
    
    return {
        "reorder_point": int(np.ceil(rop)),
        "safety_stock": int(np.ceil(max(0, safety_stock))),
        "avg_lead_time_days": round(avg_lt, 1)
    }`
    },
    resultsAndImpact: [
      "Menekan insiden kehabisan stok (stockouts) sebesar 46%, mendongkrak order fulfillment rate dari 91.2% ke 98.4%.",
      "Memangkas biaya simpan barang menumpuk (holding costs) sebesar Rp 420 Juta per tahun melalui eliminasi deadstock berlebih.",
      "Mengurangi waktu manual tim perencana persediaan barang dalam menyusun Purchase Order dari 6 jam menjadi 30 menit per hari."
    ],
    businessROI: "Peningkatan pendapatan akibat terpenuhinya pesanan pelanggan yang sebelumnya hilang (unfulfilled orders) senilai Rp 850 Juta.",
    lessonsLearned: [
      "Memperlakukan semua supplier dengan asumsi lead-time yang sama adalah kesalahan fatal dalam perencanaan stok gudang luar pulau.",
      "Simulasi stokastik non-parametrik jauh lebih akurat daripada rumus safety stock baku berbasis distribusi normal."
    ],
    futureRoadmap: [
      "Menghubungkan sistem rekomendasi stok dengan API tracking kapal kontainer logistik secara real-time.",
      "Optimasi rute transfer antar-gudang (cross-docking balance) untuk menghindari pengadaan dari pemasok baru."
    ]
  },
  {
    id: "proj-8",
  mathFormulas: [
    {
        "title": "Distribusi Probabilitas Softmax Klasifikasi Token BioBERT",
        "latex": "P(y_i = c \\mid \\mathbf{h}_i) = \\frac{\\exp(\\mathbf{w}_c^T \\mathbf{h}_i + b_c)}{\\sum_{k=1}^C \\exp(\\mathbf{w}_k^T \\mathbf{h}_i + b_k)}",
        "explanation": "Probabilitas token teks klinis i berlabel entitas medis c (Diagnosis, Obat, Dosis) berdasarkan representasi vektor kontekstual lapisan teratas Transformer h_i.",
        "variables": [
            {
                "symbol": "\\mathbf{h}_i",
                "meaning": "Vektor hidden-state output BioBERT untuk token posisi i"
            },
            {
                "symbol": "\\mathbf{w}_c, b_c",
                "meaning": "Bobot proyeksi linier dan bias untuk kelas entitas medis c"
            },
            {
                "symbol": "C",
                "meaning": "Jumlah total label BIO (B-Disease, I-Disease, B-Drug, O)"
            }
        ]
    },
    {
        "title": "Micro-Averaged Strict Boundary F1-Score",
        "latex": "F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\sum_{c=1}^C \\text{TP}_c}{2 \\sum_{c=1}^C \\text{TP}_c + \\sum_{c=1}^C \\text{FP}_c + \\sum_{c=1}^C \\text{FN}_c}",
        "explanation": "Metrik pengujian ketat batas span entitas medis di mana prediksi dianggap benar hanya jika offset karakter awal, karakter akhir, dan tipe entitas cocok sempurna dengan anotasi dokter.",
        "variables": [
            {
                "symbol": "\\text{TP}_c",
                "meaning": "True Positive: span batas dan jenis entitas cocok sempurna"
            },
            {
                "symbol": "\\text{FP}_c",
                "meaning": "False Positive: deteksi entitas salah atau batas span meleset"
            },
            {
                "symbol": "\\text{FN}_c",
                "meaning": "False Negative: entitas klinis nyata yang terlewat oleh model"
            }
        ]
    }
],
  
    slug: "clinical-patient-readmission-nlp-scoring",
    title: "Healthcare Patient Readmission Risk Scoring & Clinical NLP",
    tagline: "Prediksi Risiko Readmisi 30 Hari Memadukan Rekam Medis Elektronik (EHR) & BioBERT Clinical Text",
    category: "GenAI & NLP",
    readTime: "9 min read",
    date: "April 2024",
    featured: false,
    shortDescription: "Model kecerdasan buatan klinis yang memprediksi kemungkinan pasien rawat inap kembali masuk rumah sakit dalam 30 hari pasca pulang dengan memadukan data terstruktur laboratorium dan ekstraksi entitas klinis dari catatan perawat/dokter menggunakan BioBERT.",
    techStack: ["Python", "BioBERT / Transformers", "CatBoost", "Scikit-learn", "FastAPI", "SHAP", "PostgreSQL"],
    metrics: [
      { label: "C-Statistic / ROC-AUC", value: "0.852", change: "+21%", helper: "vs Skor Klinis LACE Konvensional" },
      { label: "Sensitivity @ Top Risk", value: "84.3%", change: "High Recall", helper: "Mendeteksi pasien paling rentan" },
      { label: "Inference Latency", value: "110 ms", change: "GPU/CPU", helper: "Saat pembuatan surat resume medis" },
      { label: "Intervensi Sukses", value: "140 Pasien", change: "Studi Uji", helper: "Mencegah komplikasi pasca rawat" }
    ],
    executiveSummary: "Readmisi pasien rawat inap dalam 30 hari adalah indikator utama kualitas layanan kesehatan rumah sakit dan pemicu penalti biaya asuransi. Sebagian besar informasi kritis kondisi pasien sebenarnya tersembunyi dalam catatan naratif bebas (discharge summaries) yang tidak terindeks dalam tabel laboratorium standar. Proyek ini menggabungkan model transformer klinis (BioBERT) untuk mengekstrak komorbiditas tersembunyi dan menggabungkannya dengan CatBoost classifier terkalibrasi.",
    businessProblem: "Dokter dan case manager kesulitan meninjau riwayat medis puluhan halaman sebelum memulangkan pasien, menyebabkan pasien berisiko tinggi pulang tanpa rencana perawatan lanjutan yang memadai.",
    challenges: [
      "Teks klinis penuh singkatan medis lokal, jargon dokter, dan typo yang membingungkan parser NLP biasa.",
      "Kebutuhan kalibrasi probabilitas yang sangat ketat (Platt Scaling) karena skor probabilitas digunakan langsung untuk alokasi kunjungan perawat ke rumah.",
      "Privasi data medis pasien yang menuntut zero-data leakage (kepatuhan standar HIPAA/privasi kesehatan)."
    ],
    architecture: {
      title: "Arsitektur Multimodal Clinical Risk Scoring",
      flowDescription: "Catatan kepulangan pasien (unstructured discharge text) diproses oleh BioBERT untuk mengekstrak embedding semantik dan entitas klinis. Fitur teks ini digabungkan dengan data terstruktur EHR (lama rawat, hasil lab, riwayat kunjungan IGD), lalu diskor oleh CatBoost terkalibrasi.",
      nodes: [
        { step: 1, name: "EHR Ingestion & De-identification", desc: "Anonimisasi data pasien (penghapusan nama, nomor rekam medis) sebelum diproses", tool: "Python / Presidio" },
        { step: 2, name: "Clinical NLP Entity & Embedding", desc: "Ekstraksi entitas penyakit (komorbiditas) dan embedding vektor representasi klinis", tool: "BioBERT / HuggingFace" },
        { step: 3, name: "Multimodal Feature Merging", desc: "Penggabungan fitur numerik lab, demografi usia, dan fitur semantik teks", tool: "Pandas / NumPy" },
        { step: 4, name: "Calibrated CatBoost Classifier", desc: "Prediksi probabilitas 30-day readmission dengan Isotonic Regression calibration", tool: "CatBoost / Scikit-learn" },
        { step: 5, name: "Care Coordinator Triage Alert", desc: "Rekomendasi tindak lanjut: telemonitoring, penjadwalan kontrol H+3, atau home care", tool: "EHR Integration API" }
      ]
    },
    dataset: {
      source: "MIMIC-III / IV Clinical Database & Data Rekam Medis Rawat Inap (Di-anonimkan)",
      volume: "48,000+ episode rawat inap pasien dewasa dengan catatan kepulangan lengkap",
      keyFeatures: ["admission_type", "length_of_stay_days", "charlson_comorbidity_index", "lab_creatinine_max", "lab_hemoglobin_min", "num_prior_admissions_1yr", "clinical_note_embedding_768d"],
      preprocessing: [
        "Pembersihan header boilerplate rumah sakit dan tanda tangan digital dokter dari teks narasi.",
        "Penanganan nilai hilang pada hasil uji laboratorium menggunakan k-NN Imputer.",
        "Stratifikasi pembagian train-validation-test berdasarkan ID pasien unik (mencegah data leakage antar kunjungan)."
      ]
    },
    methodology: [
      {
        phase: "Fase 1: Clinical Domain NLP Extraction",
        description: "Menggunakan pre-trained BioBERT untuk mengekstraksi representasi semantik dari bagian 'Hospital Course' dan 'Discharge Condition' dalam ringkasan medis.",
        details: ["Fine-tuning klasifikasi entitas medis gejala tak terselesaikan", "Reduksi dimensi embedding teks menjadi 32 komponen representatif"]
      },
      {
        phase: "Fase 2: Multimodal CatBoost Modeling with Class Balance",
        description: "Melatih CatBoost classifier yang menangani variabel kategorikal secara native dan mengoptimalkan log-loss dengan bobot kelas adaptif.",
        details: ["Menambahkan indeks komorbiditas Charlson sebagai baseline klinis", "Kalibrasi probabilitas menggunakan Isotonic Regression untuk interpretasi risiko riil"]
      },
      {
        phase: "Fase 3: Clinical Explainability & Workflow Triage",
        description: "Menghasilkan ringkasan faktor risiko pasien yang dapat dibaca dokter (misal: 'Pasien memiliki risiko 68% readmisi dipicu oleh penurunan hemoglobin drastis dan ketiadaan pendamping di rumah').",
        details: ["Integrasi visual scorecard risiko di sistem rumah sakit", "Evaluasi Brier Score untuk memastikan ketelitian kalibrasi"]
      }
    ],
    interactiveType: "clinical-nlp",
    codeSnippet: {
      language: "python",
      filename: "clinical_readmission_scorer.py",
      description: "Pipeline penggabungan fitur terstruktur EHR dan embedding NLP untuk scoring risiko medis",
      code: `import numpy as np
from catboost import CatBoostClassifier
from sklearn.calibration import CalibratedClassifierCV

class PatientRiskScorer:
    def __init__(self, model_path=None):
        self.base_model = CatBoostClassifier(
            iterations=500,
            learning_rate=0.03,
            depth=6,
            eval_metric='AUC',
            verbose=False
        )
        self.calibrated_model = None

    def fit(self, X_train, y_train, X_val, y_val):
        self.base_model.fit(X_train, y_train, eval_set=(X_val, y_val))
        # Kalibrasi probabilitas Isotonic agar persentase mencerminkan frekuensi empiris
        self.calibrated_model = CalibratedClassifierCV(self.base_model, cv='prefit', method='isotonic')
        self.calibrated_model.fit(X_val, y_val)

    def predict_patient_triage(self, patient_vector: np.ndarray):
        prob = self.calibrated_model.predict_proba(patient_vector)[0, 1]
        triage_level = "HIGH RISK" if prob >= 0.55 else ("MODERATE" if prob >= 0.30 else "LOW RISK")
        return {
            "readmission_risk_percent": round(prob * 100, 1),
            "triage_category": triage_level,
            "recommended_action": "Jadwalkan Tele-Visit H+3 & Kunjungan Perawat" if triage_level == "HIGH RISK" else "Kontrol Poli Reguler H+7"
        }`
    },
    resultsAndImpact: [
      "Meningkatkan skor C-Statistic (ROC-AUC) dari 0.704 (indeks LACE manual) menjadi 0.852 dengan memadukan data catatan teks perawat.",
      "Mengidentifikasi 84.3% pasien berisiko tinggi sebelum pasien meninggalkan rumah sakit, memungkinkan intervensi pencegahan dini.",
      "Mencegah perkiraan readmisi pada 140+ pasien rawat inap dalam fase uji klinis 6 bulan, meningkatkan angka kepuasan pasien."
    ],
    businessROI: "Pengurangan biaya penalti readmisi asuransi serta utilisasi tempat tidur rawat inap rumah sakit bernilai efisiensi tinggi.",
    lessonsLearned: [
      "Catatan singkat dari perawat seringkali mencatat faktor sosial (misal: 'pasien tinggal sendiri tanpa keluarga') yang jauh lebih krusial daripada hasil tes darah.",
      "Model klinis harus terkalibrasi dengan baik: jika model memprediksi risiko 40%, tepat 40 dari 100 pasien memang harus mengalami readmisi."
    ],
    futureRoadmap: [
      "Integrasi speech-to-text pada saat dokter visit untuk memperbarui skor risiko secara real-time di samping tempat tidur.",
      "Pengembangan explainable counterfactuals untuk menyarankan modifikasi terapi obat yang dapat menurunkan risiko readmisi."
    ]
  }
];
