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

document.getElementById("search").addEventListener("input", e => {
    let value = e.target.value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(value));
    renderProducts(filtered);
});
function filterProducts() {
    let category = document.getElementById("categoryFilter").value;

    let filtered = products.filter(p => {
        return category === "all" || p.category === category;
    });

    renderProducts(filtered);
}
document.getElementById("sort").addEventListener("change", e => {
    let value = e.target.value;

    let sorted = [...products];

    if (value === "low") sorted.sort((a,b)=>a.price-b.price);
    if (value === "high") sorted.sort((a,b)=>b.price-a.price);

    renderProducts(sorted);
});

function updateAnalytics() {
    let total = products.length;
    let value = products.reduce((sum,p)=>sum+p.price*p.stock,0);
    let out = products.filter(p=>p.stock===0).length;

    document.getElementById("analytics").innerHTML = `
        <p>Total Products: ${total}</p>
        <p>Total Value: ₹${value}</p>
        <p>Out of Stock: ${out}</p>
    `;
}

updateAnalytics();