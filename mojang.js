// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animasi saat scroll
const cards = document.querySelectorAll(".skill-card, .reflection-card, .ethic-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Efek muncul lembut
cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});
