async function loadVehicles() {
  try {
    const response = await fetch('vehicles.json');
    if (!response.ok) throw new Error('Nepodařilo se načíst JSON');
    const vehicles = await response.json();

    const container = document.getElementById('vehicles-container');
    vehicles.forEach(vehicle => {
      const div = document.createElement('div');
      div.className = "lead border p-3 rounded shadow mb-3";
      div.style.backgroundColor = "#e6f7ff";
      div.style.fontSize = "1rem";
      div.style.lineHeight = "1.2";

      div.innerHTML = `
        <h5 class="mb-2">${vehicle.date} ${vehicle.brand} ${vehicle.model}</h5>
        <p class="text-info mb-3">${vehicle.date}</p>

        <div class="row">
          <div class="col-md-8">
            <p><strong>VIN:</strong> <span>${vehicle.vin || 'není'}</span></p>
            <p><strong>Značka:</strong> <span>${vehicle.brand || 'není'}</span></p>
            <p><strong>Model:</strong> <span>${vehicle.model || 'není'}</span></p>
            <p><strong>Stav tachometru:</strong> <span>${vehicle.odo || 'není'}</span></p>
            <p><strong>Popis:</strong> <span>${vehicle.desc || 'není'}</span></p>
            <p><strong>Protokol:</strong> <span>${vehicle.logbook || 'není'}</span></p>
            <p class="mt-2 mb-1">
              <strong>Cena:</strong> 
              <span class="text-danger fw-bold">${vehicle.price || '1 Kč'}</span>
            </p>
          </div>

          <div class="col-md-4 text-center">
            <a href="${vehicle.gallery || '#'}" target="_blank">
              <img src="${vehicle.thumb || 'https://via.placeholder.com/150'}" 
                   class="img-fluid rounded border" 
                   alt="Obrázek" style="max-height: 100px;">
            </a>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadVehicles);