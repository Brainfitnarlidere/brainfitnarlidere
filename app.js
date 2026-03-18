// ===== SUPABASE CONFIGURATION =====
// Replace these with your actual Supabase project URL and Anon Key
const SUPABASE_URL = 'https://nthegxecvlonzzlleltn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aGVneGVjdmxvbnp6bGxlbHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4Mzk0NTQsImV4cCI6MjA4OTQxNTQ1NH0.pGnDJMxPo9qgApXs8reTzKd6wqj8EQi9nz-LrXOevzM';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const EMAIL_KEY = 'bf_email_captured_v1';
const FALLBACK = {
  social: {
    badges: ["Harvard & Stanford Onaylı Egzersizler", "160.000+ katılımcı", "20+ yıllık deneyim", "İzmir merkezli uzman ekip"],
    quotes: [
      { "text": "Oğlumun dikkati 6. haftada belirgin şekilde arttı; öğretmeni fark etti.", "name": "Ayşe K.", "role": "İlkokul velisi" },
      { "text": "Üniversite sınavı hazırlığında odak sürem 2 katına çıktı.", "name": "Mert D.", "role": "12. sınıf öğrenci" },
      { "text": "Disleksi desteği sayesinde okuma hızı ve özgüveni gözle görülür şekilde yükseldi.", "name": "Selin T.", "role": "5. sınıf velisi" },
      { "text": "Online seanslarla bile oğlumun planlama becerileri ve hafızası belirginleşti.", "name": "Mehmet A.", "role": "8. sınıf velisi" },
      { "text": "İşitme hassasiyeti olan kızım için kişiselleştirilmiş egzersizler büyük rahatlık sağladı.", "name": "Derya L.", "role": "Lise velisi" },
      { "text": "Koçumuz haftalık geri bildirimlerle bizi çok iyi yönlendirdi; kaygı seviyesi düştü.", "name": "Burcu E.", "role": "11. sınıf velisi" },
      { "text": "Haftada iki seansla odaklanma süresi uzadı, ödevlere direnç azaldı.", "name": "İlker S.", "role": "4. sınıf velisi" },
      { "text": "Dikkat egzersizleri sonrası sınavda süre yönetimi çok iyileşti.", "name": "Gizem Y.", "role": "YKS velisi" },
      { "text": "Küçük yaşta başladık, el-göz koordinasyonu ve dil gelişimi hızlandı.", "name": "Esra B.", "role": "Okul öncesi velisi" },
      { "text": "Takip raporları sayesinde evde ne yapacağımızı net biliyoruz; süreç şeffaf.", "name": "Hakan T.", "role": "7. sınıf velisi" }
    ]
  },
  problems: [
    "Ders çalışırken hızla dikkat dağılıyor",
    "Okuduğunu anlamada ve hafızada zorluk",
    "Sınav ve sunumlarda stres/özgüven sorunu",
    "Psikomotor koordinasyon ve el yazısı güçlüğü",
    "Dikkat eksikliği nedeniyle bildiği halde yanlış yapıyor"
  ],
  programs: [
    { "name": "Brainfit Baby Programı", "ages": "0-3 yaş", "benefits": ["Erken beyin gelişimi uyarımı", "Duyusal motor beceriler", "Motor beceri gelişimi", "Ebeveyn rehberliği", "Dil gelişimi"], "cta": "Bilgi Al" },
    { "name": "Brainfit Scholar Programı", "ages": "4-99 yaş", "benefits": ["Dikkat eksikliği çözümü", "Okuduğunu anlama & hız", "Odaklanma süresi + sınav kaygısı yönetiminde artış", "Ev ödevinde bağımsızlık", "Dikkat ve Odaklanma Gelişimi"], "cta": "Bilgi Al" }
  ],
  process: [
    "Zihin Check-Up: dikkat, motor, duygusal & işitsel/görsel tarama",
    "Kişisel egzersiz planı: 4 aylık, haftada 2 seans",
    "Takip ve haftalık geri bildirim",
    "Ölçme - değerlendirme ve gözle görülür değişimler"
  ],
  faq: [
    { "q": "Çocuğum neden derslerde motivasyonsuz görünüyor?", "a": "Sıklıkla başarısızlık korkusu, dikkat/ hafıza zayıflıkları veya ekran kaynaklı bilişsel yorgunluk rol oynar; önce kök nedeni görmek için bilişsel profil çıkarıyoruz." },
    { "q": "İçsel ve dışsal motivasyon farkı ne?", "a": "İçsel motivasyon merak ve öğrenme isteğinden, dışsal motivasyon ödül/not gibi etkenlerden gelir; dengesi kalıcı başarı sağlar." },
    { "q": "İlkokula hazır mı, nasıl anlarım?", "a": "Rutinleri takip edebilme, duygularını yönetme, kısa süre odaklanma ve akran iletişimi temel göstergelerdir; emin değilseniz CognitiveMAP ile netleştiriyoruz." },
    { "q": "Okula hazırlığa ne zaman başlamalıyım?", "a": "Okul öncesi yıllar en verimli dönem; BrainFit Baby ve Scholar programları oyun temelli nöro-egzersizlerle temeli güçlendirir." },
    { "q": "CognitiveMAP nedir?", "a": "Görsel, işitsel, dikkat-hafıza, sensori-motor ve duygu düzenleme alanlarında beyin performans haritası çıkarır, kişiselleştirilmiş planı belirler." },
    { "q": "Utangaç çocuk okulda zorlanır mı?", "a": "Zorunlu değil; sosyal rol oyunları, hikâye anlatma ve duygu kelime hazinesi çalışmaları adaptasyonu hızlandırır." }
  ]
};

// ===== CONTENT LOADING =====
async function loadContent() {
  try {
    const res = await fetch('./content.json');
    if (!res.ok) throw new Error('Content fetch failed');
    const data = await res.json();

    if (data.social?.badges) hydrateBadges(data.social.badges);
    if (data.social?.quotes) hydrateQuotes(data.social.quotes);
    if (data.problems) hydrateProblems(data.problems);
    if (data.programs) hydratePrograms(data.programs);
    if (data.process) hydrateProcess(data.process);
    if (data.faq) hydrateFaq(data.faq);
    if (data.programs) hydrateDatalist(data.programs);

    console.log('İçerik başarıyla yüklendi.');
  } catch (e) {
    console.error('İçerik yüklenemedi, fallback kullanılacak', e);
    const data = FALLBACK;
    hydrateBadges(data.social.badges);
    hydrateQuotes(data.social.quotes);
    hydrateProblems(data.problems);
    hydratePrograms(data.programs);
    hydrateProcess(data.process);
    hydrateFaq(data.faq);
    hydrateDatalist(data.programs);
  }
}

function hydrateBadges(badges) {
  const row = document.getElementById('badges');
  row.innerHTML = '';
  badges.forEach(text => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = text;
    row.appendChild(span);
  });
}

function hydrateQuotes(quotes) {
  const grid = document.getElementById('quotes');
  if (!grid) return;
  grid.innerHTML = '';
  quotes.forEach(q => {
    const div = document.createElement('div');
    div.className = 'quote';
    div.innerHTML = `<p>"${q.text}"</p><div class="name">${q.name}</div><div class="role">${q.role}</div>`;
    grid.appendChild(div);
  });
}

function hydrateProblems(problems) {
  const row = document.getElementById('problems');
  if (!row) return;
  row.innerHTML = '';
  problems.forEach(p => {
    const span = document.createElement('span');
    span.className = 'pill';
    span.textContent = p;
    row.appendChild(span);
  });
}

function hydratePrograms(programs) {
  const grid = document.getElementById('programGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const iconMap = {
    'Brainfit Baby Programı': './images/baby_bw.png?v=2',
    'Brainfit Scholar Programı': './images/baby-icon.webp?v=2',
    'Zihin Check-Up: dikkat, motor, duygusal & işitsel/görsel tarama': './images/zihin-checkup.png?v=2'
  };
  programs.forEach(p => {
    const card = document.createElement('div');
    card.className = 'program';
    card.innerHTML = `
      <div class="program-head">
        <div class="program-icon-wrap">
          <img class="program-icon" src="${iconMap[p.name] || './scholar-icon.svg'}" alt="${p.name} ikonu" />
        </div>
        <div>
          <div class="ages">${p.ages}</div>
          <h3>${p.name}</h3>
        </div>
      </div>
      <ul>${p.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
      <a class="ghost" href="#lead">${p.cta}</a>
    `;
    grid.appendChild(card);
  });
}

function hydrateProcess(steps) {
  const list = document.getElementById('process');
  if (!list) return;
  list.innerHTML = '';
  const icons = [
    `<svg viewBox="0 0 24 24"><path d="M9 12h1m4 0h1m-6 3h1m4 0h1M8 5a4 4 0 0 1 8 0v1a4 4 0 0 1 2 3.464V11a8 8 0 0 1-8 8 8 8 0 0 1-8-8v-1.536A4 4 0 0 1 8 6V5Z"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M9 5h6M9 9h6M9 13h4M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 0 3 3m-3-3-3 3M12 2v2m0 16v2m8-10h2M2 12h2m15.657-5.657-1.414 1.414M7.757 16.243l-1.414 1.414m0-12.728 1.414 1.414m11.486 11.486-1.414-1.414"/></svg>`,
    `<svg viewBox="0 0 24 24"><path d="M4 19h16M6 17V7m4 10V5m4 12V9m4 10v-6"/></svg>`
  ];
  steps.forEach((step, idx) => {
    const li = document.createElement('li');
    const iconWrap = document.createElement('div');
    iconWrap.className = 'process-icon';
    if (idx === 0) {
      iconWrap.innerHTML = `<img src="./images/zihin-checkup.png?v=2" style="width: 80%; height: 80%; object-fit: contain;">`;
    } else {
      iconWrap.innerHTML = icons[idx % icons.length];
    }
    const text = document.createElement('div');
    text.className = 'process-text';
    text.innerHTML = step;
    li.appendChild(iconWrap);
    li.appendChild(text);
    list.appendChild(li);
  });
}

function hydrateFaq(items) {
  const list = document.getElementById('faq');
  if (!list) return;
  list.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `<h4>${item.q}</h4><p>${item.a}</p>`;
    list.appendChild(div);
  });
}

function hydrateDatalist(programs) {
  const dl = document.getElementById('programOptions');
  if (!dl) return;
  dl.innerHTML = '';
  programs.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    dl.appendChild(opt);
  });
}

// ===== PHONE FORMATTING =====
function formatPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  const p1 = d.slice(0, 4); // 05xx
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);
  return [p1, p2, p3, p4].filter(Boolean).join(' ').trim();
}

// ===== FORM SUBMISSION =====
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Validasyon: KVKK onayları
  const consentBox = form.querySelector('input[name="kvkk"]');
  const consentBox2 = form.querySelector('input[name="kvkk_notice"]');

  if (!consentBox?.checked || !consentBox2?.checked) {
    alert('Lütfen KVKK ve Aydınlatma onaylarını işaretleyin.');
    return;
  }

  // Validasyon: Telefon numarası
  if (!form.phone.value || form.phone.value.replace(/\D/g, '').length !== 11) {
    alert('Lütfen 11 haneli telefon numaranızı (05xx ...) girin.');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Gönderiliyor...';

  // Payload for custom backend
  const payload = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    city: form.city.value,
    applicant_type: form.applicantType.value
  };

  try {
    // 1. Send to Supabase
    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .insert([payload]);

      if (error) {
        throw error;
      }
    } else {
      throw new Error('Supabase client not initialized');
    }

    // Success
    form.hidden = true;
    document.getElementById('thankyou').hidden = false;
    
  } catch (err) {
    console.error('Form error:', err);
    alert('Hata: ' + err.message + '\nLütfen tekrar deneyin.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Formu Gönder';
  }
}

// ===== EMAIL MODAL =====
function showEmailModal() {
  const modal = document.getElementById('emailModal');
  if (!modal) return;
  modal.hidden = false;
}

function hideEmailModal() {
  const modal = document.getElementById('emailModal');
  if (modal) modal.hidden = true;
}

async function handleEmailCapture(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  if (!email) return;
  try {
    if (supabase) {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email }]);

      if (error) throw error;
    } else {
      console.warn('Supabase client not initialized');
    }

    localStorage.setItem(EMAIL_KEY, '1');
    hideEmailModal();
  } catch (err) {
    console.error('Email capture error:', err);
    alert('E-posta kaydedilemedi, lütfen tekrar deneyin.');
  }
}

// ===== VIDEO EMBED =====
document.querySelectorAll('.video-thumb').forEach(thumb => {
  thumb.addEventListener('click', function (e) {
    e.preventDefault();
    const videoUrl = this.getAttribute('href');

    let videoId = '';
    const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=))([^#&?]*)/);
    if (match && match[1].length === 11) {
      videoId = match[1];
    }

    if (!videoId) return;

    this.innerHTML = `
      <iframe 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  });
});

// ===== DOM READY =====
window.addEventListener('DOMContentLoaded', () => {
  // Email modal diagnostic
  console.log('Pop-up kontrolü yapılıyor...');
  if (!localStorage.getItem(EMAIL_KEY)) {
    console.log('Pop-up 0.6s içinde açılacak...');
    setTimeout(() => {
      console.log('Pop-up açma fonksiyonu tetiklendi.');
      showEmailModal();
    }, 600);
  } else {
    console.log('Pop-up engellendi: Daha önce görülmüş (Local Storage).');
  }
  const emailForm = document.getElementById('emailCaptureForm');
  const modalClose = document.getElementById('modalClose');
  emailForm?.addEventListener('submit', handleEmailCapture);
  modalClose?.addEventListener('click', hideEmailModal);

  // Lead form - Formspree gönderimi
  const leadForm = document.getElementById('leadForm');
  leadForm?.addEventListener('submit', handleFormSubmit);

  // Phone formatting
  const phoneInput = document.getElementById('phoneInput');
  phoneInput?.addEventListener('input', (ev) => {
    const formatted = formatPhone(ev.target.value);
    ev.target.value = formatted;
    ev.target.setSelectionRange(formatted.length, formatted.length);
  });

  // Testimonial slider
  const testimonials = [
    {
      text: `Brainfit ailesiyle tanışmamız nasıl oldu biliyor musunuz? Oğlum 4 yaşındaydı. Hayatımızdaki dönüm noktalarından... Çocuğunu isteyerek doğurup dünyaya getiren anneler, çocuklarına çok emek verirler. Çocuğunuz küçükken ona yapacağınız dokunuşlarla ne kadar ileriye gideceğine tanık oluyorsunuz. İşte bunların en başında geliyor Brainfit ailesi. İyi ki varsınız. İyi ki sizleri tanıdım. Oğlum şimdi burslu bir okulda okuyor. Tam 11 yaşında. Teşekkürler.`,
      author: 'Bayan MD, 11 yaşındaki çocuğun annesi.'
    },
    {
      text: `Brainfit'le tanıştığımızda kızım ilkokuldaydı. Akademik ve sosyal açıdan sıkıntılar yaşıyorduk. Brainfit ile birlikte çok yol katettik. Brainfit'in bize ilk kazandırdığı şey sorumluluk. Kızımı daha önce derslerine oturtamazken Brainfit'ten sonra derslerini yapmadan uyumaz oldu farkındalığı arttı. Şimdi 6. sınıfa geçti matematik en sevdiği dersler arasında. Brainfit + Aile = Mutlu Başarılı Çocuk 🤗 Teşekkürler Brainfit Ailesi sizi seviyoruz ❤️`,
      author: 'Bayan FS, 11 yaşındaki çocuğun annesi.'
    }
  ];

  let tIndex = 0;
  const tText = document.getElementById('testimonialText');
  const tAuthor = document.getElementById('testimonialAuthor');
  const nextBtn = document.getElementById('nextTestimonial');
  const prevBtn = document.getElementById('prevTestimonial');
  const dotsContainer = document.getElementById('testimonialDots');

  function renderTestimonial(idx) {
    if (!tText || !tAuthor || !dotsContainer) return;
    tText.style.opacity = 0;
    setTimeout(() => {
      tText.textContent = testimonials[idx].text;
      tAuthor.textContent = testimonials[idx].author;
      tText.style.opacity = 1;
    }, 200);

    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `dot ${i === idx ? 'active' : ''}`;
      dot.onclick = () => { tIndex = i; renderTestimonial(tIndex); };
      dotsContainer.appendChild(dot);
    });
  }

  renderTestimonial(tIndex);

  nextBtn?.addEventListener('click', () => {
    tIndex = (tIndex + 1) % testimonials.length;
    renderTestimonial(tIndex);
  });

  prevBtn?.addEventListener('click', () => {
    tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(tIndex);
  });
});

loadContent();
