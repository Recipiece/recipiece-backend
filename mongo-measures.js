db.createCollection('Measures');

db.Measures.createIndex({'abbrs': 1, 'name': 1});

// insert volume types,
// ml is the base
db.Measures.insertMany([
  {
    abbrs: ['ml', 'mill', 'milli', 'mil'],
    cat: 'v',
    name: {
        s: 'milliliter',
        p: 'milliliters'
    },
    factor: 1,
    base: true,
  },
  {
    abbrs: ['l'],
    cat: 'v',
    name: {
        s: 'liter',
        p: 'liters'
    },
    factor: 1000,
  },
  {
    abbrs: ['fl. oz', 'fl oz', 'floz', 'fl'],
    cat: 'v',
    name: {
        s: 'fluid ounce',
        p: 'fluid ounces'
    },
    factor: 29.574
  },
  {
    abbrs: ['c'],
    cat: 'v',
    name: {
        s: 'cup',
        p: 'cups'
    },
    factor: 236.588
  },
  {
    abbrs: ['tsp', 't', 'tsps'],
    cat: 'v',
    name: {
        s: 'teaspoon',
        p: 'teaspoons'
    },
    factor: 4.92892
  },
  {
    abbrs: ['tbsp', 't', 'tbsps'],
    cat: 'v',
    name: {
        s: 'tablespoon',
        p: 'tablespoons'
    },
    factor: 14.7868
  },
  {
    abbrs: ['qt', 'q', 'qts'],
    cat: 'v',
    name: {
        s: 'quart',
        p: 'quarts'
    },
    factor: 946.353
  },
]);

// weights
// g is the base
db.Measures.insertMany([
  {
    abbrs: ['g'],
    cat: 'w',
    name: {
        s: 'gram',
        p: 'grams'
    },
    factor: 1,
    base: true
  },
  {
    abbrs: ['kg', 'kgs'],
    cat: 'w',
    name: {
        s: 'kilogram',
        p: 'kilograms'
    },
    factor: 1000,
  },
  {
    abbrs: ['lb', 'lbs'],
    cat: 'w',
    name: {
        s: 'pound',
        p: 'pounds'
    },
    factor: 453.592
  },
  {
    abbrs: ['oz'],
    cat: 'w',
    name: {
        s: 'ounce',
        p: 'ounces'
    },
    factor: 28.3495
  }
]);
