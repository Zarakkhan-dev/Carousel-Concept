const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

let isMouseDown = false;
let startX, scrollLeft;

track.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
  isMouseDown = false;
  track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
  isMouseDown = false;
  track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2; // Scroll-fast
  track.scrollLeft = scrollLeft - walk;
});

// Optional: snap to slides
track.addEventListener('mouseup', () => {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const scrollPosition = track.scrollLeft;
  const newIndex = Math.round(scrollPosition / slideWidth);
  track.style.transform = `translateX(${-newIndex * slideWidth}px)`;
});
