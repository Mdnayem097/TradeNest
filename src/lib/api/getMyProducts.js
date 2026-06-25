const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyProducts = async (sellerProduct) => {
  const token = localStorage.getItem("access-token");

  const res = await fetch(
    `${baseURL}/seller/my-products/${sellerProduct}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};