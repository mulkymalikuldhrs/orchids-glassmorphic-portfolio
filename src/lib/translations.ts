
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
      skills: "Technical Maintenance · Multimedia Design · AI & Web3 Enthusiast",
      philosophy: "Solo. Deliberate. Long-term.",
      cta: "Talk to Mulky (AI)",
    },
    about: {
      title: "About",
      description1: "I work on systems.",
      description1_sub: "Bridging the gap between industrial systems and digital intelligence.",
      description2: "I work with precision.",
      description2_sub: "From high-pressure industrial panels to the logic of AI agents.",
      description3: "Building for the long term requires a certain kind of restraint. With over 3 years in industrial operations and a background in multimedia, I choose to build gravity fields—nodes where logic and systems meet human intent.",
      philosophy_title: "Philosophy",
      philosophy_desc: "Aceh Subtle: Tenang, keras di dalam. Futuristic restraint in every interaction and every line of code.",
      interests_title: "Interests",
      interests_desc: "Web3, AI, Technical Maintenance, Multimedia Design, and Industrial Systems.",
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
          title: "Industrial Logic Monitor",
          description: "Conceptual dashboard for monitoring industrial panel efficiency using AI-driven insights.",
          problem: "Manual monitoring of high-pressure systems is prone to human error.",
          whyInteresting: "Blends maintenance engineering experience with modern data visualization.",
          status: "Conceptual / Research",
          category: "Conceptual",
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
          title: "Maintenance Mindset",
          type: "Framework",
          content: "Prevention is better than cure. This applies to industrial machinery, software architecture, and personal growth.",
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
        placeholder: "Ask about methodology, projects, or background...",
        disclaimer: "Artificial Intelligence. Response may vary.",
        inputLabel: "Message Mulky's AI",
        initialMessage: "I am Mulky's AI Companion. I honestly explain Mulky's thinking, industrial background, and life direction. What would you like to know?",
        defaultResponse: "I need a moment to reflect on that. Generally, Mulky always prioritizes systems and long-term logic over momentary trends.",
        knowledge: [
          {
            keywords: ["who", "mulky", "identity"],
            response: "Mulky is a maintenance engineer and system builder from Aceh. He has over 3 years of experience in industrial operations and a strong background in multimedia and IT."
          },
          {
            keywords: ["experience", "work", "job"],
            response: "Mulky currently works as a Maintenance Technician & Panel Operator at PT Yoga Wibawa Mandiri (Packing Plant Semen Padang). He previously worked in freight administration and customer service in Malaysia."
          },
          {
            keywords: ["aceh", "origin"],
            response: "Mulky is from Lhokseumawe, Aceh. The philosophy of 'Aceh Subtle'—calm on the outside, hard on the inside—is the foundation of his work: futuristic restraint."
          },
          {
            keywords: ["skills", "technical", "stack"],
            response: "His skills range from industrial maintenance and troubleshooting to multimedia design (Adobe Creative Suite) and IT systems (Linux, Ethical Hacking)."
          },
          {
            keywords: ["contact", "email", "instagram", "github"],
            response: "You can find Mulky on GitHub (@mulkymalikuldhrs), Instagram (@mulkymalikuldhr), or reach out via email at mulkymalikuldhr@mail.com."
          },
          {
            keywords: ["education", "study"],
            response: "Mulky studied Multimedia at SMK Negeri 2 Lhokseumawe and previously pursued Electrical Engineering at Universitas Malikussaleh."
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
        skills: "Pemeliharaan Teknis · Desain Multimedia · Antusias AI & Web3",
        philosophy: "Solo. Terukur. Jangka panjang.",
        cta: "Bicara dengan Mulky (AI)",
      },
      about: {
        title: "Tentang",
        description1: "Saya bekerja pada sistem.",
        description1_sub: "Menjembatani celah antara sistem industri dan kecerdasan digital.",
        description2: "Saya bekerja dengan presisi.",
        description2_sub: "Dari panel industri tekanan tinggi hingga logika agen AI.",
        description3: "Membangun untuk jangka panjang membutuhkan semacam pengendalian diri. Dengan pengalaman lebih dari 3 tahun di operasional industri dan latar belakang multimedia, saya memilih membangun medan gravitasi—titik temu antara logika dan sistem dengan niat manusia.",
        philosophy_title: "Filosofi",
        philosophy_desc: "Aceh Subtle: Tenang, keras di dalam. Pengendalian diri futuristik dalam setiap interaksi dan setiap baris kode.",
        interests_title: "Minat",
        interests_desc: "Web3, AI, Pemeliharaan Teknis, Desain Multimedia, dan Sistem Industri.",
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
            title: "Industrial Logic Monitor",
            description: "Dashboard konseptual untuk memantau efisiensi panel industri menggunakan wawasan berbasis AI.",
            problem: "Pemantauan manual sistem tekanan tinggi rentan terhadap kesalahan manusia.",
            whyInteresting: "Memadukan pengalaman pemeliharaan teknik dengan visualisasi data modern.",
            status: "Konseptual / Riset",
            category: "Conceptual",
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
            title: "Mindset Pemeliharaan",
            type: "Kerangka Kerja",
            content: "Mencegah lebih baik daripada mengobati. Ini berlaku untuk mesin industri, arsitektur perangkat lunak, dan pertumbuhan pribadi.",
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
        placeholder: "Tanyakan tentang latar belakang atau visi Mulky...",
        disclaimer: "Kecerdasan Buatan. Respons mungkin bervariasi.",
        inputLabel: "Pesan AI Mulky",
        initialMessage: "Aku adalah AI Companion Mulky. Aku menjelaskan latar belakang industri, cara berpikir, dan arah hidup Mulky dengan jujur. Apa yang ingin kamu ketahui?",
        defaultResponse: "Aku butuh waktu untuk merenungkan itu. Secara umum, Mulky selalu mengedepankan sistem dan logika jangka panjang daripada tren sesaat.",
        knowledge: [
          {
            keywords: ["siapa", "mulky", "identitas"],
            response: "Mulky adalah seorang teknisi pemeliharaan dan pembangun sistem dari Aceh. Ia memiliki pengalaman lebih dari 3 tahun di operasional industri dan latar belakang kuat di multimedia serta IT."
          },
          {
            keywords: ["pengalaman", "kerja", "kerjaan"],
            response: "Mulky saat ini bekerja sebagai Teknisi Pemeliharaan & Operator Panel di PT Yoga Wibawa Mandiri (Packing Plant Semen Padang). Sebelumnya ia bekerja di administrasi pengangkutan dan layanan pelanggan di Malaysia."
          },
          {
            keywords: ["aceh", "asal"],
            response: "Mulky berasal dari Lhokseumawe, Aceh. Filosofi 'Aceh Subtle'—tenang di luar, keras di dalam—menjadi landasan karyanya: futuristic restraint."
          },
          {
            keywords: ["skill", "keahlian", "teknis"],
            response: "Keahliannya mencakup pemeliharaan industri dan pemecahan masalah hingga desain multimedia (Adobe Creative Suite) dan sistem IT (Linux, Ethical Hacking)."
          },
          {
            keywords: ["kontak", "email", "instagram", "github"],
            response: "Kamu bisa menemukan Mulky di GitHub (@mulkymalikuldhrs), Instagram (@mulkymalikuldhr), atau hubungi melalui email di mulkymalikuldhr@mail.com."
          },
          {
            keywords: ["pendidikan", "sekolah", "kuliah"],
            response: "Mulky menempuh pendidikan Multimedia di SMK Negeri 2 Lhokseumawe dan sebelumnya sempat menempuh Teknik Elektro di Universitas Malikussaleh."
          }
        ]
      }
    }
};
