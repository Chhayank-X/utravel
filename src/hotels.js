import './style.css';

const hotelsData = {
  mathura: [
    { name: "The Heritage Vrindavan", rating: "4.8", reviews: 342, price: "₹4,500", img: "/utravel/hotel_mathura.png", desc: "Experience spiritual tranquility with modern luxury near the sacred temples.", amenities: ["Free Breakfast", "Temple Shuttle", "Spa"] },
    { name: "Ganges Inn", rating: "4.5", reviews: 210, price: "₹2,800", img: "/utravel/hotel_mathura.png", desc: "Comfortable and affordable stay right by the vibrant city center.", amenities: ["Free WiFi", "AC", "Restaurant"] },
    { name: "Krishna Palace Grand", rating: "4.9", reviews: 520, price: "₹8,000", img: "/utravel/hotel_mathura.png", desc: "A 5-star experience featuring traditional architecture and premium dining.", amenities: ["Pool", "Luxury Dining", "Gym"] }
  ],
  agra: [
    { name: "The Oberoi Amarvilas", rating: "5.0", reviews: 1204, price: "₹35,000", img: "/utravel/hotel_agra.png", desc: "Unrivaled luxury with uninterrupted views of the Taj Mahal from every room.", amenities: ["Taj Mahal View", "Butler Service", "Pool"] },
    { name: "Taj Hotel & Convention", rating: "4.7", reviews: 856, price: "₹8,500", img: "/utravel/hotel_agra.png", desc: "Modern luxury hotel located just minutes away from the Taj Mahal.", amenities: ["Infinity Pool", "Spa", "Lounge"] },
    { name: "Agra Heritage Retreat", rating: "4.4", reviews: 430, price: "₹3,200", img: "/utravel/hotel_agra.png", desc: "A cozy boutique hotel featuring traditional Mughal-inspired decor.", amenities: ["Rooftop Cafe", "Free Breakfast", "WiFi"] }
  ],
  delhi: [
    { name: "The Leela Palace", rating: "4.9", reviews: 2100, price: "₹18,000", img: "/utravel/hotel_delhi.png", desc: "Opulent architecture and world-class luxury in the heart of New Delhi.", amenities: ["Rooftop Pool", "Fine Dining", "Spa"] },
    { name: "Taj Mahal Hotel", rating: "4.8", reviews: 1850, price: "₹15,000", img: "/utravel/hotel_delhi.png", desc: "Iconic luxury hotel offering impeccable service and elegant rooms.", amenities: ["City View", "Gym", "Lounge"] },
    { name: "Boutique Delhi Inn", rating: "4.5", reviews: 670, price: "₹4,500", img: "/utravel/hotel_delhi.png", desc: "A modern, trendy hotel perfect for travelers exploring the bustling city.", amenities: ["Free Breakfast", "Near Metro", "Cafe"] }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hotels-container');
  const title = document.getElementById('hotel-city-title');
  const buttons = document.querySelectorAll('.hotel-city-btn');

  // Determine initial city
  let currentCity = localStorage.getItem('selectedCity') || 'mathura';
  
  function renderHotels(city) {
    container.innerHTML = '';
    title.textContent = `Top Hotels in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    
    const hotels = hotelsData[city];
    hotels.forEach(hotel => {
      const html = `
        <div class="card">
          <div class="card-img" style="background-image: url('${hotel.img}')"></div>
          <div class="card-content">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
              <h3 style="margin-bottom: 0;">${hotel.name}</h3>
              <div style="color: var(--accent-gold); font-size: 0.9rem; font-weight: bold;">
                <i class="fa-solid fa-star"></i> ${hotel.rating} <span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: normal;">(${hotel.reviews})</span>
              </div>
            </div>
            <p>${hotel.desc}</p>
            <div style="margin-bottom: 20px;">
              ${hotel.amenities.map(a => `<span class="tag" style="margin-right: 5px; margin-top: 5px;">${a}</span>`).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
              <div>
                <span style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">${hotel.price}</span>
                <span style="color: var(--text-secondary); font-size: 0.8rem;">/ night</span>
              </div>
              <button class="btn btn-primary" style="padding: 8px 20px; font-size: 0.9rem;">Book Now</button>
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
      renderHotels(selectedCity);
    });
  });

  // Initial render
  renderHotels(currentCity);
});
