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
                    } else {
                        menuBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
                    }
                    lucide.createIcons(); 
                });
                
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                        menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
                        lucide.createIcons();
                    });
                });
            }

            const counterElement = document.getElementById('donation-counter');
            
            if (counterElement) {
                const animateCounter = (el) => {
                    const target = parseInt(el.dataset.target, 10);
                    const duration = 2500; 
                    let current = 0;
                    const stepTime = 20; 
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    
                    const updateCounter = () => {
                        current += increment;
                        let displayValue = Math.round(current);

                        if (current >= target) {
                            current = target;
                            displayValue = target;
                        }

                        el.innerText = displayValue.toLocaleString('ar-EG'); 

                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.innerText = target.toLocaleString('ar-EG');
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
        