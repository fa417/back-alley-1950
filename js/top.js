// メニュー
function closeMenu() {
    document.getElementById('menu-toggle').checked = false;
}

// 下から出てくる
const options = {
    root: null,
    rootMargin: '0px 0px -200px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

const selectors = [
    '.title-container',
    '.concept-section .wrapper',
    '.rezent-section .wrapper',
    '.menu-section .wrapper',
    '.style-hair-section .wrapper',
    '.about-section .wrapper',
    '.types-section .back-blue',
    '.types-section .back-red',
    '.modern-photos',
    '.classic-photos',
    '.short-photos',
    '.slicked-photos',
    '.textured-photos',
    '.fade-photos',
    '.biker-photos',
    '.menu-hair-section .container',
    '.menu-option-section .container',
    '.reservation-section .container',
    '.access-section .container',
    '.thank-section .container'
];

const allElements = document.querySelectorAll(selectors.join(', '));

allElements.forEach(el => {
    observer.observe(el);
});


