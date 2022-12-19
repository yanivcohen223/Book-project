const sqlite3 = require("sqlite3").verbose();
const db_file_loc = "./database/books_db.db";
generator = require("creditcard-generator");

//open data base
function open_db(file_name) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(file_name, (err) => {
      if (err) {
        console.log(`Failed to connect to ${file_name}`);
        reject(err);
      } else {
        console.log(`Successfully connected to ${file_name}`);
        resolve(db);
      }
    });
  });
}

//gets all the orders from the database
function get_all(db, query) {
  return new Promise((resolve, reject) => {
    db.all(query, function (err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

//gets order by her id
function get_by_id(db, id) {
  return new Promise((resolve, reject) => {
    const select_by_id = "SELECT * FROM ORDERS where id = ?";
    db.all(select_by_id, id, function (err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

//finds order by the costumer last name
function find_by_lname(db, find_title) {
  return new Promise((resolve, reject) => {
    const sql_find_by_title = `SELECT costumer_lname FROM ORDERS
                               WHERE costumer_lname GLOB "*${find_title}*"`;
    db.get(sql_find_by_title, (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(row);
        resolve();
      }
    });
  });
}

//generate random credit card
function random_CreditCard() {
  return generator.GenCC("VISA");
}

//creating new order
function insert_order_async(db, data) {
  return new Promise((resolve, reject) => {
    const insert_order = `INSERT INTO ORDERS (book_id,how_many,time_of_order,costumer_fname,costumer_lname,credit_card)
                        VALUES (?, ?, ?, ?, ?, ? );`;

    db.run(insert_order, data, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("insert succeeded" + " " + data);
        resolve();
      }
    });
  });
}

//update the number of books the buyer wants
function update_number_of_books(db, what_to_up, id) {
  return new Promise((resolve, reject) => {
    let update_order = `UPDATE ORDERS
                         SET how_many = ?
                         WHERE id = ?`;

    db.run(update_order, [what_to_up, id], (err) => {
      if (err) {
        console.log("error" + " " + err);
        reject(err);
      } else {
        console.log("value updated" + get_by_id(db, id));
        resolve();
      }
    });
  });
}

//delete an order by the id
function delete_by_id_async(db, id) {
  return new Promise((resolve, reject) => {
    let delete_order = `DELETE FROM ORDERS
                      WHERE ID = ?`;

    db.run(delete_order, id, (err) => {
      if (err) {
        console.log("error" + " " + err);
        reject(err);
      } else {
        console.log(id + " " + "deleted");
        resolve();
      }
    });
  });
}

//function to getthe exact time
function time_set() {
  let y = new Date().getFullYear();
  let d = new Date().getDate();
  let m = new Date().getMonth() + 1;
  let h = new Date().getHours();
  let mi = new Date().getMinutes();
  let sec = new Date().getSeconds();
  let time_ = h + ":" + mi + ":" + sec + " " + d + "/" + m + "/" + y;
  return time_;
}

//generate random numbers for book id and how many books
function randomNum(max) {
  let randNum = Math.floor(Math.random() * max) + 1;
  return randNum;
}
//close database
function close_db(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.log(err.message);
        reject(err);
      } else {
        console.log("Database closed!");
        resolve();
      }
    });
  });
}

async function order_main() {
  try {
    const db = await open_db(db_file_loc);
    /*await insert_order_async(db, [
      randomNum(5), // book id
      randomNum(5), // how many
      time_set(), // when the order accomplished
      "David", // first name
      "Ben Gurion", // last name
      random_CreditCard(), // credit card number
    ]);*/
    //await find_by_title(db, "");

    const result_get_all = await get_all(db, "SELECT * FROM ORDERS");
    console.log(result_get_all);

    //const result_get_by_id = await get_by_id(db, id);
    // console.log(result_get_by_id);

    //await update_price(db, what_to_up, id);
    //await delete_by_id_async(db, id);

    await close_db(db);
  } catch (error) {
    console.log(error);
  }
}

order_main();
