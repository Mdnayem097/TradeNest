const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("access-token");
  const res = await fetch(`${baseURL}/seller/product/${id}`, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${token}`,
  },
  });

  return res.json();
};