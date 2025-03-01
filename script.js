// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Countdown Timer
const countdown = () => {
    const weddingDate = new Date('April 19, 2025 00:00:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const gap = weddingDate - now;
        
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);
        
        document.getElementById('days').querySelector('h3').innerText = textDay;
        document.getElementById('hours').querySelector('h3').innerText = textHour;
        document.getElementById('minutes').querySelector('h3').innerText = textMinute;
        document.getElementById('seconds').querySelector('h3').innerText = textSecond;
        
        if (gap < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').querySelector('h3').innerText = "00";
            document.getElementById('hours').querySelector('h3').innerText = "00";
            document.getElementById('minutes').querySelector('h3').innerText = "00";
            document.getElementById('seconds').querySelector('h3').innerText = "00";
        }
    };
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
};

// Smooth Scrolling
const smoothScroll = () => {
    const links = document.querySelectorAll('.nav-links a, .hero-content a');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            const offsetTop = document.querySelector(href).offsetTop;
            
            scroll({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close the mobile menu if it's open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
};

// RSVP Form Submission
const rsvpForm = () => {
    const form = document.getElementById('rsvp-form');
    
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted with values:', formValues);
            
            // Show confirmation message
            form.innerHTML = `
                <div class="form-success">
                    <h3>Thank You!</h3>
                    <p>Your RSVP has been submitted successfully.</p>
                </div>
            `;
        });
    }
};

// Quiz validation
const setupQuiz = () => {
    const quizItems = document.querySelectorAll('.quiz-item');
    
    if (quizItems.length > 0) {
        quizItems.forEach(item => {
            const options = item.querySelectorAll('input[type="radio"]');
            options.forEach(option => {
                option.addEventListener('change', () => {
                    // Here you could implement checking the answers
                    // For now, we'll just style the selection
                    options.forEach(opt => {
                        opt.parentElement.classList.remove('selected');
                    });
                    option.parentElement.classList.add('selected');
                });
            });
        });
    }
};

// Sticky Navigation on Scroll
const stickyNav = () => {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
};

// Image Gallery Popup (simple version)
const galleryPopup = () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Create popup
            const popup = document.createElement('div');
            popup.className = 'gallery-popup';
            
            // Create popup image
            const popupImg = document.createElement('img');
            popupImg.src = item.src;
            
            // Create close button
            const closeBtn = document.createElement('div');
            closeBtn.className = 'popup-close';
            closeBtn.innerHTML = '&times;';
            
            // Append elements
            popup.appendChild(popupImg);
            popup.appendChild(closeBtn);
            document.body.appendChild(popup);
            
            // Close popup on click
            popup.addEventListener('click', () => {
                popup.remove();
            });
        });
    });
};

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    countdown();
    smoothScroll();
    rsvpForm();
    setupQuiz();
    stickyNav();
    galleryPopup();
    
    // Add additional styles for the sticky nav
    const style = document.createElement('style');
    style.textContent = `
        .sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(51, 51, 51, 0.9);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 1rem 5%;
            transition: all 0.3s ease;
            height: 40px;
        }
        
        .gallery-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        }
        
        .gallery-popup img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 3rem;
            color: #fff;
            cursor: pointer;
        }
        
        .form-success {
            text-align: center;
            padding: 2rem;
        }
        
        .form-success h3 {
            color: #d4af37;
            margin-bottom: 1rem;
        }
        
        .options label.selected {
            color: #d4af37;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});

// Add parallax effect to the hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    // Parallax effect - move the background image up slightly on scroll
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});


const form = document.getElementById('dataForm');
    const formContainer = document.getElementById('formContainer');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // 1) Slide down + fade out
      formContainer.style.transform = 'translateY(100px)';
      formContainer.style.opacity   = '0';

      // Pretend we do an async call here... using setTimeout
      setTimeout(() => {
        // 2) Reset the form fields
        form.reset();

        // Temporarily turn off transitions so it can "jump" without animating
        formContainer.style.transition = 'none';
        // Move it back to original position and shrink to 0 (invisible)
        formContainer.style.transform = 'translateY(0) scale(0)';
        // Force the browser to apply this transform right away
        formContainer.offsetHeight; // reflow

        // 3) Turn transitions back on
        formContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

        // 4) Animate to full size and full opacity from the SAME SPOT
        formContainer.style.opacity   = '1';
        formContainer.style.transform = 'translateY(0) scale(1)';
      }, 1000); // match the transition duration (0.5s)
    });

    // JavaScript Game Logic

  const cells = document.querySelectorAll('.cell');
  const statusDiv = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');

  // Game state
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;

  // Winning combinations (indices of cells)
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // columns
    [0,4,8], [2,4,6]            // diagonals
  ];

  // Function to check for a winner
  function checkWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // 'X' or 'O'
      }
    }
    return null;
  }

  // Function to check if board is full (draw)
  function checkDraw() {
    return board.every(cell => cell !== "");
  }

  // Update status message
  function updateStatus(message) {
    statusDiv.textContent = message;
  }

  // Handle a cell click
  function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    // If already taken or game is over, ignore
    if (board[index] !== "" || gameOver) return;

    // Place current player's symbol
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for winner
    const winner = checkWinner();
    if (winner) {
      updateStatus(`Player ${winner} wins!`);
      gameOver = true;
      return;
    }

    // Check for draw
    if (checkDraw()) {
      updateStatus(`It's a draw!`);
      gameOver = true;
      return;
    }

    // Switch player
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  // Reset the game
  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cells.forEach(cell => cell.textContent = "");
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  // Initialize
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);
  updateStatus(`Player ${currentPlayer}'s turn`);