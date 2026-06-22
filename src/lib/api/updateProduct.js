const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${baseURL}/seller/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  return await res.json();
};