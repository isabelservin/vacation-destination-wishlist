//form listener when submitted
document.querySelector("#form_details").addEventListener("submit", handleOnSubmit)

function handleOnSubmit (e) { //event listener

    e.preventDefault() //prevents page from performing default action : onSubmit = refresh

    //store individual target values
    let name = document.getElementById('name').value
    let location = document.getElementById('location').value
    let img = document.getElementById('img').value
    let desc = document.getElementById('description').value

    resetForm(e.target); //get target of event reset values

    let neWDestination = createCard(name, location, img, desc)

    let wishlist = document.querySelector("#wishlist_container");

    // Change wishlist title if wishlist were empty
    if (wishlist.children.length === 0) {
      document.querySelector("#title").innerHTML = "My WishList";
    }
  
    // Appended the destinationCard in the #destinations_container div
    document.querySelector("#wishlist_container").appendChild(neWDestination);
}


//reset form values function
function resetForm (form) {
    for(let index = 0; index < form.length; index++){
        form.elements[index].value = ""
    }
}

//CREATE CARD - using values passed from document
function createCard(name, location, imgUrl, desc){
    //OUTERMOST DIV - CARD - WISHLIST
    let card = document.createElement("div")
    card.setAttribute("class", "card")

    //IMAGE CARD
    let photo = document.createElement("img")
    photo.setAttribute("class", "photo-top")
    photo.setAttribute("alt", `Photo of ${name}`)

    let defaultImg = "http://www.quickmeme.com/img/ac/ac0ca91460080d93598a488faf1f035ed5ba2501cb06efd9c1a0d1cc9983be8b.jpg"
    
    //conditional if no img is provided insert default img;
    if(imgUrl.length === 0){
        photo.setAttribute("src", defaultImg)
    } else{
        photo.setAttribute("src", imgUrl)
    }
    card.appendChild(photo)


    //DETAILS
    let body = document.createElement("div")
    body.setAttribute("class", "body-card")

    let title = document.createElement("h5")
    title.setAttribute("class", "card-title")
    title.innerText = name
    body.appendChild(title)

    let subtitle = document.createElement("h6")
    subtitle.setAttribute("class", "card-subtitle")
    subtitle.innerText = location
    body.appendChild(subtitle)

    // Only add description text if the user entered some
    if (desc.length !== 0) {
        let textBox = document.createElement("p")
        textBox.setAttribute("class", "card-text")
        textBox.innerText = desc;
        body.appendChild(textBox)
    }

    //buttons container
    let buttons = document.createElement("div")
    buttons.setAttribute("class", "buttons_container")

    let editBtn = document.createElement("button")
    editBtn.setAttribute("class", "btn edit-btn")
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", edit)
  
    let deletBtn = document.createElement("button")
    deletBtn.setAttribute("class", "btn remove-btn")
    deletBtn.innerText = "Remove"
    deletBtn.addEventListener("click", remove)
  
    //append edit and delete to buttons container
    buttons.appendChild(editBtn)
    buttons.appendChild(deletBtn)
  
    //append buttons to card body
    body.appendChild(buttons)
    
    //append body to actual card
    card.appendChild(body)

    return card
}

function edit(event) {
    let body = event.target.parentElement.parentElement
    let title = body.children[0];
    let subtitle = body.children[1]
  
    let card = body.parentElement
    let imgUrl = card.children[0]
  
    let newTitle = window.prompt("Enter new name")
    let newSubtitle = window.prompt("Enter new location")
    let newImgUrl = window.prompt("Enter new photo url")

    if (newTitle.length > 0) {
      title.innerText = newTitle
    }
  
    if (newSubtitle.length > 0) {
        subtitle.innerText = newSubtitle
    }
  
    if (newImgUrl.length > 0) {
      imgUrl.setAttribute("src", newImgUrl)
    }
  }

  function remove(event) {
    let body = event.target.parentElement.parentElement
    let card = body.parentElement
    card.remove()
  }