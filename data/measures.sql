INSERT INTO "Measure" (abbrs, category, name_s, name_p, prefer_fractions, factor) VALUES
('{"ml", "mill", "milli", "mil"}', 'v', 'milliliter', 'milliliters', FALSE, 1),
('{"l"}', 'v', 'liter', 'liters', FALSE, 1000),
('{"fl. oz", "fl oz", "floz", "fl"}', 'v', 'fluid ounce', 'fluid ounces', FALSE, 29.574),
('{"c"}', 'v', 'cup', 'cups', TRUE, 236.588),
('{"tsp", "t", "tsps"}', 'v', 'teaspoon', 'teaspoons', TRUE, 4.92892),
('{"tbsp", "T", "tbsps"}', 'v', 'tablespoon', 'tablespoons', TRUE, 14.7868),
('{"qt", "q", "qts"}', 'v', 'quart', 'quarts', FALSE, 946.353),
('{"g"}', 'w', 'gram', 'grams', FALSE, 1),
('{"kg", "kgs"}', 'w', 'kilogram', 'kilograms', FALSE, 1000),
('{"lb", "lbs"}', 'w', 'pound', 'pounds', FALSE, 453.592),
('{"oz"}', 'w', 'ounce', 'ounces', FALSE, 28.3495)
