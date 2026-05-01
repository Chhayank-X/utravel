import './style.css';

const foodData = {
  mathura: [
    { name: "Brijwasi Sweets", type: "Sweet Shop", timings: "7:00 AM - 10:00 PM", avgCost: "₹200 for two", img: "https://loremflickr.com/500/300/indian,sweets?random=1", desc: "The most famous sweet shop in Mathura. A must-visit to try their legendary Mathura Peda and milk sweets." },
    { name: "Oma Pehalwan Kachori", type: "Street Food", timings: "6:00 AM - 2:00 PM", avgCost: "₹100 for two", img: "https://loremflickr.com/500/300/indian,streetfood?random=2", desc: "Start your morning with crispy Kachoris and spicy Aloo Sabzi, followed by fresh hot Jalebis." },
    { name: "Shriji Lassi & Rabri", type: "Beverages", timings: "8:00 AM - 11:00 PM", avgCost: "₹150 for two", img: "https://loremflickr.com/500/300/indian,drink,lassi?random=3", desc: "Famous for their extremely thick, creamy Lassi topped with malai, and delicious Rabri." },
    { name: "Bansal Food Court", type: "Restaurant", timings: "11:00 AM - 10:30 PM", avgCost: "₹600 for two", img: "https://loremflickr.com/500/300/indian,thali?random=4", desc: "A premium vegetarian multi-cuisine food court perfect for families offering North Indian and South Indian thalis." }
  ],
  agra: [
    { name: "Panchhi Petha", type: "Sweet Shop", timings: "8:00 AM - 10:00 PM", avgCost: "₹300 for two", img: "https://loremflickr.com/500/300/indian,sweets?random=5", desc: "Agra's iconic sweet shop known for its enormous variety of Pethas, including Angoori, Paan, and Kesar flavors." },
    { name: "Pinch of Spice", type: "Restaurant", timings: "12:00 PM - 11:30 PM", avgCost: "₹1500 for two", img: "https://loremflickr.com/500/300/indian,curry?random=6", desc: "A highly-rated fine dining restaurant serving the best authentic Mughlai cuisine and curries in the city." },
    { name: "Deviram Sweets", type: "Street Food", timings: "7:00 AM - 10:00 PM", avgCost: "₹150 for two", img: "https://loremflickr.com/500/300/indian,breakfast?random=7", desc: "Famous among locals for the traditional Agra breakfast of Bedai (stuffed puri) with spicy sabzi and Jalebi." },
    { name: "Mama Chicken Mama Franky", type: "Fast Food", timings: "1:00 PM - 11:00 PM", avgCost: "₹400 for two", img: "https://loremflickr.com/500/300/indian,kebab?random=8", desc: "A highly popular fast-food joint known for their incredible chicken kebabs and frankie rolls." }
  ],
  delhi: [
    { name: "Karim's (Jama Masjid)", type: "Restaurant", timings: "9:00 AM - 1:00 AM", avgCost: "₹800 for two", img: "https://loremflickr.com/500/300/indian,mughlai?random=9", desc: "A historic culinary institution near Jama Masjid serving legendary Mughlai dishes like Mutton Korma and Kebabs." },
    { name: "Paranthe Wali Gali", type: "Street Food", timings: "9:00 AM - 11:00 PM", avgCost: "₹250 for two", img: "https://loremflickr.com/500/300/indian,paratha?random=10", desc: "A narrow street in Chandni Chowk famous for its historic shops serving deep-fried stuffed paranthas." },
    { name: "Sita Ram Diwan Chand", type: "Street Food", timings: "8:00 AM - 6:00 PM", avgCost: "₹200 for two", img: "https://loremflickr.com/500/300/indian,cholebhature?random=11", desc: "Widely considered the absolute best place in Delhi to eat authentic, fluffy Chole Bhature." },
    { name: "Cyber Hub Food Court", type: "Modern Dining", timings: "10:00 AM - 1:00 AM", avgCost: "₹1500 for two", img: "https://loremflickr.com/500/300/restaurant,dining?random=12", desc: "An upscale culinary destination featuring dozens of premium restaurants, cafes, and pubs in one grand location." }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('food-container');
  const title = document.getElementById('food-city-title');
  const buttons = document.querySelectorAll('.food-city-btn');

  // Determine initial city
  let currentCity = localStorage.getItem('selectedCity') || 'mathura';
  
  function renderFood(city) {
    container.innerHTML = '';
    title.textContent = `Famous Food in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    
    const foods = foodData[city];
    foods.forEach(food => {
      const html = `
        <div class="card">
          <div class="card-img" style="background-image: url('${food.img}')"></div>
          <div class="card-content">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
              <h3 style="margin-bottom: 0;">${food.name}</h3>
              <span class="tag" style="margin-top: 0; background: rgba(255,107,0,0.2);">${food.type}</span>
            </div>
            <p>${food.desc}</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; margin-top: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                <i class="fa-regular fa-clock" style="color: var(--accent-orange); width: 20px;"></i>
                <span>${food.timings}</span>
              </div>
              <div style="display: flex; align-items: center; color: var(--text-secondary); font-size: 0.9rem;">
                <i class="fa-solid fa-wallet" style="color: var(--accent-orange); width: 20px;"></i>
                <span>Cost: <strong style="color: var(--text-primary);">${food.avgCost}</strong></span>
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
      renderFood(selectedCity);
    });
  });

  // Initial render
  renderFood(currentCity);
});
