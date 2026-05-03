let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    total += price;
    updateUI();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateUI();
}

function updateUI() {
    const list = document.getElementById('cart-list');
    const totalDisplay = document.getElementById('total-price');

    list.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} ($${item.price})</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
        `;
        list.appendChild(li);
    });

    totalDisplay.textContent = Math.max(0, total).toFixed(2);
}

async function submitOrder() {
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderData = {
        items: cart,
        totalPrice: total
    };
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (response.ok) {
        alert("Success! Your order is being prepared.");
        cart = [];
        total = 0;
        updateUI();
    } else {
        alert("Error saving order.");
    }
}