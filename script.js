document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to toggle the nav menu on small screens
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('nav ul li');
    navLinks[0].classList.add('active');

    const sections = document.querySelectorAll('main section');
    sections[0].classList.add('active');

    navLinks.forEach((nav,indexOfNav) => {
        nav.addEventListener('click', () => {

            navLinks.forEach(n => {n.classList.remove('active')});

            nav.classList.add('active');
            sections.forEach(s => {s.classList.remove('active')});
            sections.forEach((section,indexOfSection) => {
                if(indexOfNav === indexOfSection) {
                    section.classList.add('active');
                    
                }

                if(indexOfSection === 0) {
                    displayMessage()
                }
            });

            document.querySelector('.nav-menu').classList.remove('active');
        })
    });

    const introMessage = [
        'Goodness and Excellence',
        'Empowering Future Leaders',
        'Strength and Integrity',
        'Confidence and Compassion',
        'Academic Growth and Success',
        'Nurturing Critical Thinkers',
        'Shaping Tomorrow\'s Leaders',
        'Building a Brighter Future for Women',
        'Inspiring Ambition and Courage',
        'Unity and Sisterhood',
        'Championing Excellence and Integrity',
    ];
    

    const messageSpan = document.querySelector('#message');
    let messageIndex = 0;
    let wordIndex = 0;
    let timeoutMessage;
    
    function displayMessage() {
        const words = introMessage[messageIndex].split(' ');
    
        // Start with fade-out animation (only if we're transitioning)
        if (wordIndex === 0 && messageSpan.textContent !== '') {
            messageSpan.classList.add('fade-down');
        }
    
        // After the fade-down animation, change the content and apply fade-in
        setTimeout(() => {
            if (wordIndex < words.length) {
                messageSpan.classList.remove('fade-down'); // Remove fade-down before new text
                messageSpan.textContent += words[wordIndex] + ' ';
                wordIndex++;
    
                // Apply fade-in for the new word
                messageSpan.classList.add('fade-in');
            } else {
                // Move to the next message after a brief pause
                messageIndex = (messageIndex + 1) % introMessage.length; // Loop through messages
                wordIndex = 0;
                messageSpan.textContent = ''; // Clear the message span for the next message
            }
        }, 500); // Timeout after fade-down, before updating message
    }
    
    // Start interval to display words every 2 seconds
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
            displayphotoview(currentIndex);
        })
   });

  
    // Function to display the photo with animation
    function displayphotoview(index, direction) {
        const photoSrc = galleryPhotos[index].src; // Get the image source

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
        isExapnded = !isExapnded;
        
        if(isExapnded) {
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
        } else {
            answer.style.display = "none"; // Hide the answer
        }
    }
    

    const newSaints = document.querySelectorAll('.suggested-saints li');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchContent = document.querySelector('.search-result');

    searchClose.onclick = () => {searchOverlay.style.display = 'none'};

    newSaints.forEach(saint => {
        saint.addEventListener('click', () => {
            const dataHistory = saint.querySelector('.data-history');
                // Toggle visibility
                if (dataHistory.style.display === 'none' || dataHistory.style.display === '') {
                    dataHistory.style.display = 'block'; // Show
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
    
})