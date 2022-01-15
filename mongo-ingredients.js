// a setup for ingredient volumes to weights
conn = new Mongo();
db = conn.getDB("recipiece");

db.createCollection('CommonIngredients');
db.createCollection('CommonIngredientNames');

db.CommonIngredients.createIndex({'names': 1});
db.CommonIngredientNames.createIndex({'name': 1});

db.CommonIngredientNames.insertMany([
  { "name": "00 flour" },
  { "name": "all-purpose flour" },
  { "name": "ap flour" },
  { "name": "flour" },
  { "name": "almond flour" },
  { "name": "almond meal" },
  { "name": "almond paste" },
  { "name": "sliced almonds" },
  { "name": "slivered almonds" },
  { "name": "whole almonds" },
  { "name": "almonds" },
  { "name": "amaranth flour" },
  { "name": "apple juice" },
  { "name": "apple concentrate" },
  { "name": "dried apples" },
  { "name": "apples" },
  { "name": "applesauce" },
  { "name": "dried apricots" },
  { "name": "bread flour" },
  { "name": "superfine sugar" },
  { "name": "castor sugar" },
  { "name": "mashed bananas" },
  { "name": "barley" },
  { "name": "barley flour" },
  { "name": "barley malt syrup" },
  { "name": "malt syrup" },
  { "name": "pesto" },
  { "name": "bell pepper" },
  { "name": "bell peppers" },
  { "name": "frozen berries" },
  { "name": "berries" },
  { "name": "dried blueberries" },
  { "name": "blueberries" },
  { "name": "blueberry juice" },
  { "name": "bread crumbs" },
  { "name": "panko" },
  { "name": "panko crumbs" },
  { "name": "japanese bread crumbs" },
  { "name": "japanese panko" },
  { "name": "cooked brown rice" },
  { "name": "brown rice flour" },
  { "name": "brown sugar" },
  { "name": "whole buckwheat" },
  { "name": "buckwheat" },
  { "name": "buckwheat flour" },
  { "name": "bulgur" },
  { "name": "butter" },
  { "name": "buttermilk" },
  { "name": "buttermilk powder" },
  { "name": "cacao nibs" },
  { "name": "candied peel" },
  { "name": "caramel" },
  { "name": "caraway seeds" },
  { "name": "caraway" },
  { "name": "pureed carrots" },
  { "name": "diced carrots" },
  { "name": "grated carrots" },
  { "name": "chopped cashews" },
  { "name": "whole cashews" },
  { "name": "cashews" },
  { "name": "diced celery" },
  { "name": "feta cheese" },
  { "name": "feta" },
  { "name": "cheese" },
  { "name": "grated cheese" },
  { "name": "cheddar cheese" },
  { "name": "swiss cheese" },
  { "name": "colby jack cheese" },
  { "name": "grated parmesan cheese" },
  { "name": "paremsan cheese" },
  { "name": "ricotta cheese" },
  { "name": "ricotta" },
  { "name": "candied cherries" },
  { "name": "dried cherries" },
  { "name": "cherries" },
  { "name": "chopped cherries" },
  { "name": "pitted cherries" },
  { "name": "fresh cherries" },
  { "name": "frozen cherries" },
  { "name": "cherry concentrate" },
  { "name": "cherry juice" },
  { "name": "chickpea flour" },
  { "name": "chives" },
  { "name": "chopped chocolate" },
  { "name": "chocolate chips" },
  { "name": "chocolate chunks" },
  { "name": "cinnamon-sugar" },
  { "name": "unsweetened cocoa" },
  { "name": "cocoa powder" },
  { "name": "unsweetened cocoa powder" },
  { "name": "desiccated coconut" },
  { "name": "coconut flakes" },
  { "name": "shredded coconut" },
  { "name": "coconut" },
  { "name": "coconut flour" },
  { "name": "coconut milk" },
  { "name": "coconut milk powder" },
  { "name": "coconut oil" },
  { "name": "coconut sugar" },
  { "name": "confectioners' sugar" },
  { "name": "powdered sugar" },
  { "name": "cookie crumbs" },
  { "name": "popcorn" },
  { "name": "popped corn" },
  { "name": "corn syrup" },
  { "name": "whole cornmeal" },
  { "name": "cornmeal" },
  { "name": "yellow cornmeal" },
  { "name": "quaker cornmeal" },
  { "name": "cornstarch" },
  { "name": "cracked wheat" },
  { "name": "dried cranberries" },
  { "name": "cranberries" },
  { "name": "fresh cranberries" },
  { "name": "frozen cranberries" },
  { "name": "cream" },
  { "name": "heavy cream" },
  { "name": "heavy whipping cream" },
  { "name": "light cream" },
  { "name": "whipping cream" },
  { "name": "half and half" },
  { "name": "cream cheese" },
  { "name": "crystallized ginger" },
  { "name": "currants" },
  { "name": "chopped dates" },
  { "name": "dates" },
  { "name": "demerara sugar" },
  { "name": "dried blueberry powder" },
  { "name": "blueberry powder" },
  { "name": "dried milk" },
  { "name": "dry milk" },
  { "name": "powdered milk" },
  { "name": "dried potato flakes" },
  { "name": "instant mashed potatoes" },
  { "name": "durum flour" },
  { "name": "large egg" },
  { "name": "egg" },
  { "name": "large egg white" },
  { "name": "egg white" },
  { "name": "dried egg whites" },
  { "name": "large egg yolk" },
  { "name": "egg yolk" },
  { "name": "espresso powder" },
  { "name": "dried figs" },
  { "name": "flax meal" },
  { "name": "flaxseed" },
  { "name": "minced garlic" },
  { "name": "garlic cloves" },
  { "name": "garlic" },
  { "name": "sliced garlic" },
  { "name": "ginger" },
  { "name": "fresh ginger" },
  { "name": "sliced ginger" },
  { "name": "gluten-free all-purpose flour" },
  { "name": "gluten-free flour" },
  { "name": "crushed graham crackers" },
  { "name": "granola" },
  { "name": "grape nuts" },
  { "name": "hazelnut flour" },
  { "name": "hazelnut praline paste" },
  { "name": "hazelnut spread" },
  { "name": "hazelnuts" },
  { "name": "whole hazelnuts" },
  { "name": "high-gluten flour" },
  { "name": "honey" },
  { "name": "instant clearjel" },
  { "name": "clearjel" },
  { "name": "jam" },
  { "name": "preserves" },
  { "name": "keto wheat flour" },
  { "name": "lime juice" },
  { "name": "lemon juice" },
  { "name": "lard" },
  { "name": "diced leeks" },
  { "name": "chopped leeks" },
  { "name": "leeks" },
  { "name": "macadamia nuts" },
  { "name": "maple sugar" },
  { "name": "maple syrup" },
  { "name": "marshmallow creme" },
  { "name": "marshmallow fluff" },
  { "name": "mini marshmallows" },
  { "name": "marzipan" },
  { "name": "mascarpone cheese" },
  { "name": "mascarpone" },
  { "name": "mashed potatoes" },
  { "name": "mashed sweet potatoes" },
  { "name": "mayonnaise" },
  { "name": "mayo" },
  { "name": "rye flour" },
  { "name": "meringue powder" },
  { "name": "evaporated milk" },
  { "name": "milk" },
  { "name": "whole milk" },
  { "name": "millet" },
  { "name": "mini chocolate chips" },
  { "name": "molasses" },
  { "name": "mushrooms" },
  { "name": "sliced mushrooms" },
  { "name": "non-diastatic malt powder" },
  { "name": "malt powder" },
  { "name": "oat bran" },
  { "name": "oat flour" },
  { "name": "oats" },
  { "name": "old fashioned oats" },
  { "name": "instant oats" },
  { "name": "olive oil" },
  { "name": "olives" },
  { "name": "sliced olives" },
  { "name": "onion" },
  { "name": "diced onion" },
  { "name": "palm shortening" },
  { "name": "passion fruit puree" },
  { "name": "pastry flour" },
  { "name": "peaches" },
  { "name": "diced peaches" },
  { "name": "peanut butter" },
  { "name": "peanuts" },
  { "name": "pears" },
  { "name": "diced pears" },
  { "name": "pecan meal" },
  { "name": "diced pecans" },
  { "name": "pine nuts" },
  { "name": "dried pineapple" },
  { "name": "diced pineapple" },
  { "name": "pistachio nuts" },
  { "name": "pistachios" },
  { "name": "pistachio paste" },
  { "name": "polenta" },
  { "name": "poppy seeds" },
  { "name": "potato flour" },
  { "name": "potato starch" },
  { "name": "pumpernickel flour" },
  { "name": "pumpkin puree" },
  { "name": "quinoa" },
  { "name": "cooked quinoa" },
  { "name": "quinoa flour" },
  { "name": "raisins" },
  { "name": "packed raisins" },
  { "name": "raspberries" },
  { "name": "fresh raspberries" },
  { "name": "rhubarb" },
  { "name": "rice" },
  { "name": "white rice" },
  { "name": "rice flour" },
  { "name": "white rice flour" },
  { "name": "rice krispies" },
  { "name": "rye chops" },
  { "name": "cracked rye" },
  { "name": "rye flakes" },
  { "name": "sliced scallions" },
  { "name": "self-rising flour" },
  { "name": "semolina flour" },
  { "name": "sesame seeds" },
  { "name": "shallots" },
  { "name": "sliced shallots" },
  { "name": "sorghum flour" },
  { "name": "sour cream" },
  { "name": "sourdough starter" },
  { "name": "leaven" },
  { "name": "soy flour" },
  { "name": "sparkling sugar" },
  { "name": "decorating sugar" },
  { "name": "spelt flour" },
  { "name": "sprouted wheat flour" },
  { "name": "steel cut oats" },
  { "name": "strawberries" },
  { "name": "sliced strawberries" },
  { "name": "sugar" },
  { "name": "granulated sugar" },
  { "name": "table sugar" },
  { "name": "white sugar" },
  { "name": "sugar substitute" },
  { "name": "splenda" },
  { "name": "sundried tomatoes" },
  { "name": "sunflower seeds" },
  { "name": "sweetened condensed milk" },
  { "name": "condensed milk" },
  { "name": "tahini paste" },
  { "name": "tapioca starch" },
  { "name": "tapioca flour" },
  { "name": "tapioca" },
  { "name": "teff flour" },
  { "name": "toffee chunks" },
  { "name": "tomato paste" },
  { "name": "turbinado sugar" },
  { "name": "cake flour" },
  { "name": "vanilla extract " },
  { "name": "vegetable oil" },
  { "name": "canola oil" },
  { "name": "vegetable shortening" },
  { "name": "shortening" },
  { "name": "chopped walnuts" },
  { "name": "diced walnuts" },
  { "name": "walnuts" },
  { "name": "whole walnuts" },
  { "name": "water" },
  { "name": "wheat berries" },
  { "name": "wheat bran" },
  { "name": "wheat germ" },
  { "name": "white chocolate chips" },
  { "name": "white rye flour" },
  { "name": "whole wheat flour" },
  { "name": "ww flour" },
  { "name": "whole wheat pastry flour" },
  { "name": "graham flour" },
  { "name": "yeast" },
  { "name": "instant yeast" },
  { "name": "active dry yeast" },
  { "name": "yogurt" },
  { "name": "zucchini" },
  { "name": "shredded zucchini" }
]);

db.CommonIngredients.insertMany([
  {
    "names": ["00 flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 116.0, "unit": "g" }
  },
  {
    "names": ["all-purpose flour", "ap flour", "flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["almond flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 96.0, "unit": "g" }
  },
  {
    "names": ["almond meal"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 84.0, "unit": "g" }
  },
  {
    "names": ["almond paste"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 259.0, "unit": "g" }
  },
  {
    "names": ["sliced almonds"],
    "v": { "unit": "cup", "amount": -1 },
    "w": { "amount": 43.0, "unit": "g" }
  },
  {
    "names": ["slivered almonds"],
    "v": { "unit": "cup", "amount": -1 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["whole almonds", "almonds"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["amaranth flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 103.0, "unit": "g" }
  },
  {
    "names": ["apple juice", "apple concentrate"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 70.0, "unit": "g" }
  },
  {
    "names": ["dried apples"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["apples"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["applesauce"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 255.0, "unit": "g" }
  },
  {
    "names": ["dried apricots"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 64.0, "unit": "g" }
  },
  {
    "names": ["bread flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["superfine sugar", "castor sugar"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 190.0, "unit": "g" }
  },
  {
    "names": ["mashed bananas"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["barley"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 215.0, "unit": "g" }
  },
  {
    "names": ["barley flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["barley malt syrup", "malt syrup"],
    "v": { "unit": "tablespoon", "amount": 2.0 },
    "w": { "amount": 42.0, "unit": "g" }
  },
  {
    "names": ["pesto"],
    "v": { "unit": "tablespoon", "amount": 2.0 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["bell pepper", "bell peppers"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["frozen berries", "berries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["dried blueberries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["blueberries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 140.0, "unit": "g" }
  },
  {
    "names": ["blueberry juice"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 241.0, "unit": "g" }
  },
  {
    "names": ["bread crumbs"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["panko", "panko crumbs", "japanese bread crumbs", "japanese panko"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["cooked brown rice"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["brown rice flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 128.0, "unit": "g" }
  },
  {
    "names": ["brown sugar"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 213.0, "unit": "g" }
  },
  {
    "names": ["whole buckwheat", "buckwheat"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["buckwheat flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["bulgur"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 152.0, "unit": "g" }
  },
  {
    "names": ["butter"],
    "v": { "unit": "tablespoons", "amount": 8.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["buttermilk"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["buttermilk powder"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 18.0, "unit": "g" }
  },
  {
    "names": ["cacao nibs"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["candied peel"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["caramel"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["caraway seeds", "caraway"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 18.0, "unit": "g" }
  },
  {
    "names": ["pureed carrots"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 128.0, "unit": "g" }
  },
  {
    "names": ["diced carrots"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["grated carrots"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 99.0, "unit": "g" }
  },
  {
    "names": ["chopped cashews"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["whole cashews", "cashews"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["diced celery"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["feta cheese", "feta"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["cheese", "grated cheese", "cheddar cheese", "swiss cheese", "colby jack cheese"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["grated parmesan cheese", "paremsan cheese"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["ricotta cheese", "ricotta"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["candied cherries"],
    "v": { "unit": "cup", "amount": 0.25 },

    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["dried cherries"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 71.0, "unit": "g" }
  },
  {
    "names": ["cherries", "chopped cherries", "pitted cherries", "fresh cherries"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 80.0, "unit": "g" }
  },
  {
    "names": ["frozen cherries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["cherry concentrate", "cherry juice"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 42.0, "unit": "g" }
  },
  {
    "names": ["chickpea flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["chives"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 21.0, "unit": "g" }
  },
  {
    "names": ["chopped chocolate"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["chocolate chips"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["chocolate chunks"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["cinnamon-sugar"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["unsweetened cocoa", "cocoa powder", "unsweetened cocoa powder"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 42.0, "unit": "g" }
  },
  {
    "names": ["desiccated coconut"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["coconut flakes"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 60.0, "unit": "g" }
  },
  {
    "names": ["shredded coconut", "coconut"],
    "v": { "unit": "cup", "amount": 1.0 },

    "w": { "amount": 53.0, "unit": "g" }
  },
  {
    "names": ["coconut flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 128.0, "unit": "g" }
  },
  {
    "names": ["coconut milk"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 241.0, "unit": "g" }
  },
  {
    "names": ["coconut milk powder"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["coconut oil"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["coconut sugar"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 77.0, "unit": "g" }
  },
  {
    "names": ["confectioners' sugar", "powdered sugar"],
    "v": { "unit": "cups", "amount": 2.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["cookie crumbs"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["popcorn", "popped corn"],
    "v": { "unit": "cups", "amount": 4.0 },
    "w": { "amount": 21.0, "unit": "g" }
  },
  {
    "names": ["corn syrup"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 312.0, "unit": "g" }
  },
  {
    "names": ["whole cornmeal"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 138.0, "unit": "g" }
  },
  {
    "names": ["cornmeal", "yellow cornmeal", "quaker cornmeal"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["cornstarch"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["cracked wheat"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["dried cranberries"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["cranberries", "fresh cranberries", "frozen cranberries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 99.0, "unit": "g" }
  },
  {
    "names": ["cream", "heavy cream", "heavy whipping cream", "light cream", "whipping cream", "half and half"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["cream cheese"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["crystallized ginger"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 92.0, "unit": "g" }
  },
  {
    "names": ["currants"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["chopped dates", "dates"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["demerara sugar"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 220.0, "unit": "g" }
  },
  {
    "names": ["dried blueberry powder", "blueberry powder"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["dried milk", "dry milk", "powdered milk"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["dried potato flakes", "instant mashed potatoes"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 43.0, "unit": "g" }
  },
  {
    "names": ["durum flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 124.0, "unit": "g" }
  },
  {
    "names": ["large egg", "egg"],
    "v": { "unit": "", "amount": 1},
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["large egg white", "egg white"],
    "v": { "unit": "", "amount": 1},
    "w": { "amount": 35.0, "unit": "g" }
  },
  {
    "names": ["dried egg whites"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 11.0, "unit": "g" }
  },
  {
    "names": ["large egg yolk", "egg yolk"],
    "v": { "unit": "", "amount": 1},
    "w": { "amount": 14.0, "unit": "g" }
  },
  {
    "names": ["espresso powder"],
    "v": { "unit": "tablespoon", "amount": 1.0 },
    "w": { "amount": 7.0, "unit": "g" }
  },
  {
    "names": ["dried figs"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["flax meal"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["flaxseed"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 35.0, "unit": "g" }
  },
  {
    "names": ["minced garlic"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["garlic cloves", "garlic", "sliced garlic"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["ginger", "fresh ginger", "sliced ginger"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["gluten-free all-purpose flour", "gluten-free flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["crushed graham crackers"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["granola"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["grape nuts"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["hazelnut flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 89.0, "unit": "g" }
  },
  {
    "names": ["hazelnut praline paste"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["hazelnut spread"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 160.0, "unit": "g" }
  },
  {
    "names": ["hazelnuts", "whole hazelnuts"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["high-gluten flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["honey"],
    "v": { "unit": "tablespoon", "amount": 1.0 },
    "w": { "amount": 21.0, "unit": "g" }
  },
  {
    "names": ["instant clearjel", "clearjel"],
    "v": { "unit": "tablespoon", "amount": 1.0 },
    "w": { "amount": 11.0, "unit": "g" }
  },
  {
    "names": ["jam", "preserves"],
    "v": { "unit": "cup", "amount": 0.25 },

    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["keto wheat flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["lime juice", "lemon juice"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["lard"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["diced leeks", "chopped leeks", "leeks"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 92.0, "unit": "g" }
  },
  {
    "names": ["macadamia nuts"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["maple sugar"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 78.0, "unit": "g" }
  },
  {
    "names": ["maple syrup"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["marshmallow creme"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["marshmallow fluff"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 128.0, "unit": "g" }
  },
  {
    "names": ["mini marshmallows"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 43.0, "unit": "g" }
  },
  {
    "names": ["marzipan"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 290.0, "unit": "g" }
  },
  {
    "names": ["mascarpone cheese", "mascarpone"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["mashed potatoes"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 213.0, "unit": "g" }
  },
  {
    "names": ["mashed sweet potatoes"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 240.0, "unit": "g" }
  },
  {
    "names": ["mayonnaise", "mayo"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["rye flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 106.0, "unit": "g" }
  },
  {
    "names": ["meringue powder"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 43.0, "unit": "g" }
  },
  {
    "names": ["evaporated milk"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["milk", "whole milk"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["millet"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 103.0, "unit": "g" }
  },
  {
    "names": ["mini chocolate chips"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 177.0, "unit": "g" }
  },
  {
    "names": ["molasses"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["mushrooms", "sliced mushrooms"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 78.0, "unit": "g" }
  },
  {
    "names": ["non-diastatic malt powder", "malt powder"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 18.0, "unit": "g" }
  },
  {
    "names": ["oat bran"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 53.0, "unit": "g" }
  },
  {
    "names": ["oat flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 92.0, "unit": "g" }
  },
  {
    "names": ["oats", "old fashioned oats", "instant oats"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 89.0, "unit": "g" }
  },
  {
    "names": ["olive oil"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 50.0, "unit": "g" }
  },
  {
    "names": ["olives", "sliced olives"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["onion", "diced onion"],
    "v": { "unit": "cup", "amount": 1.0 },

    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["palm shortening"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 45.0, "unit": "g" }
  },
  {
    "names": ["passion fruit puree"],
    "v": { "unit": "cup", "amount": 0.3 },
    "w": { "amount": 60.0, "unit": "g" }
  },
  {
    "names": ["pastry flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 106.0, "unit": "g" }
  },
  {
    "names": ["peaches", "diced peaches"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["peanut butter"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 135.0, "unit": "g" }
  },
  {
    "names": ["peanuts"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["pears", "diced pears"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 163.0, "unit": "g" }
  },
  {
    "names": ["pecan meal"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 80.0, "unit": "g" }
  },
  {
    "names": ["diced pecans"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["pine nuts"],
    "v": { "unit": "cup", "amount": 0.5 },

    "w": { "amount": 71.0, "unit": "g" }
  },
  {
    "names": ["dried pineapple"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 71.0, "unit": "g" }
  },
  {
    "names": ["diced pineapple"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["pistachio nuts", "pistachios"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 60.0, "unit": "g" }
  },
  {
    "names": ["pistachio paste"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 78.0, "unit": "g" }
  },
  {
    "names": ["polenta"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 163.0, "unit": "g" }
  },
  {
    "names": ["poppy seeds"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 18.0, "unit": "g" }
  },
  {
    "names": ["potato flour"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 46.0, "unit": "g" }
  },
  {
    "names": ["potato starch"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 152.0, "unit": "g" }
  },
  {
    "names": ["pumpernickel flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 106.0, "unit": "g" }
  },
  {
    "names": ["pumpkin puree"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["quinoa", "cooked quinoa"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 184.0, "unit": "g" }
  },
  {
    "names": ["quinoa flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 110.0, "unit": "g" }
  },
  {
    "names": ["raisins"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 149.0, "unit": "g" }
  },
  {
    "names": ["packed raisins"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 85.0, "unit": "g" }
  },
  {
    "names": ["raspberries", "fresh raspberries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["rhubarb"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["rice", "white rice"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 99.0, "unit": "g" }
  },
  {
    "names": ["rice flour", "white rice flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 142.0, "unit": "g" }
  },
  {
    "names": ["rice krispies"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["rye chops", "cracked rye"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["rye flakes"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 124.0, "unit": "g" }
  },
  {
    "names": ["sliced scallions"],
    "v": { "unit": "cup", "amount": 1.0 },

    "w": { "amount": 64.0, "unit": "g" }
  },
  {
    "names": ["self-rising flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["semolina flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 163.0, "unit": "g" }
  },
  {
    "names": ["sesame seeds"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 71.0, "unit": "g" }
  },
  {
    "names": ["shallots", "sliced shallots"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["sorghum flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 138.0, "unit": "g" }
  },
  {
    "names": ["sour cream"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["sourdough starter", "leaven"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["soy flour"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 35.0, "unit": "g" }
  },
  {
    "names": ["sparkling sugar", "decorating sugar"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 57.0, "unit": "g" }
  },
  {
    "names": ["spelt flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 99.0, "unit": "g" }
  },
  {
    "names": ["sprouted wheat flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["steel cut oats"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 70.0, "unit": "g" }
  },
  {
    "names": ["strawberries", "sliced strawberries"],
    "v": { "unit": "cup", "amount": 1.0 },

    "w": { "amount": 167.0, "unit": "g" }
  },
  {
    "names": ["sugar", "granulated sugar", "table sugar", "white sugar"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 198.0, "unit": "g" }
  },
  {
    "names": ["sugar substitute", "splenda"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 25.0, "unit": "g" }
  },
  {
    "names": ["sundried tomatoes"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["sunflower seeds"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 35.0, "unit": "g" }
  },
  {
    "names": ["sweetened condensed milk", "condensed milk"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 78.0, "unit": "g" }
  },
  {
    "names": ["tahini paste"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 128.0, "unit": "g" }
  },
  {
    "names": ["tapioca starch", "tapioca flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["tapioca"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 21.0, "unit": "g" }
  },
  {
    "names": ["teff flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 135.0, "unit": "g" }
  },
  {
    "names": ["toffee chunks"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 156.0, "unit": "g" }
  },
  {
    "names": ["tomato paste"],
    "v": { "unit": "tablespoons", "amount": 2.0 },
    "w": { "amount": 29.0, "unit": "g" }
  },
  {
    "names": ["turbinado sugar"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 180.0, "unit": "g" }
  },
  {
    "names": ["cake flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 120.0, "unit": "g" }
  },
  {
    "names": ["vanilla extract "],
    "v": { "unit": "tablespoon", "amount": 1.0 },
    "w": { "amount": 14.0, "unit": "g" }
  },
  {
    "names": ["vegetable oil", "canola oil"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 198.0, "unit": "g" }
  },
  {
    "names": ["vegetable shortening", "shortening"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 46.0, "unit": "g" }
  },
  {
    "names": ["chopped walnuts", "diced walnuts"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["walnuts", "whole walnuts"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 64.0, "unit": "g" }
  },
  {
    "names": ["water"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["wheat berries"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 184.0, "unit": "g" }
  },
  {
    "names": ["wheat bran"],
    "v": { "unit": "cup", "amount": 0.5 },
    "w": { "amount": 32.0, "unit": "g" }
  },
  {
    "names": ["wheat germ"],
    "v": { "unit": "cup", "amount": 0.25 },
    "w": { "amount": 28.0, "unit": "g" }
  },
  {
    "names": ["white chocolate chips"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 170.0, "unit": "g" }
  },
  {
    "names": ["white rye flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 106.0, "unit": "g" }
  },
  {
    "names": ["whole wheat flour", "ww flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 113.0, "unit": "g" }
  },
  {
    "names": ["whole wheat pastry flour", "graham flour"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 96.0, "unit": "g" }
  },
  {
    "names": ["yeast", "instant yeast", "active dry yeast"],
    "v": { "unit": "teaspoons", "amount": 2.0 },
    "w": { "amount": 6.0, "unit": "g" }
  },
  {
    "names": ["yogurt"],
    "v": { "unit": "cup", "amount": 1.0 },
    "w": { "amount": 227.0, "unit": "g" }
  },
  {
    "names": ["zucchini", "shredded zucchini"],
    "v": {"unit": "cup", "amount": 1.0},
    "w": {"unit": "g", "amount": 196}
  }
]);