const book_num = 1
let book_genre = "fantasy"
fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_genre}&maxResults=${book_num}&printType=books&orderBy=newest`)           //api for the get request
  .then(response => response.json())
  .then(Object => {console.log(Object.items[0].volumeInfo.imageLinks.thumbnail)
    $(`#book_name`).html(`${Object.items[0].volumeInfo.title}`);
    $(`#Book_pic`).append(`<img class="rounded"src="${Object.items[0].volumeInfo.imageLinks.smallThumbnail}">`);
  });

/*  function get_book(x) {
    new Promise((resolve, reject) => {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_genre}&maxResults=${book_num}&printType=books&orderBy=newest`)
      .then((result) => result.json())
      .then((result) => {
        if (err) {
          reject(err)
        }
        else {
          $(`#book_name${X}`).val(Object.items[x-1].volumeInfo.title);
          $(`#author${x}`).val(Object.items[x-1].volumeInfo.authors[x-1]);
          $(`#Book_pic${x}`).append(<img class="rounded"src="${Object.items[x-1].volumeInfo.imageLinks.smallThumbnail}")
          $(`#description${x}`).val(Object.items[x-1].volumeInfo.description);
        resolve()
        }
      });
    })
  }*/