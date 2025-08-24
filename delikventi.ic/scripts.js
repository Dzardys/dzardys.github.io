function parseDate(str) {
  const parts = str.split(".");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(p => parseInt(p, 10));
  return new Date(y, m - 1, d);
}

function sortTable(table, colIndex, type, asc) {
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const collator = new Intl.Collator('cs', { sensitivity: 'base' });

  const rowsWithIndex = rows.map((row, i) => ({ row, i }));

  rowsWithIndex.sort((a, b) => {
    const aText = (a.row.cells[colIndex]?.textContent || '').trim();
    const bText = (b.row.cells[colIndex]?.textContent || '').trim();

    if (type === 'number') {
      const aNum = parseFloat(aText.replace(',', '.')) || 0;
      const bNum = parseFloat(bText.replace(',', '.')) || 0;
      return asc ? aNum - bNum : bNum - aNum;
    } else if (type === 'date') {
      const aDate = parseDate(aText);
      const bDate = parseDate(bText);
      if (!aDate || !bDate) return 0;
      return asc ? aDate - bDate : bDate - aDate;
    } else {
      const cmp = collator.compare(aText, bText);
      if (cmp !== 0) return asc ? cmp : -cmp;
      return a.i - b.i;
    }
  });

  rowsWithIndex.forEach(({ row }) => tbody.appendChild(row));
}

function loadData() {
  const tbody = document.getElementById('delikventi').tBodies[0];
  const total = document.getElementById('total');

  fetch('delikventi.json')
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = '';
      data.forEach(d => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = d.id;
        tr.appendChild(th);

        const tdFoto = document.createElement('td');
        if (d.foto) {
          const img = document.createElement('img');
          img.src = d.foto;
          img.alt = 'Foto';
          img.style.maxWidth = '150px';
          img.style.maxHeight = '150px';
          img.style.objectFit = 'cover';
          tdFoto.appendChild(img);
        } else {
          tdFoto.textContent = 'není';
        }
        tr.appendChild(tdFoto);

        const tdJmeno = document.createElement('td');
        tdJmeno.textContent = d.jmeno;
        tr.appendChild(tdJmeno);

        const tdDatum = document.createElement('td');
        tdDatum.textContent = d.datum;
        tr.appendChild(tdDatum);

        tbody.appendChild(tr);
      });

      total.textContent = data.length;
    })
    .catch(err => console.error('Chyba při načítání JSON:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('delikventi');
  const sortableHeaders = table.querySelectorAll('thead th.sortable');

  let currentSort = { col: 2, asc: true };

  function updateIndicators(activeTh) {
    sortableHeaders.forEach(th => th.removeAttribute('data-sort'));
    if (activeTh) {
      activeTh.setAttribute('data-sort', currentSort.asc ? 'asc' : 'desc');
    }
  }

  sortableHeaders.forEach(th => {
    th.addEventListener('click', () => {
      const col = parseInt(th.dataset.col, 10);
      const type = th.dataset.type || 'string';

      if (currentSort.col === col) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort.col = col;
        currentSort.asc = true;
      }

      sortTable(table, col, type, currentSort.asc);
      updateIndicators(th);
    });
  });

  loadData();

  setTimeout(() => {
    sortTable(table, currentSort.col, 'string', currentSort.asc);
    const defaultTh = Array.from(sortableHeaders).find(th => +th.dataset.col === currentSort.col);
    updateIndicators(defaultTh);
  }, 100);
});
