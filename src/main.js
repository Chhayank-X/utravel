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
};

const tabs = document.querySelectorAll('.tab-btn');
const timelineContainer = document.getElementById('timeline-container');

function renderTimeline(day) {
  timelineContainer.innerHTML = '';
  const items = itineraryData[day];
  
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
