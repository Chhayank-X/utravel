import './style.css';

// Budget Estimator Logic
const form = document.getElementById('budget-form');
const resultsContainer = document.getElementById('budget-results');
const totalCostEl = document.getElementById('total-cost');
const breakdownEl = document.getElementById('cost-breakdown');

// Base costs per day (in INR)
const baseCosts = {
  mathura: { budget: 1500, standard: 3000, luxury: 8000 },
  agra: { budget: 2000, standard: 4000, luxury: 10000 },
  delhi: { budget: 2500, standard: 5000, luxury: 12000 }
};

// Breakdown percentages
const breakdownPct = {
  accommodation: 0.40,
  food: 0.30,
  transport: 0.15,
  activities: 0.15
};

const mapIframe = document.getElementById('city-map');
const mapCityName = document.getElementById('map-city-name');
const citySelect = document.getElementById('b-city');
const itineraryCityName = document.getElementById('itinerary-city-name');
let currentCity = 'mathura';

citySelect.addEventListener('change', (e) => {
  const city = e.target.value;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  mapCityName.textContent = cityName;
  mapIframe.src = `https://maps.google.com/maps?q=${cityName},India&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  
  // Update itinerary
  currentCity = city;
  if (itineraryCityName) {
    itineraryCityName.textContent = cityName;
  }
  
  // Reset tabs to Day 1
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  if (tabs.length > 0) {
    tabs[0].classList.add('active');
  }
  if (typeof renderTimeline === 'function') {
    renderTimeline(1);
  }
});

// Initialize map state to match current select value
citySelect.dispatchEvent(new Event('change'));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const city = document.getElementById('b-city').value;
  const days = parseInt(document.getElementById('b-days').value);
  const people = parseInt(document.getElementById('b-people').value);
  const style = document.getElementById('b-style').value;
  
  const costPerDay = baseCosts[city][style];
  const totalCost = costPerDay * days * people;
  
  // Update UI
  resultsContainer.style.display = 'flex';
  
  // Format as INR currency
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  
  totalCostEl.textContent = formatter.format(totalCost);
  
  // Render breakdown
  breakdownEl.innerHTML = '';
  const breakdownLabels = {
    accommodation: 'Accommodation',
    food: 'Food & Dining',
    transport: 'Local Transport',
    activities: 'Tourist Places & Activities'
  };
  
  for (const [key, pct] of Object.entries(breakdownPct)) {
    const itemCost = totalCost * pct;
    
    // Create HTML
    const html = `
      <div class="breakdown-item">
        <div class="breakdown-header">
          <span>${breakdownLabels[key]}</span>
          <span>${formatter.format(itemCost)}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%"></div>
        </div>
      </div>
    `;
    breakdownEl.insertAdjacentHTML('beforeend', html);
  }
  
  // Animate progress bars
  setTimeout(() => {
    const fills = document.querySelectorAll('.progress-fill');
    fills.forEach((fill, index) => {
      const pcts = Object.values(breakdownPct);
      fill.style.width = `${pcts[index] * 100}%`;
    });
  }, 50);
});

// Itinerary Tabs Logic
const itineraryData = {
  mathura: {
    1: [
      { time: '09:00 AM', place: 'Shri Krishna Janmabhoomi', category: 'Heritage', desc: 'Visit the birthplace of Lord Krishna.' },
      { time: '12:00 PM', place: 'Dwarkadhish Temple', category: 'Spiritual', desc: 'Experience the morning aarti and beautiful architecture.' },
      { time: '04:00 PM', place: 'Vishram Ghat', category: 'Culture', desc: 'Witness the serene evening aarti by the Yamuna river.' }
    ],
    2: [
      { time: '10:00 AM', place: 'Govardhan Hill', category: 'Nature', desc: 'Explore the sacred hill and its parikrama path.' },
      { time: '01:00 PM', place: 'Local Markets', category: 'Food & Shopping', desc: 'Try famous Mathura pedas and shop for souvenirs.' },
      { time: '04:00 PM', place: 'Kusum Sarovar', category: 'Heritage', desc: 'Relax by the historic sandstone monument.' }
    ],
    3: [
      { time: '09:30 AM', place: 'Prem Mandir (Vrindavan)', category: 'Spiritual', desc: 'Visit the stunning white marble temple nearby.' },
      { time: '01:00 PM', place: 'Banke Bihari Temple', category: 'Spiritual', desc: 'Experience the deep devotion of the local culture.' },
      { time: '05:00 PM', place: 'ISKCON Temple', category: 'Spiritual', desc: 'Attend the evening kirtan and light show.' }
    ]
  },
  agra: {
    1: [
      { time: '06:00 AM', place: 'Taj Mahal', category: 'Heritage', desc: 'Experience the magical sunrise at the world wonder.' },
      { time: '11:00 AM', place: 'Agra Fort', category: 'Monument', desc: 'Explore the magnificent red sandstone Mughal fort.' },
      { time: '04:00 PM', place: 'Mehtab Bagh', category: 'Nature', desc: 'Enjoy a sunset view of the Taj Mahal from across the river.' }
    ],
    2: [
      { time: '09:00 AM', place: 'Fatehpur Sikri', category: 'Heritage', desc: 'Visit the abandoned Mughal capital and its stunning palaces.' },
      { time: '02:00 PM', place: 'Sadar Bazaar', category: 'Food & Shopping', desc: 'Shop for leather goods and try famous Agra petha.' },
      { time: '05:00 PM', place: 'Tomb of Itimad-ud-Daulah', category: 'Monument', desc: 'Explore the "Baby Taj" with its intricate marble inlay.' }
    ],
    3: [
      { time: '10:00 AM', place: 'Akbar\'s Tomb', category: 'Heritage', desc: 'Admire the final resting place of Emperor Akbar.' },
      { time: '01:00 PM', place: 'Kinari Bazaar', category: 'Culture', desc: 'Walk through the narrow lanes of the old city.' },
      { time: '04:00 PM', place: 'Kalakriti Cultural Center', category: 'Entertainment', desc: 'Watch a theatrical performance about the Taj Mahal.' }
    ]
  },
  delhi: {
    1: [
      { time: '09:00 AM', place: 'Red Fort', category: 'Heritage', desc: 'Explore the historic 17th-century fort of the Mughal Emperors.' },
      { time: '12:00 PM', place: 'Chandni Chowk', category: 'Food & Culture', desc: 'Navigate the bustling alleys and try famous street foods.' },
      { time: '03:30 PM', place: 'Jama Masjid', category: 'Monument', desc: 'Visit one of the largest mosques in India.' }
    ],
    2: [
      { time: '10:00 AM', place: 'Qutub Minar', category: 'Heritage', desc: 'Marvel at the UNESCO World Heritage minaret.' },
      { time: '01:00 PM', place: 'Hauz Khas Village', category: 'Food & Culture', desc: 'Enjoy lunch by the lake and explore boutiques.' },
      { time: '04:00 PM', place: 'Lotus Temple', category: 'Monument', desc: 'Experience peace at the stunning flower-shaped temple.' }
    ],
    3: [
      { time: '09:30 AM', place: 'India Gate', category: 'Monument', desc: 'Walk around the iconic war memorial.' },
      { time: '12:00 PM', place: 'National Museum', category: 'Heritage', desc: 'Dive into India\'s rich history and artifacts.' },
      { time: '04:00 PM', place: 'Connaught Place', category: 'Shopping', desc: 'Shop and dine in the heart of modern Delhi.' }
    ]
  }
};

const tabs = document.querySelectorAll('.tab-btn');
const timelineContainer = document.getElementById('timeline-container');

function renderTimeline(day) {
  if (!timelineContainer) return;
  timelineContainer.innerHTML = '';
  const items = itineraryData[currentCity][day];
  
  items.forEach(item => {
    const html = `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-content">
          <h4>${item.place}</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">${item.desc}</p>
          <span class="tag">${item.category}</span>
        </div>
      </div>
    `;
    timelineContainer.insertAdjacentHTML('beforeend', html);
  });
}

// Initial render
renderTimeline(1);

// Add event listeners to tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class
    tabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked
    tab.classList.add('active');
    // Render
    renderTimeline(tab.dataset.day);
  });
});
