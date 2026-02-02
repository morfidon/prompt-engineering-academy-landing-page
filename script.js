<<<<<<< O:/programowanie/landing-page-udemy/script.js
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const ctaButtons = document.querySelectorAll('a[href="#join"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const joinSection = document.getElementById('join');
            if (joinSection) {
                joinSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .feature-detail');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
=======
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        const setExpanded = ({ button, expanded }) => {
            if (!button) {
                return;
            }
            button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        };

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherBtn = otherItem.querySelector('.faq-question');
                setExpanded({ button: otherBtn, expanded: false });
            });
            
            if (!isActive) {
                item.classList.add('active');
                setExpanded({ button: question, expanded: true });
            } else {
                setExpanded({ button: question, expanded: false });
            }
        });
    });

    faqButtons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') {
                return;
            }
            e.preventDefault();
            btn.click();
        });
    });

    const decorativeStars = document.querySelectorAll('svg.icon-star');
    decorativeStars.forEach((star) => {
        star.setAttribute('aria-hidden', 'true');
        star.setAttribute('focusable', 'false');
    });

    const ctaButtons = document.querySelectorAll('a[href="#join"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const joinSection = document.getElementById('join');
            if (joinSection) {
                joinSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const benefitsButtons = document.querySelectorAll('a[href="#benefits"]');
    benefitsButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const benefitsSection = document.getElementById('benefits');
            if (benefitsSection) {
                benefitsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .feature-detail');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const floatingCta = document.getElementById('floatingCta');
    const floatingCtaClose = document.querySelector('.floating-cta-close');
    const joinSection = document.getElementById('join');

    const storageKey = 'floatingCtaDismissed';
    const isDismissed = () => {
        try {
            return window.localStorage.getItem(storageKey) === '1';
        } catch {
            return false;
        }
    };

    const dismiss = () => {
        if (!floatingCta) {
            return;
        }
        floatingCta.hidden = true;
        try {
            window.localStorage.setItem(storageKey, '1');
        } catch {
            // ignore
        }
    };

    const shouldShowFloatingCta = () => {
        if (!floatingCta || !joinSection) {
            return false;
        }
        if (isDismissed()) {
            return false;
        }

        const rect = joinSection.getBoundingClientRect();
        const joinIsVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (joinIsVisible) {
            return false;
        }

        return window.scrollY > 500;
    };

    const updateFloatingCta = () => {
        if (!floatingCta) {
            return;
        }
        floatingCta.hidden = !shouldShowFloatingCta();
    };

    if (floatingCtaClose) {
        floatingCtaClose.addEventListener('click', dismiss);
    }

    window.addEventListener('scroll', updateFloatingCta, { passive: true });
    window.addEventListener('resize', updateFloatingCta);
    updateFloatingCta();
});
>>>>>>> C:/Users/video/.windsurf/worktrees/landing-page-udemy/landing-page-udemy-d10d28cd/script.js
