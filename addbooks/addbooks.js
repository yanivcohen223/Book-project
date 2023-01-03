let book_sub = document.getElementById("search");
const current_tr = document.getElementsByTagName("tr");
//geting the books from the api
$("#search_btn").on("click", async () => {
  clear_table()
  const book_num = 10;
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${book_sub.value}&maxResults=${book_num}&printType=books&orderBy=newest`
  );
  const data = await response.json();
  books_table(data.items);
});

//creating table for the books
function books_table(books) {
  for (let i = 0; i < books.length; i++) {
    $("#add_books").append(`
                <tr id= "tr_${i}" class = "book_tr">
                    <td>
                        <input id="${i}" type="checkbox" class="checkbox">
                    </td>
                    <td><img src="${books[i].volumeInfo.imageLinks.smallThumbnail}"/></td>
                    <td>${books[i].volumeInfo.title}</td>
                    <td>${books[i].volumeInfo.authors}</td>
                    <td>${books[i].volumeInfo.publishedDate}</td>
                </tr>`);
  }
  addbooks();
}

function addbooks() {
  let books_arr = [];
  let books_list = document.querySelectorAll(".checkbox");
  books_list.forEach((e) => {
    e.addEventListener("click", () => {
      if (e.checked) {
        e.parentNode.parentNode.style.backgroundColor = "lightgreen"; // for coloring the selected book
        books_arr.push(e.parentNode.parentNode);
      } else {
        e.parentNode.parentNode.style.backgroundColor = "white"; // for returning it to the base color
        books_arr.pop(e.parentNode.parentNode);
      }
    });
    $("#btn").on("click", () => {
      if (books_arr.length > 0) {
        // sweet alert for successful adding
        swal.fire({
          title: "Add Book",
          text: "Book added successfuly",
          icon: "success",
        });
      } else {
        // sweet alert if the user didnt select any book
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please select books",
        });
      }
      return books_arr
    });
  });
}

//tried to delete the last search by adding a function with for loop gonna talk about it with itay
function clear_table() { 
  document.querySelectorAll('.book_tr').forEach((e) => {
    e.remove();
  })
  } 
