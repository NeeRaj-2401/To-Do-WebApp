function getAndUpdate() {
    //getting values of inputs by ID when button is clicked
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    //storing the values in localstorage(new concept)
    if (localStorage.getItem("Items") == null) {
        ItemsArray = [];
        ItemsArray.push([tit, desc]);
        localStorage.setItem("Items", JSON.stringify(ItemsArray));
    } else {
        ItemsArrayStr = localStorage.getItem("Items");
        ItemsArray = JSON.parse(ItemsArrayStr);
        ItemsArray.push([tit, desc]);
        localStorage.setItem("Items", JSON.stringify(ItemsArray));
    }

    update();
}
function update() {
    if (localStorage.getItem("Items") == null) {
        ItemsArray = [];
        localStorage.setItem("Items", JSON.stringify(ItemsArray));
    } else {
        ItemsArrayStr = localStorage.getItem("Items");
        ItemsArray = JSON.parse(ItemsArrayStr);
    }

    // showing(fetching) data in table
    let tablebody = document.getElementById("tablebody");
    let str = "";
    ItemsArray.forEach((element, index) => {
        str += ` 

            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button type="button" class="btn btn-sm btn-danger mx-3" onclick="deleted(${index})"><i class="far fa-trash-alt"></i></button></td>                    
            </tr>
          
            `;
    });

    tablebody.innerHTML = str;
}

add = document.getElementById("add");
// adding event to btn
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemindex) {
    console.log("Delete", itemindex);
    ItemsArrayStr = localStorage.getItem("Items");
    ItemsArray = JSON.parse(ItemsArrayStr);
    //to delete itemindex from JSON
    ItemsArray.splice(itemindex, 1);
    localStorage.setItem("Items", JSON.stringify(ItemsArray));
    update();
}

function clearStorage() {
    if (confirm("Do You Really Want to Clear?")) {
        localStorage.clear();
        update();
    }
}