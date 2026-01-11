// Smooth scroll to contact
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

// Contact form submit
function handleSubmit(event) {
    event.preventDefault();

    const successMsg = document.getElementById('successMsg');
    successMsg.style.display = 'block';

    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Animated counters for stats
const counters = document.querySelectorAll('.number');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if(count < target){
            counter.innerText = count + increment;
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
});

// Animate progress bars
const fills = document.querySelectorAll('.fill');

fills.forEach(fill => {
    const target = +fill.getAttribute('data-target');
    let count = 0;

    const animateBar = () => {
        const interval = setInterval(() => {
            if(count < target){
                count++;
                fill.innerText = count + "%";
                fill.style.width = count + "%";
            } else {
                clearInterval(interval);
            }
        }, 20);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                animateBar();
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(fill);
});

// TESTIMONIALS SLIDER
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentTestimonial = 0;

function showTestimonial(index){
    testimonials.forEach((t, i) => {
        t.classList.remove('active');
        if(i === index) t.classList.add('active');
    });
}

prevBtn.addEventListener('click', () => {
    currentTestimonial--;
    if(currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial++;
    if(currentTestimonial >= testimonials.length) currentTestimonial = 0;
    showTestimonial(currentTestimonial);
});

// Auto slider every 8 seconds
setInterval(() => {
    currentTestimonial++;
    if(currentTestimonial >= testimonials.length) currentTestimonial = 0;
    showTestimonial(currentTestimonial);
}, 8000);