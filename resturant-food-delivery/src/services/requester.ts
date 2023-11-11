export const getData = async (endpoint: string) => {
  const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
}