const startDate = new Date(2018, 10, 1);
const years = Math.floor((new Date() - startDate) / (365.25 * 24 * 60 * 60 * 1000));
document.getElementById('years-exp').textContent = years + '+';
document.getElementById('years-bio').textContent = years;

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
let activeIndex = 0;

function activate(index) {
    navItems[activeIndex].classList.remove('active');
    sections[activeIndex].classList.remove('active');
    activeIndex = index;
    navItems[activeIndex].classList.add('active');
    sections[activeIndex].classList.add('active');
}

navItems.forEach((item, i) => {
    item.addEventListener('click', () => activate(i));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault();
        activate((activeIndex + 1) % navItems.length);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activate((activeIndex - 1 + navItems.length) % navItems.length);
    }
});
