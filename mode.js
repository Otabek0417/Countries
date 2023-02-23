const toggle = document.querySelector(".dark-mode-btn");

if (JSON.parse(localStorage.getItem("mode"))) {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", document.body.classList.contains("dark-mode"));
});
