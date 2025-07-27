document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to toggle the nav menu on small screens
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    setTimeout(function() {
        const loadingDiv = document.getElementById('loading-div');
        loadingDiv.style.display = 'none'; // Hide the loading div after 2 minutes
    }, 15000); 



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
          loadingDiv.style.display = "none";
        }, 10000);
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
    timeoutMessage = setInterval(displayMessage, 2000);
    
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
    const faqItems = document.querySelectorAll('.prayer-insight .faq-item');
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
            faqItems.forEach(item => {
                const allAns = item.querySelectorAll('.faq-answer');
                allAns.forEach(f => f.style.display = 'none');
            });

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


    faqItems.forEach(faq => {
        faq.addEventListener('click', () => {
            toggleAnswer(faq);
        })
    })

    function toggleAnswer(element) {
        const answer = element.querySelector('.faq-answer'); // Get the answer related to the clicked question
        if (answer.style.display === "none" || answer.style.display === "") {
            answer.style.display = "block"; // Show the answer
            answer.classList.add('show');
        } else {
            answer.style.display = "none"; // Hide the answer
            answer.classList.remove('show');
        }
    }
    

    const newSaints = document.querySelectorAll('.suggested-saints li');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchContent = document.querySelector('.search-result');
    const searchImage = document.querySelector('.search-image');

    searchClose.onclick = () => {searchOverlay.style.display = 'none'};

    newSaints.forEach(saint => {
        saint.addEventListener('click', () => {
            const dataHistory = saint.querySelector('.data-history');
                // Toggle visibility
                if (dataHistory.style.display === 'none' || dataHistory.style.display === '') {
                    dataHistory.style.display = 'flex'; // Show
                    saint.scrollIntoView({
                        behavior:'smooth',
                        block: "center"
                    })
                } else {
                    dataHistory.style.display = 'none'; // Hide
                }
        });
    });

   

    document.querySelectorAll('.quotes-about-st-chris .clipboard-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const quote = icon.getAttribute('data-quote') + "- St. Christopher";
            navigator.clipboard.writeText(quote)
                .then(() => {
                    // Change icon to checkmark
                    icon.innerHTML = '<i class="fas fa-check"></i>';
                    
                    // Set timeout to revert back to clipboard icon after 2 seconds (2000 milliseconds)
                    setTimeout(() => {
                        icon.innerHTML = ''; // Reverting back to clipboard icon
                    }, 2000); // Change this duration as needed
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    });

    document.querySelectorAll('.quotes-about-st-chris li').forEach(li => {
        li.addEventListener('click', () => {
            const quote = li.textContent.trim() + "- St. Christopher";
            navigator.clipboard.writeText(quote)
                .then(() => {
                    // Change icon to checkmark
                    li.classList.add('copied');
                    
                    // Set timeout to revert back to clipboard icon after 2 seconds (2000 milliseconds)
                    setTimeout(() => {
                         li.classList.remove('copied'); // Reverting back to clipboard icon
                    }, 2000); // Change this duration as needed
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
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
            searchImage.innerHTML = ''; // Clear the image container if no image is provided
        }
       
    }


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
