document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for Host and Join buttons
    const hostBtn = document.querySelector('.host-btn');
    const joinBtn = document.querySelector('.join-btn');
    const searchBar = document.querySelector('.search-bar');

    if (hostBtn) {
        hostBtn.addEventListener('click', openHostModal);
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', openJoinModal);
    }

    if (searchBar) {
        searchBar.addEventListener('input', debounce(handleSearch, 300));
    }

    // Profile Dropdown Functionality
    const profileButton = document.querySelector('.profile-button');
    const profileMenu = document.querySelector('.profile-menu');

    if (profileButton) {
        profileButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling to window
            profileMenu.classList.toggle('show');

            // Update ARIA attributes
            const expanded = profileButton.getAttribute('aria-expanded') === 'true' || false;
            profileButton.setAttribute('aria-expanded', !expanded);
        });
    }

    // Hamburger Dropdown Functionality
    const hamburgerButton = document.querySelector('.hamburger-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling to window
            hamburgerMenu.classList.toggle('show');

            // Update ARIA attributes
            const expanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !expanded);
        });
    }

    // Close both dropdowns when clicking outside
    window.addEventListener('click', function() {
        if (profileMenu.classList.contains('show')) {
            profileMenu.classList.remove('show');
            profileButton.setAttribute('aria-expanded', 'false');
        }
        if (hamburgerMenu.classList.contains('show')) {
            hamburgerMenu.classList.remove('show');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdowns with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (profileMenu.classList.contains('show')) {
                profileMenu.classList.remove('show');
                profileButton.setAttribute('aria-expanded', 'false');
                profileButton.focus();
            }
            if (hamburgerMenu.classList.contains('show')) {
                hamburgerMenu.classList.remove('show');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                hamburgerButton.focus();
            }
        }
    });

    // Modal Functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-close');
            closeModal(document.getElementById(modalId));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Trap focus within the modal when it's open
    modals.forEach(modal => {
        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                trapFocus(event, modal);
            }
        });
    });

    // Handle Host Modal Form Submission
    const hostForm = document.querySelector('#hostModal form');
    if (hostForm) {
        hostForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Collect form data
            const name = document.getElementById('hostName').value.trim();
            const email = document.getElementById('hostEmail').value.trim();
            const sport = document.getElementById('hostSport').value;

            // Basic validation
            if (name === "" || email === "" || sport === "") {
                alert("Please fill in all fields.");
                return;
            }

            // Implement your logic here (e.g., send data to the server)
            console.log('Host Form Submitted:', { name, email, sport });

            // Close the modal after submission
            closeModal(document.getElementById('hostModal'));

            // Optionally, reset the form
            hostForm.reset();

            // Provide user feedback
            alert("Thank you for hosting! We'll get back to you soon.");
        });
    }

    // Handle Join Modal Form Submission
    const joinForm = document.querySelector('#joinModal form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Collect form data
            const name = document.getElementById('joinName').value.trim();
            const email = document.getElementById('joinEmail').value.trim();
            const sport = document.getElementById('joinSport').value;

            // Basic validation
            if (name === "" || email === "" || sport === "") {
                alert("Please fill in all fields.");
                return;
            }

            // Implement your logic here (e.g., send data to the server)
            console.log('Join Form Submitted:', { name, email, sport });

            // Close the modal after submission
            closeModal(document.getElementById('joinModal'));

            // Optionally, reset the form
            joinForm.reset();

            // Provide user feedback
            alert("You have successfully joined! We'll connect you with a host soon.");
        });
    }
});

/**
 * Opens the Host Companion Modal.
 */
function openHostModal() {
    const modal = document.getElementById('hostModal');
    openModal(modal);
}

/**
 * Opens the Join Companion Modal.
 */
function openJoinModal() {
    const modal = document.getElementById('joinModal');
    openModal(modal);
}

/**
 * Opens a modal and manages focus.
 * @param {HTMLElement} modal 
 */
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
        if (focusableElements.length) {
            focusableElements[0].focus();
        }
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Closes a modal and restores focus.
 * @param {HTMLElement} modal 
 */
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

/**
 * Traps focus within the modal.
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} modal 
 */
function trapFocus(event, modal) {
    const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
    } else { // Tab
        if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

/**
 * Handles the search input.
 * @param {Event} event 
 */
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    filterResults(query);
}

/**
 * Filters the sports and places based on the search query.
 * @param {string} query 
 */
function filterResults(query) {
    // Filter Sports
    const sports = document.querySelectorAll('.sport-card');
    sports.forEach(sport => {
        const sportName = sport.querySelector('p').textContent.toLowerCase();
        if (sportName.includes(query)) {
            sport.style.display = 'block';
        } else {
            sport.style.display = 'none';
        }
    });

    // Filter Famous Places
    const places = document.querySelectorAll('.place-card');
    places.forEach(place => {
        const placeName = place.querySelector('h3').textContent.toLowerCase();
        if (placeName.includes(query)) {
            place.style.display = 'flex';
        } else {
            place.style.display = 'none';
        }
    });
}

/**
 * Debounces a function by the specified delay.
 * @param {Function} func 
 * @param {number} delay 
 * @returns {Function}
 */
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}
