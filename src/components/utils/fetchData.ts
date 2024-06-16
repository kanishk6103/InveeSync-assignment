export const fetchInitialData = async () => {
  const data = await fetch("/src/api/data.json");
  const json = await data.json();
  return json;
};
