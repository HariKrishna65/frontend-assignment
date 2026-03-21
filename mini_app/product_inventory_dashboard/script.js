let products = [
    { id: 1, name: "Laptop", price: 55000, stock: 5, category: "electronics" },
    { id: 2, name: "Shirt", price: 1200, stock: 3, category: "clothing" },
    { id: 3, name: "Book", price: 500, stock: 10, category: "books" }
];

function renderProducts(list) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.name}</h3>
                <p>${p.category}</p>
                <p>₹${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="deleteProduct(${p.id})">Delete</button>
            </div>
        `;
    });
}

renderProducts(products);