"user strict";

class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  static create(user, result) {
    connection.query("INSERT INTO users set ?", user, function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  }
  static read(result) {
    connection.query("SELECT * FROM users WHERE deleted = 0", (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
  static update(id, user, result) {
    connection.query("UPDATE users SET ? WHERE _id = ?", [user, id], function (
      err,
      res
    ) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
  static delete(id, result) {
    connection.query("DELETE FROM users WHERE _id = ?", [id], function (
      err,
      res
    ) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}





export default User;
