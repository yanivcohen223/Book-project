function get_books(book_api) {
  try {
    for (let i = 0; i < book_api.items.length; i++) {
        let price = Math.floor(Math.random() * 250) + 50;
        let stock = Math.floor(Math.random() * 60) + 20;
        $(`#book${i}`).append(`        
        <img class="book_pic" id="Book_pic${i} title="book_pic" alt="img" src="${book_api.items[i].volumeInfo.imageLinks.smallThumbnail}"/>
          <p class="book_name" id="book_name${i}"> ${book_api.items[i].volumeInfo.title}</p>
          <p id="author${i}">author: ${book_api.items[i].volumeInfo.authors}</p>
          <p id="book_price${i}">price: ${price}$</p>

        <div class="button">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#read_book${i}">
        read more
      </button>

      <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#buy_book${i}">
      buy book
    </button>`);
    $(`#modal${i}`).append(`
    <!-- The Modal read more -->
    <div class="modal" id="read_book${i}">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title" id="book_in${i}"></h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <span id="description${i}"></span>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger"
              data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>

    <!-- The Modal buy -->
    <div class="modal" id="buy_book${i}">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Order Book</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <p id="modal_book_name${i}"></p>
            <p id="modal_author${i}"></p>
            <div>
              <p class="order_price" id="order_price${i}"></p>
              <p class="stock" id="stock${i}"></p>
            </div>
            <form class="form">
              <div class="personal_info">
                <input class="input_m" type="text" id="fname"
                  placeholder="first name"/>
                <input class="input_m" type="text" id="lname"
                  placeholder="last name"/>
              </div>
              <br />
              <input class="input_m" type="email" placeholder="Email"/>
              <br />
              <input class="input_m" type="tel" id="phone_number"
                placeholder="phone number"/>
              <br />
              <br />
              <div class="credit_info">
                <input class="input_m" type="text" id="card_num"
                  placeholder="credit card"/>
                <input class="input_m" type="text" id="cvv"
                  placeholder="cvv"/>
                <input class="input_m" type="text" id="exp_date"
                  placeholder="exp date"/>
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success"
              data-bs-dismiss="modal">buy</button>
            <button type="button" class="btn btn-danger"
              data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
`)

    $(`#book_in${i}`).append(`${book_api.items[i].volumeInfo.title}`)
    $(`#description${i}`).append(`${book_api.items[i].volumeInfo.description}`)
    
    $(`#modal_book_name${i}`).append(`Book${book_api.items[i].volumeInfo.title}
    <br/>`)
    $(`#modal_author${i}`).append(`author: ${book_api.items[i].volumeInfo.authors}`)
    $(`#order_price${i}`).append(`price: ${price}$`)
    $(`#stock${i}`).append(`In stock: ${stock}`)


      }
    }
   
  catch (err) {
    console.log(err);
  }
}

async function main() {
  try {
    const book_num = 12;
    let book_genre = "javascript";
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


