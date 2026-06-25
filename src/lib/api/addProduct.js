const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const AddProduct = async (productData) => {
  const token = localStorage.getItem("access-token");

  const res = await fetch(`${baseURL}/seller/add-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const result = await res.json();

  return result;
};