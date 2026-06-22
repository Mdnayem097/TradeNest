const baseURL=process.env.NEXT_PUBLIC_SERVER_URL;

export const AddProduct = async (productData) => {
  const res = await fetch(`${baseURL}/seller/add-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const result = await res.json();

  console.log(result);

  return result;
};