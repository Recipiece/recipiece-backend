db.createCollection("AltitudeIngredients");
db.AltitudeIngredients.createIndex({ names: 1 });

db.AltitudeIngredients.insertMany([
  {
    names: ["flour"],
    w: {
      unit: "g",
      base: 125,
      scales: [8, 16, 24, 32],
    },
    v: {
      unit: "c",
      base: 1,
      scales: [1 / 16, 1 / 8, 3 / 16, 1 / 4],
    },
  },
  {
    names: ["baking powder"],
    v: {
      unit: "tsp",
      base: 1,
      scales: [-1 / 8, -1 / 4, -1 / 2, -2 / 3],
    },
    w: {
      
    }
  },
  {
    names: [
      "baking soda",
      "soda",
      "bicarb",
      "bicarbonate",
      "bicarbonate of soda",
    ],
    v: {
      unit: "tsp",
      base: 1,
      scales: [-1 / 8, -1 / 4, -1 / 2, -2 / 3],
    },
  },
  {
    names: ["sugar"],
    v: {
      unit: "c",
      base: 1,
      scales: [-1 / 16, -1 / 8, -3 / 16, -1 / 4],
    },
    w: {
      unit: "g",
      base: 200,
      scales: [-12.5, -25, -37.5, -50],
    },
  },
  {
    names: ["water", "milk", "liquid"],
    v: {
      unit: "c",
      base: 1,
      scales: [1 / 16, 1 / 8, 3 / 16, 1 / 4],
    },
    w: {
      unit: "g",
      base: 242,
      scales: [15, 30, 45, 60],
    },
  },
]);
