
  

  // Gestion du menu hamburger avec changement d'icône
  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.getElementById('menuIcon');
    const closeIconSrc = '/img/menu1.png';
    const menuIconSrc = '/img/menu.png';
    let isMenuOpen = false;

    hamburger.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;
      
      // Toggle menu
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Changer l'icône
      menuIcon.src = isMenuOpen ? closeIconSrc : menuIconSrc;
    });

    // Fermer le menu quand un lien est cliqué (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          menuIcon.src = menuIconSrc;
          isMenuOpen = false;
        }
      });
    });
  });



  // Effet de fleurs au mouvement de la souris
//   const symbols = ['🌸', '🌷', '🌹', '🌺', '💮', '🌻'];
//   const symbols = ['🌸', '💮', '🌸', '💮', '🌸', '💮'];


//   const colors = ['#ff9ecf', '#ffb6c1', '#ffc0cb', '#ff69b4', '#f08080', '#ff77ff'];
//   let lastSparkleTime = 0;

//   document.addEventListener('mousemove', (e) => {
//     const now = Date.now();
    
//     if (now - lastSparkleTime > 120) {
//       lastSparkleTime = now;

//       const sparkle = document.createElement('div');
//       sparkle.className = 'sparkle';
//       sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
//       sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
//       sparkle.style.left = (e.pageX + (Math.random() * 6 - 3)) + 'px';
//       sparkle.style.top = (e.pageY + (Math.random() * 6 - 3)) + 'px';
//       document.body.appendChild(sparkle);

//       setTimeout(() => {
//         sparkle.remove();
//       }, 2500);
//     }
//   });


// Configuration des pétales
const petalTextures = [
  '/img/flower1.png', 
  '/img/flower2.png',
  '/img/flower3.png'
];

let lastPetalTime = 0;
let petalQueue = []; // File d'attente pour gérer l'apparition un par un

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  
  // Ajoute une position à la file d'attente toutes les 150ms max
  if (now - lastPetalTime > 150) {
    lastPetalTime = now;
    petalQueue.push({ x: e.clientX, y: e.clientY });
    
    // Si c'est le premier élément, on lance le traitement
    if (petalQueue.length === 1) {
      processPetalQueue();
    }
  }
});

function processPetalQueue() {
  if (petalQueue.length === 0) return;
  
  const position = petalQueue.shift();
  createFallingElement(position.x, position.y);
  
  // Traite l'élément suivant après un délai aléatoire
  if (petalQueue.length > 0) {
    setTimeout(processPetalQueue, 100 + Math.random() * 200);
  }
}

function createFallingElement(x, y) {
  const element = document.createElement('img');
  element.className = 'falling-element';
  element.src = petalTextures[Math.floor(Math.random() * petalTextures.length)];
  
  // Position aléatoire autour du curseur (plus serré)
  const offsetX = (Math.random() * 30 - 15);
  const offsetY = (Math.random() * 30 - 15);
  
  // Taille plus homogène
  const size = 10 + Math.random() * 8;
  
  // Durée d'animation plus courte
  const duration = 2 + Math.random() * 2;
  
  element.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    left: ${x + offsetX}px;
    top: ${y + offsetY}px;
    pointer-events: none;
    z-index: 9999;
    opacity: ${0.7 + Math.random() * 0.3};
    transform: rotate(${Math.random() * 360}deg);
    animation: floatDown ${duration}s ease-in forwards;
    filter: brightness(1.1) saturate(1.3);
  `;
  
  document.body.appendChild(element);
  
  // Suppression après l'animation
  setTimeout(() => {
    element.remove();
  }, duration * 1000);
}


// Ajoutez ce CSS dans votre page
const style = document.createElement('style');
style.textContent = `
@keyframes floatDown {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(${Math.random() * 60 - 30}px, 50px) rotate(${180 + Math.random() * 180}deg) scale(0.8);
  }
  100% {
    transform: translate(${Math.random() * 100 - 50}px, ${150 + Math.random() * 100}px) rotate(${360 + Math.random() * 360}deg) scale(0.5);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

  // Gestion des liens actifs dans la navigation
  document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Fonction pour mettre à jour le lien actif lors du défilement
    function updateActiveLink() {
      let currentSectionId = '';
      let closestSection = null;
      let minDistance = Infinity;
      
      // Trouver la section la plus proche du haut de la fenêtre
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Ajout d'une marge pour une meilleure détection
        
        const distance = Math.abs(scrollPosition - sectionTop);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (distance < minDistance) {
            minDistance = distance;
            currentSectionId = section.id;
            closestSection = section;
          }
        }
      });
      
      // Mettre à jour la classe active sur les liens de navigation
      navLinks.forEach(link => {
        // Extraire l'ID de la section cible du lien
        const targetSectionId = link.getAttribute('href').substring(1);
        
        if (targetSectionId === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      // Si nous sommes tout en haut de la page, activer le lien "Accueil"
      if (window.scrollY < 100) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }
    
    // Mettre à jour la première fois
    updateActiveLink();
    
    // Mettre à jour lors du défilement
    window.addEventListener('scroll', updateActiveLink);
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Animation typewriter pour le nom
    const nameElements = ['LADY', 'MIALY'];
    const nameDisplay = document.querySelector('.dynamic-name');
    let currentNameIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    
    function typeName() {
      const currentText = nameElements[currentNameIndex];
      
      if (isDeleting) {
        nameDisplay.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        nameDisplay.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeName, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentNameIndex = (currentNameIndex + 1) % nameElements.length;
        setTimeout(typeName, 500);
      } else {
        setTimeout(typeName, isDeleting ? 50 : 100);
      }
    }
    
    typeName();
   
});

//BANNER




//FLEUR ABOUT DE L'ECRAN
document.addEventListener('DOMContentLoaded', function() {
    // Configuration commune
    const section = document.getElementById('about');
    const sectionHeight = section.offsetHeight;
    
    // Système de fleurs principales
    const flowersContainer = document.querySelector('.falling-flowers');
    flowersContainer.style.setProperty('--section-height', `${sectionHeight}px`);
    
    const flowerImages = [
      '/img/fleur.png',
      '/img/fleur.png' // Répété volontairement pour varier les probabilités
    ];
    
    let flowerCount = 0;
    const maxFlowers = 30;
    
    function createFlower() {
        if (flowerCount >= maxFlowers) return;
        
        const flower = document.createElement('img');
        flower.classList.add('flower');
        flower.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        flower.alt = "Fleur décorative";
        flower.loading = "lazy";
        
        const randomX = Math.random() * window.innerWidth;
        flower.style.setProperty('--random-x', `${(Math.random() - 0.5) * 200}px`);
        flower.style.left = `${randomX}px`;
        
        const duration = 8 + Math.random() * 15;
        const size = 20 + Math.random() * 40;
        flower.style.animationDuration = `${duration}s`;
        flower.style.width = `${size}px`;
        flower.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        flowersContainer.appendChild(flower);
        flowerCount++;
        
        flower.addEventListener('animationend', () => {
            flower.remove();
            flowerCount--;
        });
    }
    
    function initFlowers() {
        for (let i = 0; i < 10; i++) {
            setTimeout(createFlower, Math.random() * 5000);
        }
        setInterval(createFlower, 800 + Math.random() * 2000);
    }
    
    // Système de pétales rapides
    const petalsContainer = document.querySelector('.falling-petals');
    petalsContainer.style.setProperty('--section-height', `${sectionHeight}px`);
    
    const petalImages = [
      '/img/flower1.png',
      '/img/flower2.png',
      '/img/flower3.png',
      '/img/flower4.png',
      '/img/flower5.png',
      '/img/flower6.png'
    ];
    
    let petalCount = 0;
    const maxPetals = 100;
    
    function createPetal() {
        if (petalCount >= maxPetals) return;
        
        const petal = document.createElement('img');
        petal.className = 'petal';
        petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
        petal.alt = "";
        petal.loading = "lazy";
        
        const randomX = Math.random() * window.innerWidth;
        petal.style.setProperty('--random-x', `${(Math.random() - 0.5) * 300}px`);
        petal.style.left = `${randomX}px`;
        
        const duration = 2 + Math.random() * 3;
        const size = 5 + Math.random() * 15;
        petal.style.animationDuration = `${duration}s`;
        petal.style.width = `${size}px`;
        petal.style.opacity = 0.6 + Math.random() * 0.4;
        
        petalsContainer.appendChild(petal);
        petalCount++;
        
        petal.addEventListener('animationend', () => {
            petal.remove();
            petalCount--;
        });
    }
    
    function initPetals() {
        // Création par vagues pour un effet naturel
        function createWave() {
            const waveSize = 5 + Math.floor(Math.random() * 10);
            for (let i = 0; i < waveSize; i++) {
                setTimeout(createPetal, i * 100);
            }
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(createWave, i * 1000);
        }
        setInterval(createWave, 1500);
        setInterval(createPetal, 200);
    }
    
    // Gestion du redimensionnement
    function handleResize() {
        const newHeight = section.offsetHeight;
        flowersContainer.style.setProperty('--section-height', `${newHeight}px`);
        petalsContainer.style.setProperty('--section-height', `${newHeight}px`);
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
    
    // Préchargement des images
    function preloadImages() {
        const allImages = [...flowerImages, ...petalImages];
        allImages.forEach(src => {
            new Image().src = src;
        });
    }
    
    // Initialisation
    initFlowers();
    initPetals();
    preloadImages();
});


const control = document.getElementById("direction-toggle");
const marquees = document.querySelectorAll(".marquee");
const wrapper = document.querySelector(".wrapper");

control.addEventListener("click", () => {
  control.classList.toggle("toggle--vertical");
  wrapper.classList.toggle("wrapper--vertical");
  [...marquees].forEach((marquee) =>
    marquee.classList.toggle("marquee--vertical")
  );
});


//EMAIL


