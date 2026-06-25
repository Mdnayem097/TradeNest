const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("access-token");
  const res = await fetch(`${baseURL}/seller/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  return await res.json();
};