function get_books(book_api) {
  try {
    for (let i = 0; i < book_api.items.length; i++) {
        let price = Math.floor(Math.random() * 250) + 50;
        let stock = Math.floor(Math.random() * 60) + 20;
        let bookdiv = document.createElement("div");
        bookdiv.id = `book${i}`;
        document.body.appendChild(bookdiv);
        $(`#book${i}`).append(`        
          <p id="book_num${i}">book: ${book_api.items[i].volumeInfo.title}</p>
          <p id="author${i}">author: ${book_api.items[i].volumeInfo.authors}</p>
          <img id="Book_pic${i} title="book_pic" alt="img" src="${book_api.items[i].volumeInfo.imageLinks.smallThumbnail}"/>
          <p id="book_price${i}">price: ${price}</p>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal${i}">
          read more
          </button>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal${i}">
          Buy the Book
          </button>

          <!-- description Modal -->
          <div class="modal" id="bookModal${i}">
          <div class="modal-dialog">
          <div class="modal-content">

      <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

      <!-- Modal body -->
          <div class="modal-body">
          <p>book:${book_api.items[i].volumeInfo.title}</p>
          <p">author: ${book_api.items[i].volumeInfo.authors}</p>
          <p id="description${i}">${book_api.items[i].volumeInfo.description}</p>
          </div>

      <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
          </div>

      <!-- buy book Modal -->
          <div class="modal" id="myModal${i}">
          <div class="modal-dialog">
          <div class="modal-content">

      <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

      <!-- Modal body -->
          <div class="modal-body">
          <p>book:${book_api.items[i].volumeInfo.title}</p>
          <p">author: ${book_api.items[i].volumeInfo.authors}</p>
              <p id="order_price${i}">book price:${price}</p>
              <p id="stock${i}">instock:${stock}</p>
            <form>
            <input type="text" id="fname${i}"/>
            <input type="text" id="lname${i}"/>
            <br />
            <input type="email" />
            <br />
            <input type="tel" id="phone_number${i}"/>
            <br />
            <input type="text" id="card_num${i}"/>
            <input type="text" id="cvv${i}"/>
            <input type="text" id="exp_date${i}"/>
            </form>
          </div>

      <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
          </div>`);
      }
    }
   
  catch (err) {
    console.log(err);
  }
}

async function main() {
  try {
    const book_num = 10;
    let book_genre = "music";
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book_genre}&maxResults=${book_num}&printType=books&orderBy=newest`
    );
    const data = await response.json();
    console.log(data);
    get_books(data);
  } catch (err) {
    console.log(err);
  }
}
main();
/* 
  function get_book(x) {
    const book_num = 5;
    let book_genre = "javascript";
    let price = Math.floor(Math.random() * 250) + 50;
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book_genre}&maxResults=${book_num}&printType=books&orderBy=newest`
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
            $(`#book_name${x}`).html(result.items[x - 1].volumeInfo.title);
            $(`#Book_pic${x}`).append(
              `<img src="${
                result.items[x - 1].volumeInfo.imageLinks.smallThumbnail
              }">`
            );
            $(`#author${x}`).html(
              result.items[x - 1].volumeInfo.authors
            );
            $(`#description${x}`).html(
              result.items[x - 1].volumeInfo.description
            );
            $(`#book_price${x}`).html(`price: ${price}`);
            
      });
}

async function display_books() {
  try {
    const book1 = await get_book(1);
    console.log( "finished1");
    const book2 = await get_book(2);
    console.log( "finished2");
    const book3 = await get_book(3);
    console.log( "finished3");
    const book4 = await get_book(4);
    console.log( "finished4");
    let book5 = await get_book(5);
    console.log( "finished5");
  } catch (err) {
    console.log(err);
  }
}
display_books();
*/
