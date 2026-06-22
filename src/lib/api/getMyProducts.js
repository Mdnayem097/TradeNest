const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyProducts = async (sellerProduct) => {
  const res = await fetch(
    `${baseURL}/seller/my-products/${sellerProduct}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};