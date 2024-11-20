const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) {
    throw new Error("Failed to retrieve the menu.");
  }

  const jsonResponse = await res.json();
  return jsonResponse.data || [];
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) {
    throw new Error(`Order #${id} not found.`);
  }

  const jsonResponse = await res.json();
  return jsonResponse.data || null;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Order creation failed.");
    }

    const jsonResponse = await res.json();
    return jsonResponse.data;
  } catch {
    console.error("Failed to update order.");
    throw new Error("Failed to update order.");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to update order #${id}`);
    }

    // No data returned, so no need to parse JSON.
  } catch {
    console.error("Failed to update order.");
    throw new Error("Failed to update order.");
  }
}
