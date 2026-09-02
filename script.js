const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.querySelector(".close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImage.src = item.dataset.full || img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = item.querySelector("figcaption")?.innerText || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicText = musicToggle.querySelector(".music-text");

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicToggle.classList.add("playing");
      musicText.textContent = "MATIKAN";
      musicToggle.setAttribute("aria-label", "Matikan musik");
    } catch (error) {
      console.log("Musik belum bisa diputar:", error);
    }
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicText.textContent = "MUSIK";
    musicToggle.setAttribute("aria-label", "Putar musik");
  }
});
