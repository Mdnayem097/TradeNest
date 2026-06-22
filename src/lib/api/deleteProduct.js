const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const deleteProduct = async (id) => {
  const res = await fetch(`${baseURL}/seller/product/${id}`, {
    method: "DELETE",
  });

  return res.json();
};