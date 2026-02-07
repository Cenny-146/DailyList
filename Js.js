document.getElementById('addBtn').onclick = function() {
    const date = document.getElementById('Date').value;
    const task = document.getElementById('Task').value.trim();
    const warning = document.getElementById('warning');
    if (!date || !task) {
        warning.textContent = 'Mohon isi kedua form: Date dan Task!';
        return;
    }
    warning.textContent = '';

    // Buat elemen li dan kotak data
    const li = document.createElement('li');
    const dataBox = document.createElement('div');
    dataBox.className = 'data-box';
    dataBox.textContent = `${date} - ${task}`;

    // Tambahkan tombol hapus
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.className = 'delete-btn';
    delBtn.onclick = function() {
        li.remove();
    };

    li.appendChild(dataBox);
    li.appendChild(delBtn);

    document.getElementById('list').appendChild(li);
    document.getElementById('Task').value = '';
    document.getElementById('Date').value = '';
};
let todos = [];
let sortAsc = true; // true: tanggal terdekat, false: tanggal terlama

function renderList(data) {
    const list = document.getElementById('list');
    list.innerHTML = '';
    data.forEach((item, idx) => {
        const li = document.createElement('li');
        const dataBox = document.createElement('div');
        dataBox.className = 'data-box';
        dataBox.textContent = `${item.date} - ${item.task}`;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Hapus';
        delBtn.className = 'delete-btn';
        delBtn.onclick = function() {
            todos.splice(idx, 1);
            renderList(getSortedTodos());
        };

        li.appendChild(dataBox);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function getSortedTodos() {
    return [...todos].sort((a, b) => 
        sortAsc
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date)
    );
}

document.getElementById('addBtn').onclick = function() {
    const date = document.getElementById('Date').value;
    const task = document.getElementById('Task').value.trim();
    const warning = document.getElementById('warning');
    if (!date || !task) {
        warning.textContent = 'Mohon isi kedua form: Date dan Task!';
        return;
    }
    warning.textContent = '';
    todos.push({ date, task });
    renderList(getSortedTodos());
    document.getElementById('Task').value = '';
    document.getElementById('Date').value = '';
};

// Dropdown filter logic
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
filterBtn.onclick = function() {
    filterMenu.style.display = filterMenu.style.display === 'none' ? 'flex' : 'none';
};

// Filter by nearest date
document.getElementById('filter-near').onclick = function() {
    sortAsc = true;
    renderList(getSortedTodos());
    filterMenu.style.display = 'none';
};

// Filter by farthest date
document.getElementById('filter-far').onclick = function() {
    sortAsc = false;
    renderList(getSortedTodos());
    filterMenu.style.display = 'none';
};

// Hide menu if click outside
document.addEventListener('click', function(e) {
    if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
        filterMenu.style.display = 'none';
    }
});

// Initial render
renderList(getSortedTodos());