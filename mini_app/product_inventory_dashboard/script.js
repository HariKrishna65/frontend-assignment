// Initial product data (used only if localStorage is empty)
let products = [
    { id: 1, name: "Laptop", price: 55000, stock: 5, category: "electronics" },
    { id: 2, name: "Shirt", price: 1200, stock: 3, category: "clothing" },
    { id: 3, name: "Book", price: 500, stock: 10, category: "books" }
];

// Load data from localStorage if available
function loadData() {
    let data = localStorage.getItem("products");
    if (data) {
        products = JSON.parse(data);
    }
}
loadData();

// Save data to localStorage
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Apply search + filter + sort together
function applyAllFilters() {
    let search = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let sort = document.getElementById("sort").value;

    let filtered = products.filter(p => {
        let matchSearch = p.name.toLowerCase().includes(search);
        let matchCategory = category === "all" || p.category === category;
        return matchSearch && matchCategory;
    });

    // Sorting
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") filtered.sort((a, b) => b.name.localeCompare(a.name));

    renderProducts(filtered);
}

// Render products
function renderProducts(list) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    // Empty state
    if (list.length === 0) {
        container.innerHTML = "<p>No products found</p>";
        return;
    }

    list.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.name}</h3>
                <p>Category: ${p.category}</p>
                <p>Price: ₹${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="editProduct(${p.id})">Edit</button>
                <button onclick="deleteProduct(${p.id})">Delete</button>
            </div>
        `;
    });
}

// Update analytics section
function updateAnalytics() {
    let total = products.length;
    let totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    let outOfStock = products.filter(p => p.stock === 0).length;

    // Category count
    let categoryCount = {};
    products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    let categoryHTML = "";
    for (let cat in categoryCount) {
        categoryHTML += `<p>${cat}: ${categoryCount[cat]}</p>`;
    }

    document.getElementById("analytics").innerHTML = `
        <p>Total Products: ${total}</p>
        <p>Total Value: ₹${totalValue}</p>
        <p>Out of Stock: ${outOfStock}</p>
        ${categoryHTML}
    `;
}

// Add product
document.getElementById("addForm").addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let price = +document.getElementById("price").value;
    let stock = +document.getElementById("stock").value;
    let category = document.getElementById("category").value;

    // Validation
    if (!name || price <= 0 || stock < 0 || !category) {
        alert("Please enter valid details");
        return;
    }

    let newProduct = {
        id: Date.now(),
        name,
        price,
        stock,
        category
    };

    products.push(newProduct);

    saveData();
    applyAllFilters();
    updateAnalytics();

    e.target.reset();
});

// Delete product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);

    saveData();
    applyAllFilters();
    updateAnalytics();
}

// Edit product
function editProduct(id) {
    let product = products.find(p => p.id === id);

    let name = prompt("Enter name:", product.name);
    let price = prompt("Enter price:", product.price);
    let stock = prompt("Enter stock:", product.stock);
    let category = prompt("Enter category:", product.category);

    if (!name || price <= 0 || stock < 0 || !category) {
        alert("Invalid input");
        return;
    }

    product.name = name;
    product.price = +price;
    product.stock = +stock;
    product.category = category;

    saveData();
    applyAllFilters();
    updateAnalytics();
}

// Event listeners
document.getElementById("search").addEventListener("input", applyAllFilters);
document.getElementById("categoryFilter").addEventListener("change", applyAllFilters);
document.getElementById("sort").addEventListener("change", applyAllFilters);

// Simulate API loading
function fetchProducts() {
    return new Promise(resolve => {
        setTimeout(() => resolve(products), 1500);
    });
}

// Initialize app
async function init() {
    document.getElementById("products").innerHTML = "Loading products...";
    let data = await fetchProducts();
    renderProducts(data);
    updateAnalytics();
}

init();