// House assignment constants and logic
export const HOUSES = {
  1: { name: "Emerald House", color: "#123E30", label: "Emerald" },
  2: { name: "Gold House", color: "#C5A059", label: "Gold" },
  3: { name: "Sapphire House", color: "#0984e3", label: "Sapphire" },
  4: { name: "Ruby House", color: "#d63031", label: "Ruby" },
  5: { name: "Day Students House", color: "#2D3436", label: "Day" },
};

export function assignHouse(indexNumber, residentialStatus) {
  if (residentialStatus === "Day") {
    return { houseNumber: 5, ...HOUSES[5] };
  }
  const lastFour = parseInt(indexNumber.slice(-4));
  const houseNum = (lastFour % 4) + 1;
  return { houseNumber: houseNum, ...HOUSES[houseNum] };
}