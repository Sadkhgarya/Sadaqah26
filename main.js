      window.onload = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('fade-out');
                
                setTimeout(() => {
                    preloader.style.display = 'none';

                    runInitializations();
                    
                }, 3000); 
            }
        };

        function runInitializations() {
            
            setTimeout(() => {
                try {
                    AOS.init({
                        duration: 800, 
                        once: true,    
                        offset: 100,   
                    });
                } catch (e) {
                    console.error("AOS failed to load.", e);
                }
            }, 100); 

            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                    if (mobileMenu.classList.contains('hidden')) {
                        menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
                        document.body.classList.remove('mobile-menu-open');
                    } else {
                        menuBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
                        document.body.classList.add('mobile-menu-open');
                    }
                    lucide.createIcons(); 
                });
                
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                        menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
                        document.body.classList.remove('mobile-menu-open');
                        lucide.createIcons();
                    });
                });
            }

            // MODIFIED COUNTER LOGIC
            const counterElement = document.getElementById('donation-counter');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');

            if (counterElement && progressBar && progressText) {
                const animateCounter = (el) => {
                    // Get Achieved amount and Goal from data attributes
                    const achieved = parseInt(el.dataset.achieved, 10);
                    const goal = parseInt(el.dataset.goal, 10);
                    
                    // Calculate target percentage, capped at 100%
                    const percentTarget = Math.min(100, Math.round((achieved / goal) * 100)); 
                    
                    const duration = 2500; // Animation duration
                    let currentPercent = 0;
                    const stepTime = 20; // Time interval for each step
                    const steps = duration / stepTime;
                    const increment = percentTarget / steps;

                    const supportMessage = 'نحتاج المزيد من الدعم';
                    const goalAchievedMessage = 'تم تحقيق الهدف بفضل الله!';
                    
                    const updateCounter = () => {
                        currentPercent += increment;
                        let displayValue = Math.round(currentPercent);

                        if (currentPercent >= percentTarget) {
                            currentPercent = percentTarget;
                            displayValue = percentTarget;
                        }

                        // Use Arabic locale for number formatting (only needed for internal calculation, not displayed)
                        // const achievedDisplay = Math.round(currentPercent * goal / 100).toLocaleString('ar-EG'); 
                        
                        // Determine the message
                        const message = displayValue >= 100 ? goalAchievedMessage : supportMessage;

                        // Update counter text with %
                        el.innerText = `${displayValue}%`; 
                        
                        // Update progress bar width
                        progressBar.style.width = `${displayValue}%`;

                        // Update progress text with only percentage and message (no absolute numbers)
                        progressText.innerHTML = `
                            <span>${displayValue}%</span>
                            <span>${message}</span>
                        `;
                        
                        if (currentPercent < percentTarget) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            // Ensure final value is exactly the target percentage
                            const finalMessage = percentTarget >= 100 ? goalAchievedMessage : supportMessage;
                            el.innerText = `${percentTarget}%`; 
                            progressBar.style.width = `${percentTarget}%`;
                             progressText.innerHTML = `
                                <span>${percentTarget}%</span>
                                <span>${finalMessage}</span>
                            `;
                        }
                    };
                    updateCounter();
                };

                const observer = new IntersectionObserver((entries, observerInstance) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounter(counterElement);
                            observerInstance.unobserve(entry.target); 
                        }
                    });
                }, { threshold: 0.5 }); 
                
                observer.observe(counterElement);
            }
            // END MODIFIED COUNTER LOGIC

            try {
                particlesJS('particles-js-global', {
                    "particles": {
                        "number": {
                            "value": 100, 
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#C09A2E" 
                        },
                        "shape": {
                            "type": "circle", 
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                        },
                        "opacity": {
                            "value": 0.3, 
                            "random": true,
                            "anim": {
                                "enable": true,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3, 
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150, 
                            "color": "#C09A2E", 
                            "opacity": 0.2, 
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2.5, 
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab" 
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push" 
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 140,
                                "line_linked": {
                                    "opacity": 0.5
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 0.4
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true
                });
            } catch (e) {
                console.error("Particles.js failed to load for global background.", e);
            }

            try {
                particlesJS('particles-js-counter', {
                    "particles": {
                        "number": {
                            "value": 50, 
                            "density": {
                                "enable": false, 
                            }
                        },
                        "color": {
                            "value": "#D4AF37" 
                        },
                        "shape": {
                            "type": "polygon", 
                            "polygon": {
                                "nb_sides": 8 
                            },
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                        },
                        "opacity": {
                            "value": 1.0, 
                            "random": true,
                            "anim": {
                                "enable": true,
                                "speed": 0.5, 
                                "opacity_min": 0.5, 
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 5, 
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": false, 
                        },
                        "move": {
                            "enable": true,
                            "speed": 3, 
                            "direction": "none",
                            "random": true, 
                            "straight": false,
                            "out_mode": "out", 
                            "bounce": false, 
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false, 
                            },
                            "onclick": {
                                "enable": false, 
                            },
                            "resize": true
                        },
                    },
                    "retina_detect": true
                });
            } catch (e) {
                console.error("Particles.js failed to load for counter background.", e);
            }

            const cookieBanner = document.getElementById('cookie-banner');
            const acceptCookiesBtn = document.getElementById('accept-cookies');
            
            if (cookieBanner && acceptCookiesBtn) {
                if (localStorage.getItem('cookiesAccepted') !== 'true') {
                    cookieBanner.classList.remove('hidden');
                    setTimeout(() => { 
                        cookieBanner.classList.remove('translate-y-full', 'opacity-0');
                    }, 100); 
                }

                acceptCookiesBtn.addEventListener('click', () => {
                    cookieBanner.classList.add('translate-y-full', 'opacity-0');
                    
                    localStorage.setItem('cookiesAccepted', 'true');
                    
                    setTimeout(() => {
                        cookieBanner.classList.add('hidden');
                    }, 700); 
                });
            }

            // Lightbox / Image Modal Logic
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            const galleryItems = document.querySelectorAll('.gallery-item img');

            if (modal && modalImg && galleryItems.length > 0) {
                galleryItems.forEach(img => {
                    img.addEventListener('click', () => {
                        modalImg.src = img.src;
                        modal.classList.remove('hidden');
                        setTimeout(() => {
                            modal.classList.remove('opacity-0');
                            modalImg.classList.remove('scale-90');
                            modalImg.classList.add('scale-100');
                        }, 10);
                    });
                });
            }

            try {
                lucide.createIcons();
            } catch (e) {
                console.error("Lucide icons failed to load.", e);
            }

        } 


        function copyToClipboard(text) {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            try {
                document.execCommand('copy');
                showCopyToast(); 
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(el);
        }

        function showCopyToast() {
            const toast = document.getElementById('copy-toast');
            if (toast) {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(5px)';
                }, 2000); 
            }
        }

        function closeImageModal() {
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            if(modal && modalImg) {
                modal.classList.add('opacity-0');
                modalImg.classList.remove('scale-100');
                modalImg.classList.add('scale-90');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
            }
        }
