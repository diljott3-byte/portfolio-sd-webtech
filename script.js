/* SD Web Technologies portfolio configuration.
   Replace the two contact values below once you provide the final details. */
const SD_CONFIG = {
  whatsapp: "", // Example: 919876543210 (country code + number, no + sign)
  email: ""      // Example: hello@sdwebtech.com
};

const projectConfig = {
  jesan: { base: "https://jesansteelworks.com/" },
  sahney: { base: "https://sahneypagrihouse.com/" }
};

document.querySelectorAll("[data-project]").forEach((wrap) => {
  const project = wrap.dataset.project;
  const iframe = wrap.querySelector("[data-preview]");
  const open = wrap.querySelector("[data-open]");
  const label = wrap.querySelector("[data-url-label]");
  const cover = wrap.querySelector(".preview-cover");
  let loaded = false;

  const setPage = (btn) => {
    wrap.querySelectorAll(".page-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const page = btn.dataset.page || "";
    const url = projectConfig[project].base + page;
    iframe.src = url;
    open.href = url;
    label.textContent = btn.dataset.label === "home" ? "" : btn.dataset.label;
    cover.style.opacity = "1";
    cover.style.pointerEvents = "none";
  };

  wrap.querySelectorAll(".page-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => setPage(btn));
  });

  iframe.addEventListener("load", () => {
    loaded = true;
    setTimeout(() => { cover.style.opacity = "0"; }, 500);
  });

  // If a host blocks iframe embedding, the static visual remains beneath it
  // and the ↗ link still opens the exact page in a new tab.
  setTimeout(() => {
    if (!loaded) cover.style.opacity = "1";
  }, 5000);
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = Number(el.dataset.delay || 0);
    setTimeout(() => el.classList.add("visible"), delay);
    io.unobserve(el);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const cursor = document.querySelector(".cursor-light");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.opacity = "1";
  });
  document.documentElement.addEventListener("mouseleave", () => cursor.style.opacity = "0");
}

const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});
mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
}));

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const wa = document.querySelector("[data-contact-whatsapp]");
const mail = document.querySelector("[data-contact-email]");
if (SD_CONFIG.whatsapp) {
  wa.href = `https://wa.me/${SD_CONFIG.whatsapp}?text=${encodeURIComponent("Hi SD Web Technologies, I want to discuss a website/project for my business.")}`;
  wa.target = "_blank";
  wa.rel = "noopener";
} else {
  wa.addEventListener("click", (e) => { e.preventDefault(); alert("Add the WhatsApp number in SD_CONFIG inside script.js."); });
}
if (SD_CONFIG.email) {
  mail.href = `mailto:${SD_CONFIG.email}?subject=${encodeURIComponent("Project enquiry — SD Web Technologies")}`;
} else {
  mail.addEventListener("click", (e) => { e.preventDefault(); alert("Add the email address in SD_CONFIG inside script.js."); });
}
