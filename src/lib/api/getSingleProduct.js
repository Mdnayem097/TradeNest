const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getSingleProduct = async (id) => {
  const token = localStorage.getItem("access-token");
  const res = await fetch(`${baseURL}/seller/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};