// Default config
const defaultConfig = {
  hero_headline: "L'excellence de l'immobilier",
  hero_subtitle: "Votre partenaire de confiance pour des projets résidentiels d'exception.",
  about_text: "Entreprise de Promotion Immobilière fondée sur des valeurs d'excellence et d'intégrité.",
  background_color: "#FFFFFF",
  surface_color: "#F9FAFB",
  text_color: "#1a1a1a",
  primary_action_color: "#B91C1C",
  secondary_action_color: "#4a4a4a",
  font_family: "Montserrat",
  font_size: 16
};

// Element SDK init
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      const h = document.getElementById('heroHeadline');
      const s = document.getElementById('heroSubtitle');
      const a = document.getElementById('aboutText');
      if (h) h.innerHTML = (config.hero_headline || defaultConfig.hero_headline).replace('immobilier', '<span class="text-brand-red">l\'immobilier</span>').replace("L'excellence de l'immobilier", "L'excellence de<br><span class='text-brand-red'>l'immobilier</span>");
      if (s) s.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
      if (a) a.textContent = config.about_text || defaultConfig.about_text;

      const font = config.font_family || defaultConfig.font_family;
      document.body.style.fontFamily = `${font}, Montserrat, sans-serif`;

      const size = config.font_size || defaultConfig.font_size;
      document.body.style.fontSize = `${size}px`;

      document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }},
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }},
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }},
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); }},
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); }}
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }},
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }}
    }),
    mapToEditPanelValues: (config) => new Map([
      ["hero_headline", config.hero_headline || defaultConfig.hero_headline],
      ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
      ["about_text", config.about_text || defaultConfig.about_text]
    ])
  });
}

// Mobile menu toggle
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// Contact form
function handleContactSubmit(e) {
  e.preventDefault();
  document.getElementById('formSuccess').classList.remove('hidden');
  e.target.reset();
  setTimeout(() => document.getElementById('formSuccess').classList.add('hidden'), 5000);
}

// Project detail modal
const projectData = {
  yasmine: { name: 'Résidence El Yasmine', location: 'Blida, Algérie', status: 'En Cours de Vente', types: 'F3 & F4', surface: '75-110 m²', floors: 'R+5', desc: 'Située au cœur de Blida, la Résidence El Yasmine offre un cadre de vie exceptionnel avec des appartements spacieux et lumineux. Parking sous-sol, espaces verts aménagés et sécurité 24h/24.' },
  oliviers: { name: 'Résidence Les Oliviers', location: 'Alger, Algérie', status: 'En Construction', types: 'F3 & F4', surface: '80-120 m²', floors: 'R+8', desc: 'Programme résidentiel moderne au cœur d\'Alger. Vue panoramique, finitions haut de gamme et proximité de toutes les commodités urbaines.' },
  nour: { name: 'Résidence El Nour', location: 'Tipaza, Algérie', status: 'Livré', types: 'F3', surface: '70-95 m²', floors: 'R+4', desc: 'Résidence livrée avec succès dans un cadre verdoyant à proximité de la mer. Qualité de vie incomparable pour les familles.' },
  baraka: { name: 'Résidence El Baraka', location: 'Boumerdès, Algérie', status: 'En Cours de Vente', types: 'F4', surface: '90-130 m²', floors: 'R+6', desc: 'Nouveau programme de grand standing avec des appartements F4 spacieux, parking sécurisé et aires de jeux pour enfants.' }
};

function showProjectDetail(key) {
  const p = projectData[key];
  document.getElementById('modalContent').innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-8"><i data-lucide="building" class="w-24 h-24 text-gray-400"></i></div>
      <span class="text-xs font-bold text-brand-red bg-red-50 px-3 py-1 rounded-full">${p.status}</span>
      <h2 class="text-3xl font-bold text-brand-dark mt-4 mb-2">${p.name}</h2>
      <p class="text-brand-grey flex items-center gap-2 mb-6"><i data-lucide="map-pin" class="w-4 h-4"></i>${p.location}</p>
      <p class="text-brand-grey leading-relaxed mb-8">${p.desc}</p>
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-xs text-brand-grey mb-1">Types</p><p class="font-bold text-brand-dark">${p.types}</p></div>
        <div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-xs text-brand-grey mb-1">Surface</p><p class="font-bold text-brand-dark">${p.surface}</p></div>
        <div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-xs text-brand-grey mb-1">Étages</p><p class="font-bold text-brand-dark">${p.floors}</p></div>
      </div>
      <div class="flex gap-4">
        <a href="contact.html" class="flex-1 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-800 transition-colors text-center">Demander des informations</a>
        <button class="px-6 py-3 border border-gray-200 text-brand-grey font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"><i data-lucide="download" class="w-4 h-4"></i>Brochure</button>
      </div>
    </div>
  `;
  document.getElementById('projectModal').classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.add('hidden');
}

// Scroll animations
function animateOnScroll() {
  const els = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  animateOnScroll();
});
