document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle for light/dark mode (header + mobile nav)
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const syncThemeLabels = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggles.forEach((themeToggle) => {
            const navLabel = themeToggle.querySelector('.nav-theme-label');
            if (navLabel) {
                navLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
            }
        });
    };
    syncThemeLabels();
    themeToggles.forEach((themeToggle) => {
        themeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                localStorage.setItem('theme', next);
            } catch (e) {}
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute('content', next === 'dark' ? '#1e3a8a' : '#0d1b3e');
            }
            syncThemeLabels();
        });
    });

    // JavaScript to toggle the nav menu on small screens
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        const isActive = navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', isActive);
    });

    setTimeout(function() {
        const loadingDiv = document.getElementById('loading-div');
        if (loadingDiv) {
            loadingDiv.style.opacity = '0';
            setTimeout(() => {
                loadingDiv.style.display = 'none';
            }, 500);
        }
    }, 20000); 



    const navLinks = document.querySelectorAll("nav ul li");
    navLinks[0].classList.add("active");

    const sections = document.querySelectorAll("main section");
    sections[0].classList.add("active");

    // Enable browser history support
    function activateSection(index) {
      navLinks.forEach((n) => n.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      navLinks[index].classList.add("active");
      sections[index].classList.add("active");

      const sectionId = navLinks[index].getAttribute("data-id");
      window.history.pushState({ section: sectionId }, "", `#${sectionId}`);

      const loadingDiv = document.getElementById("loading-div");
      if (loadingDiv) {
        loadingDiv.style.display = "flex";
        setTimeout(() => {
          loadingDiv.style.opacity = "0";
          setTimeout(() => {
            loadingDiv.style.display = "none";
            loadingDiv.style.opacity = "1";
          }, 400);
        }, 800);
      }

      if (index === 0) {
        displayMessage();
      }

      document.querySelector(".nav-menu").classList.remove("active");
    }

    // Handle click events
    navLinks.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        activateSection(index);
      });
    });

    // On page load, activate section from URL hash
    window.addEventListener("load", () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const navIndex = Array.from(navLinks).findIndex(
          (nav) => nav.getAttribute("data-id") === hash
        );
        if (navIndex !== -1) {
          activateSection(navIndex);
        }
      }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", (e) => {
      const sectionId = window.location.hash.substring(1);
      const navIndex = Array.from(navLinks).findIndex(
        (nav) => nav.getAttribute("data-id") === sectionId
      );
      if (navIndex !== -1) {
        activateSection(navIndex);
      }
    });


   const introMessage = [
     "THE PRESENCE OF GOD",
     "Goodness and Excellence",
     "The power of Prayer",
     "The value of time",
     "The worth of character",
     "The success of perseverance",
     "The pleasure of working",
     "The virtue of patience",
     "Inspiring Ambition and Courage",
     "The obligation of duty",
     "The influence of example",
     "The improvement of talent",

     // Additional profound faiths
     "The Light of Christ in Learning",
     "The Strength of Faith in Action",
     "The Grace of Forgiveness",
     "The Gift of Compassion",
     "The Hope Found in Scripture",
     "The Joy of Serving Others",
     "The Beauty of Holiness",
     "The Fire of the Holy Spirit",
     "The Peace that Prayer Brings",
     "The Love of God in Every Girl",
   ];

    

    const messageSpan = document.querySelector('#message');
    let messageIndex = 0;
   
    
    function displayMessage() {
        // Fade-out animation for the current message
        messageSpan.classList.add('fade-down');
    
        // After fade-out, update the text content and apply fade-in
        setTimeout(() => {
            messageSpan.classList.remove('fade-down'); // Remove fade-out class
            messageSpan.textContent = introMessage[messageIndex]; // Set the new message
            messageSpan.classList.add('fade-in'); // Apply fade-in class
    
            // Move to the next message in the list
            messageIndex = (messageIndex + 1) % introMessage.length; // Loop through messages
        }, 500); // Adjust timing for fade-out and message change
    }
    
    // Start interval to display each full message every 2 seconds
    let timeoutMessage = setInterval(displayMessage, 2000);
    
    const coreValues = document.querySelectorAll('.core-values ul li');
    const valOverlay = document.querySelector('.display-values-overlay');
    const closeVal = document.querySelector('.value-close');
    const copyBtns = document.querySelectorAll('.values-button button');
    const copyQuoteBtn = copyBtns[0];
    const copyBibleBtn = copyBtns[1];

    coreValues.forEach(values => {
        values.addEventListener('click', () => {
            valOverlay.style.display = 'flex';
            showQuoteAndBibleVerse(values);
        })
    });

    closeVal.onclick = () => {valOverlay.style.display = 'none'};

    function showQuoteAndBibleVerse(element) {
        const quote =  element.getAttribute('data-quote');
        const author = element.getAttribute('data-author');
        const bibleVerse = element.getAttribute('data-bible-verse');
        const bibleLine = element.getAttribute('data-bible-line');

        const bibleVerseField = document.querySelector('.value-bible-verse');
        const quoteField = document.querySelector('.value-quote');

        bibleVerseField.innerHTML = '';
        quoteField.innerHTML = '';

        bibleVerseField.innerHTML = `<h3> ${bibleVerse}</h3> <br> <p> ${bibleLine}</p>`;
        quoteField.innerHTML = `<h3>“ ${quote} ”</h3> <br> <p>${author}</p>`;

        copyQuoteBtn.addEventListener('click', () => {
            const quoteToBeCopied = quote + " - " + author;  // Fixed variable name and added dash between quote and author
            navigator.clipboard.writeText(quoteToBeCopied).then(() => {
                copyQuoteBtn.textContent = "Copied";  
                
                setTimeout(() => {
                    copyQuoteBtn.textContent = "Copy Quote";
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                copyQuoteBtn.textContent = "Failed";  
                
                setTimeout(() => {
                    copyQuoteBtn.textContent = "Copy Quote";
                }, 2000);
            });
        });

        copyBibleBtn.addEventListener('click', () => {
            const bibletobeCopied = bibleVerse + ' - ' + bibleLine;

            navigator.clipboard.writeText(bibletobeCopied).then(() => {
                copyBibleBtn.textContent = 'Copied';

                setTimeout(() => {
                    copyBibleBtn.textContent = 'Copy Bible verse';
                }, 2000)
            }).catch(err => {
                console.error(`Failed to copy ${err}`);

                copyBibleBtn.textContent = 'Failed to copy';

                setTimeout(() => {
                    copyBibleBtn.textContent = 'Copy Bible verse';
                }, 2000)
            })
        })
        
    }

   const subjects = document.querySelectorAll('.subject-areas ul li');
   const subjectOverlay = document.querySelector('.subject-overview-overlay');
   const closeSuboverlay = document.querySelector('.close-overview');
   const subjFact = document.querySelector('.subject-fact');
   const subjView = document.querySelector('.subject-view');


   closeSuboverlay.onclick = () => { subjectOverlay.style.display = 'none';}

   subjects.forEach(sub => {
        sub.addEventListener('click', () => {
            subjectOverlay.style.display = 'flex';
            displaysubjectView(sub);
        });
   });

   function  displaysubjectView(element) {
        const  fact = element.getAttribute('data-fact');
        const subDisciplines = element.getAttribute('data-subdisciplines');

        subjFact.innerHTML = '';
        subjView.innerHTML = '';

        subjFact.innerHTML = `<h3>“ ${fact} ”</h3>`;
        subjView.innerHTML = `<h2>We provide this disciplines : </h2><h3>${subDisciplines} and  more </h3>`;
   }


   const galleryPhotos = document.querySelectorAll('.gallery-item img');
   const photoOverlay = document.querySelector('.photo-view-overlay');
   const closePhoto = document.querySelector('.close-photo-overlay');
   const leftCarousel = document.querySelector('.left-carousel');
   const rightCarousel = document.querySelector('.right-preview');
   const photoPreview = document.querySelector('.photo-preview');

   let currentIndex = 0;

   closePhoto.onclick = () => {photoOverlay.style.display = 'none';}

   galleryPhotos.forEach((photo, index) => {
        photo.addEventListener('click', function () {
            photoOverlay.style.display = 'flex';
            currentIndex = index;
            displayphotoview(currentIndex, 'next');
        })
   });

  
    // Function to display the photo with animation
    function displayphotoview(index, direction) {
        const photoSrc = galleryPhotos[index].src; // Get the image source

        if (index < 0 || index >= galleryPhotos.length) {
            photoOverlay.style.display = 'none';
            return; // Do nothing if the index is out of bounds
        }

        // Clear previous animation classes
        photoPreview.classList.remove('slide-left', 'slide-right');

        // Apply the correct animation class based on the direction
        if (direction === 'next') {
            photoPreview.classList.add('slide-right');
        } else if (direction === 'prev') {
            photoPreview.classList.add('slide-left');
        }


        // Update the image
        photoPreview.innerHTML = `<img src='${photoSrc}' alt='Image_${index + 1}'>`;

        
    }

    // Event for the next button (right arrow)
    rightCarousel.addEventListener('click', () => {
       currentIndex = (currentIndex + 1) % galleryPhotos.length; // Move to the next image, loop back to first image if at the end
        displayphotoview(currentIndex, "next");
    });

    // Event for the previous button (left arrow)
    leftCarousel.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length; // Move to the previous image, loop to last image if at the start
        displayphotoview(currentIndex, "prev");
    });


    const  moreBtn = document.querySelector('.more-button button');
    const prayerSect = document.querySelector('.prayer-section');
    const prayerVid = document.querySelector('.prayer-video');
    const  addmoreBtn = document.querySelector('.more-content button');

    let isExapnded = false;
    let IsExpanse = false

    moreBtn.addEventListener('click', () => {
        isExapnded = !isExapnded;

        if(isExapnded) {
            prayerSect.style.display = 'flex';
            moreBtn.textContent = 'Minimize';
        }
        else{
            moreBtn.textContent = 'Yes Please';
            prayerSect.style.display = 'none';
            prayerVid.style.display = 'none';
            document.querySelector('.more-button').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });

    addmoreBtn.addEventListener('click', () => {
        IsExpanse = !IsExpanse;
        
        if(IsExpanse) {
            prayerVid.style.display = 'flex';
            addmoreBtn.textContent = "Minimize";
            prayerVid.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        else{
            prayerVid.style.display = 'none';
            addmoreBtn.textContent = "Yes Please";
            
        }
    })


    const prayerItems = document.querySelectorAll('.prayer-insight > .faq-item');
    const prayerPrev = document.querySelector('.prayer-prev');
    const prayerNext = document.querySelector('.prayer-next');
    const prayerCounterCurrent = document.querySelector('.prayer-count-current');
    const prayerCounterTotal = document.querySelector('.prayer-count-total');
    const prayerDotsContainer = document.querySelector('.prayer-dots');
    let currentPrayer = 0;

    function showPrayer(index) {
        if (!prayerItems.length) return;
        prayerItems.forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.prayer-dot').forEach(dot => dot.classList.remove('active'));
        currentPrayer = (index + prayerItems.length) % prayerItems.length;
        prayerItems[currentPrayer].classList.add('active');
        document.querySelectorAll('.prayer-dot')[currentPrayer].classList.add('active');
        if (prayerCounterCurrent) {
            prayerCounterCurrent.textContent = String(currentPrayer + 1).padStart(2, '0');
        }
    }

    if (prayerCounterTotal) {
        prayerCounterTotal.textContent = String(prayerItems.length).padStart(2, '0');
    }

    if (prayerDotsContainer) {
        prayerItems.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'prayer-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Prayer ' + (i + 1));
            dot.addEventListener('click', () => showPrayer(i));
            prayerDotsContainer.appendChild(dot);
        });
    }

    if (prayerPrev) prayerPrev.addEventListener('click', () => showPrayer(currentPrayer - 1));
    if (prayerNext) prayerNext.addEventListener('click', () => showPrayer(currentPrayer + 1));

    if (prayerItems[0]) prayerItems[0].classList.add('active');

    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchContent = document.querySelector('.search-text-content');
    const searchImage = document.querySelector('.search-image');

    searchClose.onclick = () => {searchOverlay.style.display = 'none'};

    const saintSlides = document.querySelectorAll('.saint-slide');
    const saintPrev = document.querySelector('.saint-prev');
    const saintNext = document.querySelector('.saint-next');
    const saintCounterCurrent = document.querySelector('.saint-count-current');
    const saintDotsContainer = document.querySelector('.saint-dots');
    let currentSaint = 0;

    function showSaint(index) {
        if (!saintSlides.length) return;
        saintSlides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.saint-dot').forEach(dot => dot.classList.remove('active'));
        currentSaint = (index + saintSlides.length) % saintSlides.length;
        saintSlides[currentSaint].classList.add('active');
        document.querySelectorAll('.saint-dot')[currentSaint].classList.add('active');
        if (saintCounterCurrent) {
            saintCounterCurrent.textContent = String(currentSaint + 1).padStart(2, '0');
        }
    }

    if (saintDotsContainer) {
        saintSlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'saint-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Saint ' + (i + 1));
            dot.addEventListener('click', () => showSaint(i));
            saintDotsContainer.appendChild(dot);
        });
    }

    if (saintPrev) saintPrev.addEventListener('click', () => showSaint(currentSaint - 1));
    if (saintNext) saintNext.addEventListener('click', () => showSaint(currentSaint + 1));

    document.querySelectorAll('.saint-bio').forEach(p => {
        const text = p.textContent;
        const firstIndex = text.search(/\S/);
        const leading = text.slice(0, firstIndex);
        const wordMatch = text.slice(firstIndex).match(/^\S+/);
        if (wordMatch) {
            const word = wordMatch[0];
            p.textContent = '';
            p.innerHTML = leading + '<span class="drop-word">' + word + '</span>' + text.slice(firstIndex + word.length);
        }
    });

   

    document.querySelectorAll('.quotes-about-st-chris .clipboard-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const quote = icon.getAttribute('data-quote') + " - St. Christopher";
            navigator.clipboard.writeText(quote)
                .then(() => {
                    icon.innerHTML = '<i class="fas fa-check"></i>';
                    icon.classList.add('copied');

                    setTimeout(() => {
                        icon.innerHTML = '<i class="fas fa-copy"></i>';
                        icon.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    });

    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDots = document.querySelectorAll('.quote-dot');
    const quotePrev = document.querySelector('.quote-prev');
    const quoteNext = document.querySelector('.quote-next');
    let currentSlide = 0;

    function showQuoteSlide(index) {
        if (!quoteSlides.length) return;
        quoteSlides.forEach(slide => slide.classList.remove('active'));
        quoteDots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (index + quoteSlides.length) % quoteSlides.length;
        quoteSlides[currentSlide].classList.add('active');
        quoteDots[currentSlide].classList.add('active');
    }

    if (quotePrev) quotePrev.addEventListener('click', () => showQuoteSlide(currentSlide - 1));
    if (quoteNext) quoteNext.addEventListener('click', () => showQuoteSlide(currentSlide + 1));

    quoteDots.forEach(dot => {
        dot.addEventListener('click', () => showQuoteSlide(parseInt(dot.dataset.slide)));
    });
    

    const allguidances = document.querySelectorAll('.guidance ul li');

    allguidances.forEach(guidance => {
        guidance.addEventListener('click', () => {
            const inspiration = guidance.getAttribute('data-inspiring');
            const image  = guidance.getAttribute('data-img');
            showInspiration(inspiration, image);
        })
    });

    function showInspiration(inspiration, image) {
        searchOverlay.style.display = 'flex';
        searchContent.innerHTML = `<h2> ${inspiration}</h2>`;

        if (image) {
            searchImage.innerHTML = `<img src="${image}" alt="Inspiration Image">`;
        } else {
            searchImage.innerHTML = '';
        }
    }

    const facilitySlides = document.querySelectorAll('.facility-slide');
    const facilityPrev = document.querySelector('.facility-prev');
    const facilityNext = document.querySelector('.facility-next');
    const facilityCounterCurrent = document.querySelector('.facility-count-current');
    const facilityDotsContainer = document.querySelector('.facility-dots');
    let currentFacility = 0;
    let facilityTimer = null;

    function showFacility(index) {
        if (!facilitySlides.length) return;
        facilitySlides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.facility-dot').forEach(dot => dot.classList.remove('active'));
        currentFacility = (index + facilitySlides.length) % facilitySlides.length;
        facilitySlides[currentFacility].classList.add('active');
        document.querySelectorAll('.facility-dot')[currentFacility].classList.add('active');
        if (facilityCounterCurrent) {
            facilityCounterCurrent.textContent = String(currentFacility + 1).padStart(2, '0');
        }
    }

    function startFacilityTimer() {
        stopFacilityTimer();
        facilityTimer = setInterval(() => showFacility(currentFacility + 1), 4500);
    }

    function stopFacilityTimer() {
        if (facilityTimer) {
            clearInterval(facilityTimer);
            facilityTimer = null;
        }
    }

    if (facilityDotsContainer) {
        facilitySlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'facility-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Facility ' + (i + 1));
            dot.addEventListener('click', () => { showFacility(i); startFacilityTimer(); });
            facilityDotsContainer.appendChild(dot);
        });
    }

    if (facilityPrev) facilityPrev.addEventListener('click', () => { showFacility(currentFacility - 1); startFacilityTimer(); });
    if (facilityNext) facilityNext.addEventListener('click', () => { showFacility(currentFacility + 1); startFacilityTimer(); });

    const facilityCarousel = document.querySelector('.facility-carousel');
    if (facilityCarousel) {
        facilityCarousel.addEventListener('mouseenter', stopFacilityTimer);
        facilityCarousel.addEventListener('mouseleave', startFacilityTimer);
    }
startFacilityTimer();


});

//-------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    const observerOptions = {
        root: null, // Use the viewport
        threshold: 0.2 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in'); // Add the slide-in class when in view
                observer.unobserve(entry.target); // Stop observing after animation is triggered
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        observer.observe(item);
    });
});
