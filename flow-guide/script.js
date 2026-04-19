// Cursor Glow
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Slide/Navigation Sync
const slides = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = '#fff';
                    link.style.borderBottom = '1px solid #6366f1';
                } else {
                    link.style.color = '';
                    link.style.borderBottom = 'none';
                }
            });
        }
    });
}, { threshold: 0.5 });

slides.forEach(slide => navObserver.observe(slide));

// Add "Dashboard logic" mock interaction to models
document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
        const h4 = card.querySelector('h4').textContent;
        console.log(`Deep Dive: Accessing Schema Metadata for ${h4}...`);
        
        // Minor visual feedback
        card.style.background = 'rgba(99, 102, 241, 0.05)';
        setTimeout(() => {
            card.style.background = '';
        }, 500);
    });
});

console.log("EventHub Presentation Engine Ready.");
