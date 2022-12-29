let orders = [
    {
        order_num: 1,
        name: "Leonard Cohen",
        book_code: "36",
        Address: "Jerusalem",
    },
    {
        order_num: 2,
        name: "Michael Jackson",
        book_code: "29",
        Address: "Haifa",
    },
    {
        order_num: 3,
        name: "Freddie Mercury",
        book_code: "45",
        Address: "Ramat Gan",
    },
    {
        order_num: 4,
        name: "Billy Joel",
        book_code: "2",
        Address: "Tel Aviv",
    },
    {
        order_num: 5,
        name: "Rubie Koltraine",
        book_code: "106",
        Address: "Ashkelon",
    }
]



function show_orders(){
    for (let i = 0; i < orders.length; i++) {
        $("#orders_Table").append(`
        class="table table-success table-striped"
                <tr>
                    <td>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                        edit
                        </button>
                        <button id="delete_order" class="btn btn-danger" onclick="deleteorder(${i})">delete</button>
                    </td>
                    <td>${orders[i].order_num}</td>
                    <td>${orders[i].name}</td>
                    <td>${orders[i].book_code}</td>
                    <td>${orders[i].Address}</td>
                </tr>
                <!-- The Modal -->
                <div class="modal" id="myModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                  
                        <!-- Modal Header -->
                        <div class="modal-header">
                          <h4 class="modal-title">Modal Heading</h4>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                  
                        <!-- Modal body -->
                        <div class="modal-body">
                            <label for="edit_name">New Name:</label>
                            <input id="edit_name" type="text" placeholder="change name">
                            <br/> <br/>
                            <label for="edit_address">New Address:</label>
                            <input id="edit_address" type="text" placeholder="change address">
                        </div>
                  
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                  
                      </div>
                    </div>
                  </div>

`);
        
    }
}


show_orders()
/*

*/ 

// sweet alert for deleting an order
function deleteorder(x) {
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons
      .fire({ 
        title: "Are you sure?",
        text: `you are going to delete order number ${x}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
          //in case of deleting an order
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your order has been deleted.",
            "success"
          );
        }
        //in case of mistake or regreting
        else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your order is safe :)",
            "error"
          );
        }
      });
}
