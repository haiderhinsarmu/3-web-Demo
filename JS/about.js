const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  });
});
