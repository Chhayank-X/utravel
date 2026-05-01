import './style.css';

const placesData = {
  mathura: [
    { name: "Shri Krishna Janmabhoomi", type: "Temple", timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:30 PM", entry: "Free", img: "/utravel/mathura.png", desc: "The sacred birthplace of Lord Krishna. A highly revered complex consisting of a prison cell and magnificent temples." },
    { name: "Dwarkadhish Temple", type: "Heritage", timings: "6:30 AM - 10:30 AM, 4:00 PM - 7:00 PM", entry: "Free", img: "/utravel/mathura.png", desc: "One of the oldest and largest temples in Mathura, famous for its stunning architecture and vibrant aarti." },
    { name: "Vishram Ghat", type: "Culture", timings: "Open 24 hours (Evening Aarti at 7 PM)", entry: "Free", img: "/utravel/mathura.png", desc: "The most important ghat along the river Yamuna, where Lord Krishna is believed to have rested." },
    { name: "Govardhan Hill", type: "Nature & Spiritual", timings: "Open 24 hours", entry: "Free", img: "/utravel/mathura.png", desc: "A sacred sandstone hill associated with Lord Krishna's pastimes. Visitors often perform parikrama (circumambulation) around it." }
  ],
  agra: [
    { name: "Taj Mahal", type: "World Wonder", timings: "Sunrise to Sunset (Closed Fridays)", entry: "₹50 (Indians), ₹1100 (Foreigners)", img: "/utravel/agra.png", desc: "The iconic ivory-white marble mausoleum built by Mughal Emperor Shah Jahan for his favorite wife, Mumtaz Mahal." },
    { name: "Agra Fort", type: "Monument", timings: "6:00 AM - 6:00 PM", entry: "₹40 (Indians), ₹550 (Foreigners)", img: "/utravel/agra.png", desc: "A UNESCO World Heritage site, this massive red sandstone fort was the main residence of the emperors of the Mughal Dynasty." },
    { name: "Fatehpur Sikri", type: "Heritage", timings: "6:00 AM - 6:00 PM", entry: "₹40 (Indians), ₹550 (Foreigners)", img: "/utravel/agra.png", desc: "The abandoned royal city founded by Emperor Akbar, boasting some of the finest examples of Mughal architecture." },
    { name: "Mehtab Bagh", type: "Nature", timings: "6:00 AM - 6:00 PM", entry: "₹25 (Indians), ₹300 (Foreigners)", img: "/utravel/agra.png", desc: "A beautiful garden complex situated on the opposite bank of the Yamuna River, offering spectacular sunset views of the Taj Mahal." }
  ],
  delhi: [
    { name: "Red Fort", type: "Monument", timings: "9:30 AM - 4:30 PM (Closed Mondays)", entry: "₹35 (Indians), ₹500 (Foreigners)", img: "/utravel/delhi.png", desc: "A historic fort in the city center that served as the main residence of the Mughal Emperors. Famous for its massive red sandstone walls." },
    { name: "Qutub Minar", type: "Heritage", timings: "7:00 AM - 5:00 PM", entry: "₹35 (Indians), ₹550 (Foreigners)", img: "/utravel/delhi.png", desc: "A towering 73-meter high victory tower and UNESCO World Heritage site featuring intricate Islamic architecture." },
    { name: "India Gate", type: "Monument", timings: "Open 24 hours", entry: "Free", img: "/utravel/delhi.png", desc: "An iconic 42m-high war memorial arch honoring Indian soldiers, surrounded by lush lawns perfect for evening strolls." },
    { name: "Lotus Temple", type: "Spiritual", timings: "9:00 AM - 5:30 PM (Closed Mondays)", entry: "Free", img: "/utravel/delhi.png", desc: "A Bahá'í House of Worship notable for its stunning flower-like shape. Open to all, regardless of religion." }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('places-container');
  const title = document.getElementById('place-city-title');
  const buttons = document.querySelectorAll('.place-city-btn');

  // Determine initial city
  let currentCity = localStorage.getItem('selectedCity') || 'mathura';
  
  function renderPlaces(city) {
    container.innerHTML = '';
    title.textContent = `Top Tourist Places in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    
    const places = placesData[city];
    places.forEach(place => {
      const html = `
        <div class="card">
          <div class="card-img" style="background-image: url('${place.img}')"></div>
          <div class="card-content">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
              <h3 style="margin-bottom: 0;">${place.name}</h3>
              <span class="tag" style="margin-top: 0;">${place.type}</span>
            </div>
            <p>${place.desc}</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; margin-top: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                <i class="fa-regular fa-clock" style="color: var(--accent-orange); width: 20px;"></i>
                <span>${place.timings}</span>
              </div>
              <div style="display: flex; align-items: center; color: var(--text-secondary); font-size: 0.9rem;">
                <i class="fa-solid fa-ticket" style="color: var(--accent-orange); width: 20px;"></i>
                <span>Entry: <strong style="color: var(--text-primary);">${place.entry}</strong></span>
              </div>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });

    // Update active button
    buttons.forEach(btn => {
      if (btn.dataset.city === city) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Event listeners for city buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedCity = e.target.dataset.city;
      localStorage.setItem('selectedCity', selectedCity);
      renderPlaces(selectedCity);
    });
  });

  // Initial render
  renderPlaces(currentCity);
});
