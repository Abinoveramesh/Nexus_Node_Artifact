// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemNameInput = document.getElementById('item-name');
    const itemList = document.getElementById('item-list');

    // Fetch items on page load
    fetchItems();

    // Handle form submission
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(itemNameInput.value);
        itemNameInput.value = ''; // Clear input
    });

    // Fetch items from server
    function fetchItems() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                itemList.innerHTML = '';
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteItem(item.id);
                    li.appendChild(deleteButton);
                    itemList.appendChild(li);
                });
            });
    }

    // Add item
    function addItem(name) {
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(() => fetchItems());
    }

    // Delete item
    function deleteItem(id) {
        fetch(`http://localhost:3000/api/items/${id}`, { method: 'DELETE' })
            .then(() => fetchItems());
    }
});
