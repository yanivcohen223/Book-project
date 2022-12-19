const sqlite3 = require("sqlite3").verbose();
const db_file_loc = "./database/books_db.db";

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

function get_all(db, query) {
  return new Promise((resolve, reject) => {
    //const all_books = "SELECT * FROM BOOKS";
    db.all(query, function (err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

function get_by_id(db, id) {
  return new Promise((resolve, reject) => {
    const select_by_id = "SELECT * FROM BOOKS where id = ?";
    db.all(select_by_id, id, function (err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

function find_by_title(db, find_title) {
  return new Promise((resolve, reject) => {
    const sql_find_by_title = `SELECT title FROM BOOKS
                               WHERE title GLOB "*${find_title}*"`;
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

function random_price() {
  let price = Math.floor(Math.random() *500) + 50;
  let currency = "$"
  return price + currency;
}

function random_stock() {
  return Math.floor(Math.random() *50) + 1;
}

function insert_book_async(db, data) {
  return new Promise((resolve, reject) => {
    const insert_book = `INSERT INTO Books (title,author,publish_year,price,left_in_stock,book_image_src)
                        VALUES (?, ?, ?, ?, ?, ? );`;

    db.run(insert_book, data, (err) => {
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

function update_price(db, what_to_up, id) {
  return new Promise((resolve, reject) => {
    let update_book = `UPDATE BOOKS
                         SET price = ?
                         WHERE id = ?`;

    db.run(update_book, [what_to_up, id], (err) => {
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

function delete_by_id_async(db, id) {
  return new Promise((resolve, reject) => {
    let delete_book = `DELETE FROM Books
                      WHERE ID = ?`;

    db.run(delete_book, id, (err) => {
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

async function book_main() {
  try {
    const db = await open_db(db_file_loc);
    //await insert_book_async(db, [
    //  "", // book name
    //  "", // author name
    //  , // year the book was published
    //  random_price() , // gives a random price number
    //  random_stock(), // gives a random stock number
    //  "", // image src
    //]);
    //await find_by_title(db, "Com");

    //const result_get_all = await get_all(db, "SELECT * FROM BOOKS");
    //console.log(result_get_all);

    //const result_get_by_id = await get_by_id(db, id);
    //console.log(result_get_by_id);

    //await update_price(db, what_to_up, id);
    //await delete_by_id_async(db, id);

    await close_db(db);

  } 
  catch (error) {
    console.log(error);
  }
}

book_main();