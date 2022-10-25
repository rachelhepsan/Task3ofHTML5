// testimonial data fetched from json file
const testimonialData = () => {
    fetch('testimony.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((testObj) => {
                let parent = document.getElementById("testimonial");
                let div1 = document.createElement("div");
                div1.innerHTML = `<div class="what-box mob-width tab-width">
            <div class="what-image-box flex-box">
                <img src=${testObj.image} class="what-image">
                <div>
                    <p class="para-what">${testObj.name} <br> <span>${testObj.designation}</span> </p>
                </div>
            </div>
            <p class="para-what-box">${testObj.testimony}
            </p>
        </div>`;
                parent.appendChild(div1);
            })
        })
}
testimonialData();

// side menu function to open menu
function openNav() {
    document.getElementById("sidebar").style.width = "350px";
}

// side menu function to close menu
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}





const getMenuData = () => {
    fetch('menu.json')
        .then((res) => res.json())
        .then((menuData) => {
           mainMenu(menuData);
        })
}

getMenuData();

function mainMenu(menuData) {
    
    let parent = document.getElementById("sidebar");

    menuData.forEach((menuObject) => {

        let div1 = document.createElement("div");

        let aTag = document.createElement("a");
        aTag.setAttribute("class","dropdown");
        aTag.setAttribute("onclick","dropDown(this)")
        aTag.innerHTML = menuObject.mainMenu;

        let arrowIcon = document.createElement("span");
        arrowIcon.innerHTML = `&#8964;`;
        arrowIcon.setAttribute("class","dropdown-arrow");
        parent.appendChild(div1);
        div1.appendChild(aTag);


        if(menuObject.subMenu){
            aTag.appendChild(arrowIcon);
            let div = document.createElement("div");
            div.setAttribute("class","sub-menu");
            div.style.display = "none";
            menuObject.subMenu.forEach((subMenuObj) => {
                let innerATag = document.createElement("a");
                innerATag.setAttribute("class","aTag");
                innerATag.innerHTML = subMenuObj.name;
                innerATag.href = subMenuObj.link;
                div.appendChild(innerATag);
            })
            div1.appendChild(div);
            
        } 
        else {
            aTag.href = menuObject.link;
        }
        
    });
}


function dropDown(anchor) {
    let dropdownContent =anchor.nextElementSibling;
    anchor.classList.toggle("active");
    if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    anchor.style.color = "#797979";
    } else {
    dropdownContent.style.display = "block";
    anchor.style.color = "#e7a136";
    }
}


// Our location page

let selectedMenu = null;
let apiResult = null;


const getLocationData = () => {
    fetch('location.json')
        .then((res) => res.json())
        .then((locationData) => {
            apiResult = locationData;
            region(locationData);
        })
}
getLocationData();

function region(locationData) {

    let parent = document.querySelector(".region");
    
    const initialData = locationData.find((location) => location.id === "sa1");
    
    selectedMenu = initialData.id;
    locationData.forEach((locationObject) => {
        let button = document.createElement("button");
        button.setAttribute("class",`regionHeading ${selectedMenu === locationObject.id? "activeButton":""}`);
        if(selectedMenu === locationObject.id) {
            button.focus();
        }
        button.setAttribute("id",`${locationObject.id}`);
        button.setAttribute("onclick","openTab(this.id)")
        button.innerHTML = locationObject.region;
        parent.appendChild(button); 
    })
    contactBox(initialData);
}

function contactBox(locationObject) {

    let parent = document.querySelector(".address");
    parent.setAttribute("onmouseout","mouseOut(this)");
    let contactContainer = document.createElement("div");
    contactContainer.setAttribute("class","contactContainer");

    locationObject.place.forEach((placeObject) => {

        let div = document.createElement("div");
        div.setAttribute("class","regionBox");
        div.setAttribute("data-image",`${placeObject.image}`);
        div.setAttribute("onmouseover","mouseOver(this)");
        

        let h4Tag = document.createElement("h4");
        h4Tag.innerHTML = placeObject.name;
        div.appendChild(h4Tag);

        let address = addressData(placeObject);
        div.appendChild(address);

        if(placeObject.phoneNumber) {
            let phoneNum = document.createElement("p");
            phoneNum.innerHTML = `<i class="fa-solid fa-phone"></i> ${placeObject.phoneNumber}`;
            div.appendChild(phoneNum);
        }
        
        let map = document.createElement("a");
        map.innerHTML = `<i class="fa-solid fa-location-dot"> ${placeObject.map}`;
        div.appendChild(map);
        console.log(div);

        contactContainer.appendChild(div);

        parent.replaceChildren(contactContainer);
    })

    appendImage(locationObject.place[0]);

}

function mouseOver(region) {
    const imgDiv = document.querySelector(".photo");
    const img = document.createElement("img");
    img.src = region.dataset.image;
    imgDiv.replaceChildren(img);
}

function mouseOut(region) {
    const bigBox = region.querySelector(".regionBox");
    const imgDiv = document.querySelector(".photo");
    const img = document.createElement("img");
    img.src = bigBox.dataset.image;
    imgDiv.replaceChildren(img);
}

function appendImage(imageObject) {

    const parent = document.getElementById("imageContainer");

    let photoDiv = document.createElement("div");
    photoDiv.setAttribute("class","photo");

    let image = document.createElement("img");
    image.setAttribute("src",`${imageObject.image}`);

    photoDiv.appendChild(image);

    parent.replaceChildren(photoDiv);

}


function addressData(placeObject) {
    let div = document.createElement("div");
    Object.keys(placeObject.address).forEach((lines) => {
        let line = document.createElement("p");
        line.innerHTML = placeObject.address[lines];
        div.appendChild(line);
    })
    return div;
}



function openTab(regionId) {

    const regionData = apiResult.find((loc) => loc.id === regionId)
    contactBox(regionData);
    selectedMenu = regionId;

    const regionTabs = document.getElementsByClassName("regionHeading");
    for (const element of regionTabs) {
        console.log(element)
        if(element.id === regionId) {
            element.classList.add("activeButton");
        }
        else {
            element.classList.remove("activeButton");
        }
    }

}