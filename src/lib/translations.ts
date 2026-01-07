
export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      home: "Index",
      about: "About",
      projects: "Projects",
      thinking: "Thinking",
      talkToAi: "AI",
    },
    home: {
      hero_sub: "Building systems, not noise.",
      skills: "Beginner in FX Markets · AI Agent Enthusiasm · Decision Logic",
      philosophy: "Solo. Deliberate. Long-term.",
      cta: "Talk to Mulky (AI)",
    },
    about: {
      title: "About",
      description1: "I work on systems.",
      description1_sub: "Sometimes software. Sometimes markets. Sometimes just thinking clearly.",
      description2: "I don’t move fast.",
      description2_sub: "I move deliberately.",
      description3: "Building for the long term requires a certain kind of restraint. In a world of noise, I choose to build gravity fields—nodes where logic and systems meet human intent.",
      philosophy_title: "Philosophy",
      philosophy_desc: "Aceh Subtle: Tenang, keras di dalam. Futuristic restraint in every interaction and every line of code.",
      interests_title: "Interests",
      interests_desc: "Decision Logic, AI Agent Swarms, Quantitative FX Trading, and System Thinking.",
      view_path: "View Professional Path",
    },
    projects: {
      title: "Projects",
      subtitle: "Real work, honest status. Divided into active systems, ongoing builds, and conceptual research.",
      view_project: "View Project",
      items: [
        {
          title: "System Logic Explorer",
          description: "A framework for mapping complex decision paths in automated systems.",
          problem: "Non-linear decision trees often lead to unpredictable agent behavior.",
          whyInteresting: "Uses recursive logic nodes to ensure system stability.",
          status: "Active / Core System",
          category: "Live",
        },
        {
          title: "FX Agent Pro",
          description: "Quantitative trading agent designed for the FX markets with a focus on risk management.",
          problem: "Market noise overwhelms standard technical indicators.",
          whyInteresting: "Implements proprietary decision logic to filter high-probability setups.",
          status: "WIP / Alpha Testing",
          category: "In Progress",
        },
        {
          title: "Aceh Subtle Design",
          description: "A design system based on the philosophy of 'futuristic restraint' and cultural grounding.",
          problem: "Modern portfolios are becoming increasingly flashy and interchangeable.",
          whyInteresting: "Blends futuristic aesthetics with minimal, deliberate interactions.",
          status: "Conceptual / Prototype",
          category: "Conceptual",
        }
      ]
    },
    thinking: {
      title: "Thinking",
      subtitle: "Mini-insights and frameworks. Not routine, but high density.",
      items: [
        {
          title: "Gravity vs. Noise",
          type: "Insight",
          content: "Building systems that attract the right people (gravity) is 10x more effective than shouting to find anyone (noise).",
        },
        {
          title: "Decision Logic Layer",
          type: "Framework",
          content: "Separate the intent from the execution. Let the agent handle the 'how', but the human defines the 'why' through rigid system constraints.",
        },
        {
          title: "Solo Builder System",
          type: "System Note",
          content: "The bottleneck of a solo builder is not code—it's decision fatigue. Automate the low-level choices to preserve high-level intuition.",
        },
        {
          title: "Futuristic Restraint",
          type: "Design Logic",
          content: "Luxury is not adding more features, but removing everything that isn't essential until only the soul of the system remains.",
        },
        {
          title: "Long-term Node",
          type: "Network Effect",
          content: "Don't compete for attention. Compete for reliability. In the long run, the most stable nodes become the foundation for everyone else.",
        }
      ]
    },
    ai: {
      title: "AI Companion",
      subtitle: "Not a cheesy chatbot. A digital companion & interpreter to understand Mulky's way of thinking.",
      placeholder: "Ask about methodology, projects, or market logic...",
      disclaimer: "Artificial Intelligence. Response may vary.",
      inputLabel: "Message Mulky's AI",
      initialMessage: "I am Mulky's AI Companion. I don't sell anything. I honestly explain Mulky's thinking, projects, and life direction. What would you like to know?",
      defaultResponse: "I need a moment to reflect on that. Generally, Mulky always prioritizes systems and long-term logic over momentary trends.",
      knowledge: [
        {
          keywords: ["who", "mulky", "identity"],
          response: "Mulky is a system builder, not a noise maker. He focuses on decision logic, FX markets, and AI agent development with a long-term approach."
        },
        {
          keywords: ["project", "work", "doing"],
          response: "Currently, Mulky is exploring Quantitative Trading and Decision Logic. You can see his projects in the Projects section, divided into Live, In Progress, and Conceptual."
        },
        {
          keywords: ["aceh", "origin"],
          response: "Mulky is from Aceh. The philosophy of 'Aceh Subtle'—calm on the outside, hard on the inside—is the foundation of his work: futuristic restraint."
        }
      ]
    }
  },
  id: {
    nav: {
      home: "Indeks",
      about: "Tentang",
      projects: "Proyek",
      thinking: "Pemikiran",
      talkToAi: "AI",
    },
    home: {
      hero_sub: "Membangun sistem, bukan kebisingan.",
      skills: "Pemula di Pasar FX · Antusiasme AI Agent · Logika Keputusan",
      philosophy: "Solo. Terukur. Jangka panjang.",
      cta: "Bicara dengan Mulky (AI)",
    },
    about: {
      title: "Tentang",
      description1: "Saya bekerja pada sistem.",
      description1_sub: "Terkadang perangkat lunak. Terkadang pasar. Terkadang hanya berpikir jernih.",
      description2: "Saya tidak bergerak cepat.",
      description2_sub: "Saya bergerak dengan terukur.",
      description3: "Membangun untuk jangka panjang membutuhkan semacam pengendalian diri. Di dunia yang penuh kebisingan, saya memilih untuk membangun medan gravitasi—titik temu antara logika dan sistem dengan niat manusia.",
      philosophy_title: "Filosofi",
      philosophy_desc: "Aceh Subtle: Tenang, keras di dalam. Pengendalian diri futuristik dalam setiap interaksi dan setiap baris kode.",
      interests_title: "Minat",
      interests_desc: "Logika Keputusan, AI Agent Swarms, Perdagangan FX Kuantitatif, dan Pemikiran Sistem.",
      view_path: "Lihat Jalur Profesional",
    },
    projects: {
      title: "Proyek",
      subtitle: "Pekerjaan nyata, status jujur. Dibagi menjadi sistem aktif, pengembangan berjalan, dan riset konseptual.",
      view_project: "Lihat Proyek",
      items: [
        {
          title: "System Logic Explorer",
          description: "Kerangka kerja untuk memetakan jalur keputusan kompleks dalam sistem otomatis.",
          problem: "Pohon keputusan non-linear seringkali menyebabkan perilaku agen yang tidak terduga.",
          whyInteresting: "Menggunakan node logika rekursif untuk memastikan stabilitas sistem.",
          status: "Aktif / Sistem Inti",
          category: "Live",
        },
        {
          title: "FX Agent Pro",
          description: "Agen perdagangan kuantitatif yang dirancang untuk pasar FX dengan fokus pada manajemen risiko.",
          problem: "Kebisingan pasar mengalahkan indikator teknis standar.",
          whyInteresting: "Mengimplementasikan logika keputusan eksklusif untuk menyaring pengaturan probabilitas tinggi.",
          status: "WIP / Pengujian Alpha",
          category: "In Progress",
        },
        {
          title: "Aceh Subtle Design",
          description: "Sistem desain berdasarkan filosofi 'pengendalian diri futuristik' dan landasan budaya.",
          problem: "Portofolio modern menjadi semakin mencolok dan dapat dipertukarkan.",
          whyInteresting: "Memadukan estetika futuristik dengan interaksi minimal yang terukur.",
          status: "Konseptual / Prototipe",
          category: "Conceptual",
        }
      ]
    },
    thinking: {
      title: "Pemikiran",
      subtitle: "Wawasan mini dan kerangka kerja. Bukan rutinitas, tetapi kepadatan tinggi.",
      items: [
        {
          title: "Gravitasi vs Kebisingan",
          type: "Wawasan",
          content: "Membangun sistem yang menarik orang yang tepat (gravitasi) 10x lebih efektif daripada berteriak untuk menemukan siapa pun (kebisingan).",
        },
        {
          title: "Lapisan Logika Keputusan",
          type: "Kerangka Kerja",
          content: "Pisahkan niat dari eksekusi. Biarkan agen menangani 'bagaimana', tetapi manusia menentukan 'mengapa' melalui batasan sistem yang kaku.",
        },
        {
          title: "Sistem Solo Builder",
          type: "Catatan Sistem",
          content: "Hambatan dari seorang pembangun solo bukanlah kode—melainkan kelelahan keputusan. Otomatiskan pilihan tingkat rendah untuk menjaga intuisi tingkat tinggi.",
        },
        {
          title: "Pengendalian Diri Futuristik",
          type: "Logika Desain",
          content: "Kemewahan bukan tentang menambahkan lebih banyak fitur, tetapi menghapus segala sesuatu yang tidak esensial hingga hanya tersisa jiwa dari sistem tersebut.",
        },
        {
          title: "Node Jangka Panjang",
          type: "Efek Jaringan",
          content: "Jangan bersaing untuk perhatian. Bersaing untuk keandalan. Dalam jangka panjang, node yang paling stabil menjadi fondasi bagi orang lain.",
        }
      ]
    },
    ai: {
      title: "Pendamping AI",
      subtitle: "Bukan chatbot norak. Digital companion & interpreter untuk memahami cara berpikir Mulky.",
      placeholder: "Tanyakan tentang sistem atau visi Mulky...",
      disclaimer: "Kecerdasan Buatan. Respons mungkin bervariasi.",
      inputLabel: "Pesan AI Mulky",
      initialMessage: "Aku adalah AI Companion Mulky. Aku tidak menjual apa pun. Aku menjelaskan cara berpikir, proyek, dan arah hidup Mulky dengan jujur. Apa yang ingin kamu ketahui?",
      defaultResponse: "Aku butuh waktu untuk merenungkan itu. Secara umum, Mulky selalu mengedepankan sistem dan logika jangka panjang daripada tren sesaat.",
      knowledge: [
        {
          keywords: ["siapa", "mulky", "identitas"],
          response: "Mulky adalah seorang pembangun sistem, bukan pembuat kebisingan. Ia fokus pada logika keputusan, pasar FX, dan pengembangan agen AI dengan pendekatan jangka panjang."
        },
        {
          keywords: ["proyek", "kerjaan", "ngapain"],
          response: "Saat ini Mulky sedang mengeksplorasi Quantitative Trading dan Decision Logic. Proyek-proyeknya bisa kamu lihat di bagian Projects, yang dibagi menjadi Live, In Progress, dan Konseptual."
        },
        {
          keywords: ["aceh", "asal"],
          response: "Mulky berasal dari Aceh. Filosofi 'Aceh Subtle'—tenang di luar, keras di dalam—menjadi landasan karyanya: futuristic restraint."
        }
      ]
    }
  }
};
