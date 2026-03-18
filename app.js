// ===== BRAINFIT APP: FINAL RELIABILITY V5 =====
console.log("BrainFit: Script booting...");

// 1. DATA (SITE_DATA for grid, TESTIMONIALS for slider)
var SITE_DATA = {
  social: {
    badges: ["Harvard & Stanford Onaylı Egzersizler", "160.000+ katılımcı", "20+ yıllık deneyim", "İzmir merkezli uzman ekip"],
    quotes: [
      { text: "Oğlumun dikkati 6. haftada belirgin şekilde arttı; öğretmeni fark etti.", name: "Ayşe K.", role: "İlkokul velisi" },
      { text: "Üniversite sınavı hazırlığında odak sürem 2 katına çıktı.", name: "Mert D.", role: "12. sınıf öğrenci" },
      { text: "Disleksi desteği sayesinde okuma hızı ve özgüveni gözle görülür şekilde yükseldi.", name: "Selin T.", role: "5. sınıf velisi" },
      { text: "Online seanslarla bile oğlumun planlama becerileri ve hafızası belirginleşti.", name: "Mehmet A.", role: "8. sınıf velisi" },
      { text: "İşitme hassasiyeti olan kızım için kişiselleştirilmiş egzersizler büyük rahatlık sağladı.", name: "Derya L.", role: "Lise velisi" },
      { text: "Koçumuz haftalık geri bildirimlerle bizi çok iyi yönlendirdi; kaygı seviyesi düştü.", name: "Burcu E.", role: "11. sınıf velisi" },
      { text: "Haftada iki seansla odaklanma süresi uzadı, ödevlere direnç azaldı.", name: "İlker S.", role: "4. sınıf velisi" },
      { text: "Dikkat egzersizleri sonrası sınavda süre yönetimi çok iyileşti.", name: "Gizem Y.", role: "YKS velisi" },
      { text: "Küçük yaşta başladık, el-göz koordinasyonu ve dil gelişimi hızlandı.", name: "Esra B.", role: "Okul öncesi velisi" },
      { text: "Takip raporları sayesinde evde ne yapacağımızı net biliyoruz; süreç şeffaf.", name: "Hakan T.", role: "7. sınıf velisi" }
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
    { name: "Brainfit Baby Programı", ages: "0-3 yaş", benefits: ["Erken beyin gelişimi uyarımı", "Duyusal motor beceriler", "Motor beceri gelişimi", "Ebeveyn rehberliği", "Dil gelişimi"], cta: "Bilgi Al" },
    { name: "Brainfit Scholar Programı", ages: "4-99 yaş", benefits: ["Dikkat eksikliği çözümü", "Okuduğunu anlama & hız", "Odaklanma süresi + sınav kaygısı yönetiminde artış", "Ev ödevinde bağımsızlık", "Dikkat ve Odaklanma Gelişimi"], cta: "Bilgi Al" }
  ],
  process: [
    "Zihin Check-Up: <br>dikkat, motor, duygusal & işitsel/görsel tarama",
    "Kişisel egzersiz planı: <br>4 aylık, haftada 2 seans",
    "Takip ve haftalık geri bildirim",
    "Ölçme - değerlendirme ve gözle görülür değişimler"
  ],
  faq: [
    { q: "Çocuğum neden derslerde motivasyonsuz görünüyor?", a: "Sıklıkla başarısızlık korkusu, dikkat/ hafıza zayıflıkları veya ekran kaynaklı bilişsel yorgunluk rol oynar." },
    { q: "İçsel ve dışsal motivasyon farkı ne?", a: "İçsel motivasyon merak ve öğrenme isteğinden, dışsal motivasyon ödül/not gibi etkenlerden gelir." },
    { q: "İlkokula hazır mı, nasıl anlarım?", a: "Rutinleri takip edebilme, duygularını yönetme, kısa süre odaklanma temel göstergelerdir." },
    { q: "Okula hazırlığa ne zaman başlamalıyım?", a: "Okul öncesi yıllar en verimli dönemdir." },
    { q: "CognitiveMAP nedir?", a: "Beyin performans haritası çıkarır, kişiselleştirilmiş planı belirler." },
    { q: "Utangaç çocuk okulda zorlanır mı?", a: "Zorunlu değil; sosyal rol oyunları ve duygu kelime hazinesi adaptasyonu hızlandırır." }
  ]
};

// 2. LONG TESTIMONIALS (Restored the 2 long original ones)
var TESTIMONIALS = [
  { 
    text: "Brainfit ailesiyle tanışmamız nasıl oldu biliyor musunuz? Oğlum 4 yaşındaydı. Hayatımızdaki dönüm noktalarından... Çocuğunu isteyerek doğurup dünyaya getiren anneler, çocuklarına çok emek verirler. Çocuğunuz küçükken ona yapacağınız dokunuşlarla ne kadar ileriye gideceğine tanık oluyorsunuz. İşte bunların en başında geliyor Brainfit ailesi. İyi ki varsınız. İyi ki sizleri tanıdım. Oğlum şimdi burslu bir okulda okuyor. Tam 11 yaşında. Teşekkürler.", 
    name: "Bayan MD", 
    role: "11 yaşındaki çocuğun annesi." 
  },
  { 
    text: "Brainfit’le tanıştığımızda kızım ilkokuldaydı. Akademik ve sosyal açıdan sıkıntılar yaşıyorduk. Brainfit ile birlikte çok yol katettik. Brainfit’in bize ilk kazandırdığı şey sorumluluk. Kızımı daha önce derslerine oturtamazken Brainfit’ten sonra derslerini yapmadan uyumaz oldu farkındalığı arttı. Şimdi 6. sınıfa geçti matematik en sevdiği dersler arasında. Brainfit + Aile = Mutlu Başarılı Çocuk 🤗 Teşekkürler Brainfit Ailesi sizi seviyoruz ❤️", 
    name: "Bayan FS", 
    role: "İlkokul velisi" 
  }
];

// 3. CONFIG
var SUPABASE_URL = 'https://nthegxecvlonzzlleltn.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aGVneGVjdmxvbnp6bGxlbHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4Mzk0NTQsImV4cCI6MjA4OTQxNTQ1NH0.pGnDJMxPo9qgApXs8reTzKd6wqj8EQi9nz-LrXOevzM';
var EMAIL_KEY = 'bf_email_captured_v1';
var supabase_client = null;

function getSB() {
  if (supabase_client) return supabase_client;
  if (window.supabase) {
    try {
      supabase_client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return supabase_client;
    } catch (e) { console.error("Supabase init error:", e); }
  }
  return null;
}

// 4. HYDRATION ENGINE
function hydrate() {
  console.log("BrainFit: Hydration start.");
  var d = SITE_DATA;

  // Badges
  var bRow = document.getElementById('badges');
  if (bRow) {
    bRow.innerHTML = '';
    for (var i=0; i<d.social.badges.length; i++) {
        var span = document.createElement('span');
        span.className = 'badge';
        span.textContent = d.social.badges[i];
        bRow.appendChild(span);
    }
  }

  // Social Grid (The 10 short quotes)
  var qGrid = document.getElementById('quotes');
  if (qGrid) {
    qGrid.innerHTML = '';
    for (var j=0; j<d.social.quotes.length; j++) {
        var q = d.social.quotes[j];
        var div = document.createElement('div');
        div.className = 'quote';
        div.innerHTML = '<p>"' + q.text + '"</p><div class="name">' + q.name + '</div><div class="role">' + q.role + '</div>';
        qGrid.appendChild(div);
    }
  }

  // Problems
  var pRow = document.getElementById('problems');
  if (pRow) {
    pRow.innerHTML = '';
    for (var k=0; k<d.problems.length; k++) {
        var ps = document.createElement('span');
        ps.className = 'pill';
        ps.textContent = d.problems[k];
        pRow.appendChild(ps);
    }
  }

  // Programs
  var pGrid = document.getElementById('programGrid');
  if (pGrid) {
    pGrid.innerHTML = '';
    var iconMap = {
      'Brainfit Baby Programı': 'images/baby_bw.png',
      'Brainfit Scholar Programı': 'images/baby-icon.webp'
    };
    for (var l=0; l<d.programs.length; l++) {
        var prog = d.programs[l];
        var card = document.createElement('div');
        card.className = 'program';
        var html = '<div class="program-head">';
        html += '<div class="program-icon-wrap"><img class="program-icon" src="' + (iconMap[prog.name] || 'images/baby-icon.webp') + '" /></div>';
        html += '<div><div class="ages">' + prog.ages + '</div><h3>' + prog.name + '</h3></div></div>';
        html += '<ul>' + prog.benefits.map(function(b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
        html += '<a class="ghost" href="#lead">' + prog.cta + '</a>';
        card.innerHTML = html;
        pGrid.appendChild(card);
    }
  }

  // Process
  var prList = document.getElementById('process');
  if (prList) {
    prList.innerHTML = '';
    var icons = [
      '<img src="images/zihin-checkup.png" style="width:80%; height:80%; object-fit:contain;">',
      '<svg viewBox="0 0 24 24" width="32" height="32"><path d="M9 5h6M9 9h6M9 13h4M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      '<svg viewBox="0 0 24 24" width="32" height="32"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 0 3 3m-3-3-3 3M12 2v2m0 16v2m8-10h2M2 12h2m15.657-5.657-1.414 1.414M7.757 16.243l-1.414 1.414m0-12.728 1.414 1.414m11.486 11.486-1.414-1.414" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      '<svg viewBox="0 0 24 24" width="32" height="32"><path d="M4 19h16M6 17V7m4 10V5m4 12V9m4 10v-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
    ];
    for (var n=0; n<d.process.length; n++) {
        var li = document.createElement('li');
        li.innerHTML = '<div class="process-icon">' + icons[n] + '</div><div class="process-text">' + d.process[n] + '</div>';
        prList.appendChild(li);
    }
  }
  
  // SSS / FAQ
  var faq = document.getElementById('faq');
  if (faq && d.faq) {
    faq.innerHTML = '';
    for (var y=0; y<d.faq.length; y++) {
        var item = d.faq[y];
        var div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = '<h4>' + item.q + '</h4><p>' + item.a + '</p>';
        faq.appendChild(div);
    }
  }
  
  console.log("BrainFit: Hydration complete.");
}

// 5. UTILS & HANDLERS
function formatPh(val) {
  var digits = val.replace(/\D/g, '').slice(0, 11);
  var p = [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)];
  return p.filter(function(x){ return x; }).join(' ').trim();
}

async function onFormSub(e) {
  e.preventDefault();
  var f = e.target;
  var c1 = f.querySelector('input[name="kvkk"]');
  var c2 = f.querySelector('input[name="kvkk_notice"]');
  if (!c1.checked || !c2.checked) { alert('Lütfen tüm onay kutularını işaretleyin.'); return; }
  var phVal = f.phone.value.replace(/\D/g, '');
  if (phVal.length !== 11) { alert('Lütfen 11 haneli telefon numaranızı girin (05xx)'); return; }
  var btn = f.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }
  var payload = { name: f.name.value, phone: f.phone.value, email: f.email.value, city: f.city.value, applicant_type: f.applicantType.value };
  try {
    var sb = getSB();
    if (sb) {
      var res = await sb.from('leads').insert([payload]);
      if (res.error) throw res.error;
      f.hidden = true;
      var ty = document.getElementById('thankyou');
      if (ty) ty.hidden = false;
    } else { throw new Error('No SB'); }
  } catch (err) { console.error(err); alert('Hata oluştu.'); if (btn) { btn.disabled = false; btn.textContent = 'Formu Gönder'; } }
}

// 6. BOOT & SLIDER
function boot() {
  console.log("BrainFit: Booting...");
  hydrate();

  // Testimonial Slider (Only the 2 long ones)
  var tIdx = 0;
  var txt = document.getElementById('testimonialText');
  var auth = document.getElementById('testimonialAuthor');
  var dts = document.getElementById('testimonialDots');
  function updateT(idx) {
    if (!txt || !auth || !dts) return;
    txt.textContent = TESTIMONIALS[idx].text;
    auth.textContent = TESTIMONIALS[idx].name + " - " + TESTIMONIALS[idx].role;
    dts.innerHTML = '';
    for (var i=0; i<TESTIMONIALS.length; i++) {
        var dot = document.createElement('div');
        dot.className = 'dot' + (i === idx ? ' active' : '');
        dot.onclick = (function(ii) { return function() { tIdx = ii; updateT(tIdx); }; })(i);
        dts.appendChild(dot);
    }
  }
  updateT(tIdx);
  if (document.getElementById('nextTestimonial')) document.getElementById('nextTestimonial').onclick = function() { tIdx = (tIdx + 1) % TESTIMONIALS.length; updateT(tIdx); };
  if (document.getElementById('prevTestimonial')) document.getElementById('prevTestimonial').onclick = function() { tIdx = (tIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length; updateT(tIdx); };

  // Other listeners
  var ph = document.getElementById('phoneInput');
  if (ph) ph.addEventListener('input', function(e) { e.target.value = formatPh(e.target.value); });
  if (document.getElementById('leadForm')) document.getElementById('leadForm').addEventListener('submit', onFormSub);
  
  if (!localStorage.getItem(EMAIL_KEY)) {
    setTimeout(function() { if (document.getElementById('emailModal')) document.getElementById('emailModal').hidden = false; }, 1500);
  }
  if (document.getElementById('modalClose')) document.getElementById('modalClose').onclick = function() { document.getElementById('emailModal').hidden = true; };

  // Video
  document.querySelectorAll('.video-thumb').forEach(function(el) {
    el.onclick = function(e) {
      e.preventDefault();
      var m = this.href.match(/(?:youtu\.be\/|youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=))([^#&?]*)/);
      if (m && m[1].length === 11) this.innerHTML = '<iframe style="position: absolute; top:0; left:0; width:100%; height:100%; z-index:10;" src="https://www.youtube.com/embed/' + m[1] + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    };
  });

  console.log("BrainFit: App Ready.");
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
