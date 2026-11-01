/**
 * Elitewoods - Interactive Behaviors
 * WhatsApp direct lead routing, category filters, mobile navigation & smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PRIMARY = '917675810470';
  const WHATSAPP_SECONDARY = '918008871926';

  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Navbar Scroll Effect & Active Section Highlighting
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Product Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-cat');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Category Cards Click to Filter
  const categoryCards = document.querySelectorAll('.category-card[data-category]');
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const targetCat = card.getAttribute('data-category');
      if (targetCat && targetCat !== 'custom') {
        const correspondingFilterBtn = document.querySelector(`.filter-btn[data-filter="${targetCat}"]`);
        if (correspondingFilterBtn) {
          correspondingFilterBtn.click();
        }
      }
    });
  });

  // 4. Custom Quote Form submission -> Routes directly to WhatsApp with prefilled message
  const customQuoteForm = document.getElementById('customQuoteForm');
  if (customQuoteForm) {
    customQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cqName').value.trim();
      const phone = document.getElementById('cqPhone').value.trim();
      const wood = document.getElementById('cqWood').value;
      const type = document.getElementById('cqType').value;
      const details = document.getElementById('cqDetails').value.trim();

      const text = `*New Custom Furniture Enquiry - Elitewoods*%0A%0A` +
                   `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                   `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
                   `🪵 *Preferred Wood:* ${encodeURIComponent(wood)}%0A` +
                   `🛋️ *Furniture Category:* ${encodeURIComponent(type)}%0A` +
                   `📐 *Details/Dimensions:* ${encodeURIComponent(details || 'To be discussed with design sample')}%0A%0A` +
                   `_Sent from elitewoods website custom quote form._`;

      const waUrl = `https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`;
      window.open(waUrl, '_blank');
      customQuoteForm.reset();
    });
  }

  // 5. General Contact Enquiry Form -> Routes directly to WhatsApp
  const generalEnquiryForm = document.getElementById('generalEnquiryForm');
  if (generalEnquiryForm) {
    generalEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const city = document.getElementById('contactCity').value.trim();
      const interest = document.getElementById('contactInterest').value;
      const message = document.getElementById('contactMessage').value.trim();

      const text = `*Website Furniture Enquiry - Elitewoods*%0A%0A` +
                   `👤 *Customer Name:* ${encodeURIComponent(name)}%0A` +
                   `📱 *Mobile / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
                   `📍 *City / Location:* ${encodeURIComponent(city)}%0A` +
                   `🛋️ *Requirement:* ${encodeURIComponent(interest)}%0A` +
                   `📝 *Notes:* ${encodeURIComponent(message || 'Please send catalogues and pricing.')}%0A%0A` +
                   `_Sent via elitewoods website contact form._`;

      const waUrl = `https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`;
      window.open(waUrl, '_blank');
      generalEnquiryForm.reset();
    });
  }
});
