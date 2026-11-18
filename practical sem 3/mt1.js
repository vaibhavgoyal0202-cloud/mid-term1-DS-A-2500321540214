var products = [
      { id: 201, name: "Wireless mouse", price: 599, category: "Electronics" }
    ];
    var editingId = null;

    function showProducts() {
      var list = document.getElementById("productList");
      list.innerHTML = "";

      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        var row = list.insertRow();
        row.insertCell().textContent = product.id;
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = "₹" + product.price;
        row.insertCell().textContent = product.category;

        var actions = row.insertCell();
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.onclick = function () { editProduct(product); };

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () { deleteProduct(product.id); };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
      }
    }

    document.getElementById("productForm").onsubmit = function (event) {
      event.preventDefault();

      var product = {
        id: Number(document.getElementById("productId").value),
        name: document.getElementById("productName").value,
        price: Number(document.getElementById("productPrice").value),
        category: document.getElementById("productCategory").value
      };

      if (editingId === null) {
        products.push(product);
      } else {
        for (var i = 0; i < products.length; i++) {
          if (products[i].id === editingId) {
            products[i] = product;
          }
        }
        editingId = null;
        document.getElementById("saveButton").textContent = "Add Product";
      }

      this.reset();
      showProducts();
    };

    function editProduct(product) {
      document.getElementById("productId").value = product.id;
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productCategory").value = product.category;
      editingId = product.id;
      document.getElementById("saveButton").textContent = "Update Product";
    }

    function deleteProduct(id) {
      products = products.filter(function (product) {
        return product.id !== id;
      });
      showProducts();
    }

    showProducts();