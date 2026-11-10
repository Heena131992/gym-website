/* ==========================================================
   PHOENIX GYM - COMPLETE JAVASCRIPT LOGIC
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. MODAL POPUPS (Free Trial & Join Now) --- */
  const trialModal = document.getElementById('trial-modal');
  const joinModal = document.getElementById('join-modal');
  
  const closeTrialBtn = document.getElementById('close-trial');
  const closeJoinBtn = document.getElementById('close-join');

  // Open Free Trial Modal
  document.querySelectorAll('.btn-trial').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (trialModal) trialModal.classList.add('active');
    });
  });

  // Open Join Now / Membership Modal
  document.querySelectorAll('.btn-join, .btn-gold, .cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (joinModal) joinModal.classList.add('active');
    });
  });

  // Close Modals via Close Button
  if (closeTrialBtn) {
    closeTrialBtn.addEventListener('click', () => {
      trialModal.classList.remove('active');
    });
  }

  if (closeJoinBtn) {
    closeJoinBtn.addEventListener('click', () => {
      joinModal.classList.remove('active');
    });
  }

  // Close Modals when clicking outside the card overlay
  window.addEventListener('click', (e) => {
    if (e.target === trialModal) trialModal.classList.remove('active');
    if (e.target === joinModal) joinModal.classList.remove('active');
  });

  // Free Trial Form Submission
  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your Free Trial session has been booked successfully. Our team will contact you shortly.');
      trialModal.classList.remove('active');
      trialForm.reset();
    });
  }

  // Join Now Form Submission
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Welcome to Phoenix Gym! Your membership application has been submitted successfully.');
      joinModal.classList.remove('active');
      joinForm.reset();
    });
  }


  /* --- 2. SMOOTH SCROLLING FOR NAVBAR LINKS --- */
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Check if it's an internal hash link
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });

          // Update active class state on navigation items
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });


  /* --- 3. CONTACT FORM SUBMISSION --- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your inquiry has been submitted! Our expert will get in touch with you soon.');
      contactForm.reset();
    });
  }

});

/* --- Newsletter Form Submission --- */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Phoenix Gym newsletter!');
    newsletterForm.reset();
  });
}


/* ==========================================================
   BACKEND FORM SUBMISSION LOGIC (AJAX)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Free Trial Form Submission
  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('action', 'trial');
      formData.append('name', trialForm.querySelector('input[type="text"]').value);
      formData.append('phone', trialForm.querySelector('input[type="tel"]').value);
      formData.append('slot', trialForm.querySelector('select').value);

      fetch('process.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if(data.status === 'success') {
          document.getElementById('trial-modal').classList.remove('active');
          trialForm.reset();
        }
      })
      .catch(error => console.error('Error:', error));
    });
  }

  // 2. Join Now Form Submission
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('action', 'join');
      formData.append('name', joinForm.querySelector('input[type="text"]').value);
      formData.append('email', joinForm.querySelector('input[type="email"]').value);
      formData.append('phone', joinForm.querySelector('input[type="tel"]').value);
      formData.append('plan', joinForm.querySelector('select').value);

      fetch('process.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if(data.status === 'success') {
          document.getElementById('join-modal').classList.remove('active');
          joinForm.reset();
        }
      })
      .catch(error => console.error('Error:', error));
    });
  }

  // 3. Contact / Get In Touch Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selects = contactForm.querySelectorAll('select');
      const inputs = contactForm.querySelectorAll('input');

      const formData = new FormData();
      formData.append('action', 'contact');
      formData.append('department', selects[0].value);
      formData.append('name', inputs[0].value);
      formData.append('email', inputs[1].value);
      formData.append('phone', inputs[2].value);
      formData.append('state', selects[1].value);
      formData.append('city', selects[2].value);

      fetch('process.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if(data.status === 'success') {
          contactForm.reset();
        }
      })
      .catch(error => console.error('Error:', error));
    });
  }

});