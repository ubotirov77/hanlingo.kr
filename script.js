document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("languageSelector");
  const flags = document.querySelectorAll(".lang-flag");

  const savedLang = localStorage.getItem("lang") || "en";
  if (dropdown) dropdown.value = savedLang;
  loadLanguage(savedLang);

  // Handle dropdown change
  if (dropdown) {
    dropdown.addEventListener("change", (e) => {
      const lang = e.target.value;
      loadLanguage(lang);
      localStorage.setItem("lang", lang);
    });
  }

  // Handle flag clicks
  if (flags.length) {
    flags.forEach(flag => {
      flag.addEventListener("click", () => {
        const lang = flag.getAttribute("data-lang");
        loadLanguage(lang);
        localStorage.setItem("lang", lang);
      });
    });
  }

  // Rotating banner logic
  const banners = document.querySelectorAll(".banner-slider .banner");
  if (banners.length > 0) {
    let current = 0;

    setInterval(() => {
      banners[current].classList.remove("active");
      current = (current + 1) % banners.length;
      banners[current].classList.add("active");
    }, 3000);
  }
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => {
      if (!res.ok) throw new Error(`Language file not found: ${lang}`);
      return res.json();
    })
    .then(data => {
      document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (data[key]) el.textContent = data[key];
      });

      document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.getAttribute("data-placeholder");
        if (data[key]) el.placeholder = data[key];
      });
    })
    .catch(err => {
      console.error("Failed to load language:", err);
    });
}
