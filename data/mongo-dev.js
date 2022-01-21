conn = new Mongo();
db = conn.getDB("recipiece");

user = db.Users.insertOne({
  _id: 'internal@recipiece.org',
  email: "internal@recipiece.org",
});

db.UserSessions.insertOne({
  _id: 'internal@recipiece.org',
  owner: 'internal@recipiece.org',
  created: 0,
});
