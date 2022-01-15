conn = new Mongo();
db = conn.getDB("recipiece");

// collections
db.createCollection('Users');
db.createCollection('Recipes');
db.createCollection('RecipeBooks');
db.createCollection('UserSessions');
db.createCollection('StagedUsers');
db.createCollection('ForgotPasswordTokens');
db.createCollection('ShoppingLists');
db.createCollection('UserCounts');
db.createCollection('UserPermissions');
db.createCollection('UserTags');
db.createCollection('Timers');

// timer indices
db.Timers.createIndex({'owner': 1});

// user tags indices
db.UserTags.createIndex({'owner': 1});

// user permissions indices
db.UserPermissions.createIndex({'owner': 1}, {unique: true});

// user count indices
db.UserCounts.createIndex({'owner': 1}, {unique: true});

// user indices
db.Users.createIndex({'email': 1}, {unique: true});

// recipe indices
db.Recipes.createIndex({'name': 1});
db.Recipes.createIndex({'owner': 1});
db.Recipes.createIndex({'created': 1});

// recipe book indices
db.RecipeBooks.createIndex({'owner': 1})
db.RecipeBooks.createIndex({'created': 1})
db.RecipeBooks.createIndex({'name': 1})

// staged user indices
db.StagedUsers.createIndex({'email': 1}, {unique: true});
db.StagedUsers.createIndex({'token': 1}, {unique: true});

// forgot password indices
db.ForgotPasswordTokens.createIndex({'token': 1}, {unique: true});
db.ForgotPasswordTokens.createIndex({'owner': 1});
