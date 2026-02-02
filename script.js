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

    console.log('Elements found:', {
        floatingCta: !!floatingCta,
        floatingCtaClose: !!floatingCtaClose,
        joinSection: !!joinSection
    });

    // Enhanced element inspection
    if (floatingCtaClose) {
        console.log('Button element details:', {
            tagName: floatingCtaClose.tagName,
            className: floatingCtaClose.className,
            disabled: floatingCtaClose.disabled,
            style: floatingCtaClose.style.cssText,
            computedStyle: window.getComputedStyle(floatingCtaClose)?.pointerEvents
        });
    }

    const storageKey = 'floatingCtaDismissed';
    const isDismissed = () => {
        try {
            return window.localStorage.getItem(storageKey) === '1';
        } catch {
            return false;
        }
    };

    const dismiss = () => {
        console.log('DISMISS CALLED - Alternative method');
        if (!floatingCta) {
            console.log('Floating CTA element not found');
            return;
        }
        
        // Try multiple hiding methods
        console.log('Applying all hide methods');
        floatingCta.style.display = 'none';
        floatingCta.style.visibility = 'hidden';
        floatingCta.hidden = true;
        floatingCta.style.opacity = '0';
        
        try {
            window.localStorage.setItem(storageKey, '1');
            console.log('Saved to localStorage');
        } catch (error) {
            console.log('Failed to save to localStorage:', error);
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
        console.log('Adding enhanced event listeners to close button');
        
        // Test 1: Basic click detection with visual feedback
        floatingCtaClose.addEventListener('click', function(e) {
            console.log('CLICK DETECTED!', e);
            alert('Button clicked! This confirms the click is working.');
            dismiss();
        });
        
        // Test 2: Mouse events for debugging
        floatingCtaClose.addEventListener('mousedown', function(e) {
            console.log('MOUSE DOWN on close button', e);
        });
        
        floatingCtaClose.addEventListener('mouseup', function(e) {
            console.log('MOUSE UP on close button', e);
        });
        
        floatingCtaClose.addEventListener('mouseover', function(e) {
            console.log('MOUSE OVER on close button - hover working');
        });
        
    } else {
        console.log('Close button element not found!');
    }

    window.addEventListener('scroll', updateFloatingCta, { passive: true });
    window.addEventListener('resize', updateFloatingCta);
    updateFloatingCta();
});
