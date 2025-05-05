window.addEventListener("DOMContentLoaded", () => {
    fetch("https://dog.ceo/api/breeds/image/random/10")
      .then(res => res.json())
      .then(data => {
        const carousel = document.getElementById("carousel");
        data.message.forEach(url => {
          const img = document.createElement("img");
          img.src = url;
          img.className = "slider-item";
          carousel.appendChild(img);
        });
        new Slider(".slider");
      });
  
    fetch("https://api.dogapi.dog/api/v2/breeds")
      .then(res => res.json())
      .then(data => {
        const btnContainer = document.getElementById("breed-buttons");
        const infoContainer = document.getElementById("breed-info");
        data.data.forEach(breedEntry => {
          const breed = breedEntry.attributes;
          const btn = document.createElement("button");
          btn.className = "nav-button";
          btn.textContent = breed.name;
          btn.onclick = () => {
            infoContainer.innerHTML = `
              <h3>${breed.name}</h3>
              <p>${breed.description || 'No description available.'}</p>
              <p>Lifespan: ${breed.life.min} - ${breed.life.max} years</p>
            `;
            infoContainer.style.display = "block";
          };
          btnContainer.appendChild(btn);
        });
      });
  });
  
