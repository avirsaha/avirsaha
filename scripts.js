// ==== Typing Effect ====

const phrases = [
  "I'm Aviraj Saha",
  "Machine Learning",
  "AI/ML Projects",
  "Follow my AI Journal!",
];

const typedText = document.getElementById("typed-text");
const cursor = document.querySelector(".cursor");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 50;
const erasingSpeed = 60;
const delayBetweenPhrases = 1500; // pause before deleting next phrase

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting && charIndex <= currentPhrase.length) {
    typedText.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
    setTimeout(typeLoop, typingSpeed);
  } else if (isDeleting && charIndex >= 0) {
    typedText.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
    setTimeout(typeLoop, erasingSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeLoop, delayBetweenPhrases);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, typingSpeed);
    }
  }
}

// about typing effect

// === Common Typing Speed ===
const aboutTypingSpeed = 15;

// === About Phrase 1 ===
const aboutPhrase1 = "I'm a developer and student with a strong foundation in tech and a focus on continuous learning.";
const typedAboutText1 = document.getElementById("typed-about1");
const container1 = document.getElementById("about-container-1");

let charAboutIndex1 = 0;
function typeOnce1(callback) {
  container1.style.display = 'block';
  if (charAboutIndex1 < aboutPhrase1.length) {
    typedAboutText1.textContent += aboutPhrase1.charAt(charAboutIndex1);
    charAboutIndex1++;
    setTimeout(() => typeOnce1(callback), aboutTypingSpeed);
  } else {
    document.querySelector(".cursor-about1").style.display = "none";
    if (callback) callback();
  }
}

// === About Phrase 2 ===
const aboutPhrase2 = "My skills include machine learning, MLOps, DevOps, cloud infrastructure, and programming.";
const typedAboutText2 = document.getElementById("typed-about2");
const container2 = document.getElementById("about-container-2");

let charAboutIndex2 = 0;
function typeOnce2(callback) {
  container2.style.display = 'block';
  if (charAboutIndex2 < aboutPhrase2.length) {
    typedAboutText2.textContent += aboutPhrase2.charAt(charAboutIndex2);
    charAboutIndex2++;
    setTimeout(() => typeOnce2(callback), aboutTypingSpeed);
  } else {
    document.querySelector(".cursor-about2").style.display = "none";
    if (callback) callback();
  }
}

// === About Phrase 3 ===
const aboutPhrase3 = "I'm experienced in research, using modern tools for analysis and productivity, and enjoy contributing to open-source projects.";
const typedAboutText3 = document.getElementById("typed-about3");
const container3 = document.getElementById("about-container-3");

let charAboutIndex3 = 0;
function typeOnce3(callback) {
  container3.style.display = 'block';
  if (charAboutIndex3 < aboutPhrase3.length) {
    typedAboutText3.textContent += aboutPhrase3.charAt(charAboutIndex3);
    charAboutIndex3++;
    setTimeout(() => typeOnce3(callback), aboutTypingSpeed);
  } else {
    document.querySelector(".cursor-about3").style.display = "none";
    if (callback) callback();
  }
}

// === About Phrase 4 ===
const aboutPhrase4 = "I'm open to research opportunities and collaborations — feel free to connect!";
const typedAboutText4 = document.getElementById("typed-about4");
const container4 = document.getElementById("about-container-4");

let charAboutIndex4 = 0;
function typeOnce4() {
  container4.style.display = 'block';
  if (charAboutIndex4 < aboutPhrase4.length) {
    typedAboutText4.textContent += aboutPhrase4.charAt(charAboutIndex4);
    charAboutIndex4++;
    setTimeout(typeOnce4, aboutTypingSpeed);
  } else {
    document.querySelector(".cursor-about4").style.display = "none";
  }
}

// === Combined Loader ===
window.onload = () => {
  // Hide all containers initially
  [container1, container2, container3, container4].forEach(container => {
    container.style.display = 'none';
  });

  setTimeout(typeLoop, 500); // Start header typing effect

  setTimeout(() => {
    typeOnce1(() => {
      typeOnce2(() => {
        typeOnce3(() => {
          typeOnce4();
        });
      });
    });
  }, 1000);
};

// ==== Glowing Border Canvas Animation ====

/*
(() => {
  const section = document.getElementById('about');
  const canvas = document.getElementById('border-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let pathLength;
  let positions = [];

  // Update canvas size and path positions based on section size
  function updateDimensions() {
    width = section.clientWidth;
    height = section.clientHeight;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    // Define rectangular path with slight inset (3px)
    positions = [
      { x: 3, y: 3 },                 // top-left
      { x: width - 3, y: 3 },         // top-right
      { x: width - 3, y: height - 3 },// bottom-right
      { x: 3, y: height - 3 }         // bottom-left
    ];

    pathLength = 2 * (width + height) - 24; // perimeter minus double offsets
  }

  // Linear interpolation helper between two points
  function lerp(p1, p2, t) {
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t,
    };
  }

  // Get x,y on path for given distance along perimeter
  function getPositionOnPath(distance) {
    distance = distance % pathLength;

    const edges = [
      { from: positions[0], to: positions[1], length: width - 6 },
      { from: positions[1], to: positions[2], length: height - 6 },
      { from: positions[2], to: positions[3], length: width - 6 },
      { from: positions[3], to: positions[0], length: height - 6 },
    ];

    let traveled = 0;
    for (const edge of edges) {
      if (distance <= traveled + edge.length) {
        const t = (distance - traveled) / edge.length;
        return lerp(edge.from, edge.to, t);
      }
      traveled += edge.length;
    }

    return positions[0]; // fallback
  }

  // Beam animation parameters
  const beamLength = 3000;
  const speed = 1000; // pixels per second

  let lastTime = null;
  let beamPos = 0;

  // Main animation loop
  function draw(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    beamPos = (beamPos + speed * delta) % pathLength;

    ctx.clearRect(0, 0, width, height);

    // Draw dim base border
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);
    for (let i = 1; i < positions.length; i++) {
      ctx.lineTo(positions[i].x, positions[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    // Draw glowing trailing beam
    const segments = 3000;
    for (let i = 0; i <= segments; i++) {
      let posAlong = beamPos - (beamLength * i) / segments;
      if (posAlong < 0) posAlong += pathLength;

      const p = getPositionOnPath(posAlong);
      const nextP = getPositionOnPath((posAlong + 2) % pathLength);

      const angle = Math.atan2(nextP.y - p.y, nextP.x - p.x);

      const alpha = 1 - i / segments;
      const beamWidth = 2 * alpha;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);

      const gradient = ctx.createLinearGradient(0, 0, beamWidth * 2, 0);
      gradient.addColorStop(0, `rgba(255, 0, 255, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(255, 0, 255, ${alpha})`);
      gradient.addColorStop(1, `rgba(255, 0, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, -beamWidth / 2, beamWidth * 2, beamWidth);

      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions);
  requestAnimationFrame(draw);
})();

*/
// ==== Mouse Glow Trail ====
/*
let lastPos = null;
let pending = false;
let currentPos = { x: 0, y: 0 };

document.body.addEventListener('mousemove', e => {
  currentPos.x = e.clientX;
  currentPos.y = e.clientY;

  if (!pending) {
    pending = true;
    requestAnimationFrame(spawnGlow);
  }
});

function spawnGlow() {
  if (!lastPos) lastPos = { ...currentPos };

  const dx = currentPos.x - lastPos.x;
  const dy = currentPos.y - lastPos.y;
  const distance = Math.hypot(dx, dy);

  const step = 4; // pixels between glows
  const stepsCount = Math.floor(distance / step);

  for (let i = 0; i < stepsCount; i++) {
    const x = lastPos.x + (dx * i) / stepsCount;
    const y = lastPos.y + (dy * i) / stepsCount;
    createGlow(x, y);
  }

  lastPos = { ...currentPos };
  pending = false;
}

function createGlow(x, y) {
  const glow = document.createElement('div');
  glow.classList.add('mouse-glow');
  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;
  document.body.appendChild(glow);
  glow.addEventListener('animationend', () => glow.remove());
}
*/
 function sharePage() {
    const shareData = {
      title: document.title,
      text: "Check out Aviraj Saha’s AI dev portfolio, smart work, slick design, serious talent!",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .catch(err => console.error("Share failed:", err));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(shareData.url)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => {
          console.error("Copy failed:", err);
          alert("Couldn't copy the link.");
        });
    }
  }
