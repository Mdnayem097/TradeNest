const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getSingleProduct = async (id) => {
  const res = await fetch(`${baseURL}/seller/product/${id}`);

  return await res.json();
};