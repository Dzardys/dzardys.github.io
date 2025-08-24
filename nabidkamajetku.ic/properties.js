async function loadProperties() {
  try {
    const response = await fetch('properties.json');
    if (!response.ok) throw new Error('Nepodařilo se načíst JSON');
    const properties = await response.json();

    const container = document.getElementById('properties-container');
    properties.forEach(property => {
      const div = document.createElement('div');
      div.className = "lead border p-3 rounded shadow mb-3";
      div.style.backgroundColor = "#e6f7ff";
      div.style.fontSize = "1rem";
      div.style.lineHeight = "1.2";

      div.innerHTML = `
        <h5 class="mb-2">${property.name}</h5>
        <p class="text-info mb-3">${property.date}</p>

        <div class="row">
          <div class="col-md-8">
            <p><strong>Typ:</strong> <span>${property.type || 'není'}</span></p>
            <p><strong>Lokalita:</strong> <span>${property.location || 'není'}</span></p>
            <p><strong>Popis:</strong> <span>${property.desc || 'není'}</span></p>
            <p class="mt-2 mb-1">
              <strong>Cena:</strong> 
              <span class="text-danger fw-bold">${property.price || 'není'}</span>
            </p>
          </div>

          <div class="col-md-4 text-center">
            <a href="${property.gallery || '#'}" target="_blank">
              <img src="${property.thumb || 'https://via.placeholder.com/150'}" 
                   class="img-fluid rounded border" 
                   alt="Obrázek nemovitosti" style="max-height: 100px;">
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

document.addEventListener('DOMContentLoaded', loadProperties);