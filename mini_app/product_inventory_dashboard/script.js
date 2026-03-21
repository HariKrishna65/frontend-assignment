let products = [
    { id: 1, name: "Laptop", price: 55000, stock: 5, category: "electronics" },
    { id: 2, name: "Shirt", price: 1200, stock: 3, category: "clothing" },
    { id: 3, name: "Book", price: 500, stock: 10, category: "books" }
];

function loadData() {
    let data = localStorage.getItem("products");
    if (data) products = JSON.parse(data);
}
loadData();

function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadCategories() {
    let categories = [...new Set(products.map(p => p.category))];
    let select = document.getElementById("categoryFilter");

    select.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

function applyAllFilters() {
    let search = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let sort = document.getElementById("sort").value;
    let lowStock = document.getElementById("lowStock").checked;

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (category === "all" || p.category === category) &&
        (!lowStock || p.stock < 5)
    );

    if (sort === "low") filtered.sort((a,b)=>a.price-b.price);
    if (sort === "high") filtered.sort((a,b)=>b.price-a.price);
    if (sort === "az") filtered.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort === "za") filtered.sort((a,b)=>b.name.localeCompare(a.name));

    renderProducts(filtered);
}

function renderProducts(list) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No products found</p>";
        return;
    }

    list.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>${p.category}</p>
            <p>₹${p.price}</p>
            <p class="${p.stock < 5 ? 'low-stock' : 'in-stock'}">
                ${p.stock < 5 ? 'Low Stock ⚠️' : 'In Stock'}
            </p>
            <button onclick="editProduct(${p.id})">Edit</button>
            <button onclick="deleteProduct(${p.id})">Delete</button>
        </div>`;
    });
}

function updateAnalytics() {
    let total = products.length;
    let value = products.reduce((s,p)=>s+p.price*p.stock,0);
    let out = products.filter(p=>p.stock===0).length;

    document.getElementById("analytics").innerHTML = `
        <p>Total: ${total}</p>
        <p>Value: ₹${value}</p>
        <p>Out: ${out}</p>
    `;
}

document.getElementById("addForm").addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let price = +document.getElementById("price").value;
    let stock = +document.getElementById("stock").value;
    let category = document.getElementById("category").value;

    if (!name || price <= 0 || stock < 0 || !category) return;

    products.push({ id: Date.now(), name, price, stock, category });

    saveData();
    loadCategories();
    applyAllFilters();
    updateAnalytics();

    closeForm();
    e.target.reset();
});

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    saveData();
    applyAllFilters();
    updateAnalytics();
}

function editProduct(id) {
    let p = products.find(x => x.id === id);

    let name = prompt("Name:", p.name);
    let price = prompt("Price:", p.price);
    let stock = prompt("Stock:", p.stock);
    let category = prompt("Category:", p.category);

    if (!name || price <= 0 || stock < 0 || !category) return;

    p.name = name;
    p.price = +price;
    p.stock = +stock;
    p.category = category;

    saveData();
    loadCategories();
    applyAllFilters();
    updateAnalytics();
}

function openForm() {
    document.getElementById("formModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("formModal").style.display = "none";
}

document.getElementById("search").addEventListener("input", applyAllFilters);
document.getElementById("categoryFilter").addEventListener("change", applyAllFilters);
document.getElementById("sort").addEventListener("change", applyAllFilters);
document.getElementById("lowStock").addEventListener("change", applyAllFilters);

function fetchProducts() {
    return new Promise(res => setTimeout(()=>res(products),1500));
}

async function init() {
    document.getElementById("products").innerHTML = "Loading...";
    await fetchProducts();
    loadCategories();
    renderProducts(products);
    updateAnalytics();
}

init();