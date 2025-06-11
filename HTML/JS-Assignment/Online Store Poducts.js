let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

document.getElementById("product-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!name || price < 0 || stock < 0) {
    alert("Please enter valid values");
    return;
  }

  const product = { name, price, stock };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));
  this.reset();
  displayProducts();
});

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>₹${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;
  editIndex = index;
}

function deleteProduct(index) {
  if (confirm("Are you sure to delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
  }
}

displayProducts();

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>₹${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

