// class error
class ErrorNotCorectImage extends Error{
    constructor(message){
        super(message);
        this.name = "ErrorNotCorectImage";
    }
}
class DoubleCreationError extends Error{
    constructor(message){
        super(message);
        this.name = "DoubleCreationError";
    }
}

class NotCoordinatesError extends Error{
    constructor(message){
        super(message);
        this.name = "NotCoordinatesError";
    }
}
class NotCreateElementError extends Error{
    constructor(message){
        super(message);
        this.name = "NotCreateElementError";
    }
}
class NotPlaceSpecifiedError extends Error{
    constructor(message){
        super(message);
        this.name = "NotPlaceSpecifiedError";
    }
}
class NotCreateIslandError extends Error{
    constructor(message){
        super(message);
        this.name = "NotCreateIslandError";
    }
}
class NotIsPlacedShipError extends Error{
    constructor(message){
        super(message);
        this.name = "NotIsPlacedShipError";
    }
}

// gloval function
function random(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// important variables
const waves = document.querySelectorAll(".layer__wave");
let iteration = 0;
let islandsImage = [
    "img/mainPhoto/front-page/islands/island1.png",
    "img/mainPhoto/front-page/islands/island2.png",
    "img/mainPhoto/front-page/islands/island3.png",
    "img/mainPhoto/front-page/islands/island4.png",
];

// Code for create island
class CreateIsland{
    constructor(urlImage, widthProcent, heightProcent){
        this.image = urlImage;
        this.widthProcent = widthProcent;
        this.heightProcent = heightProcent;
        try{
            if(!this.image.includes(".png")){
                throw new ErrorNotCorectImage("Not corect Image");
            }else if(this.elemet){
                throw new DoubleCreationError("You cannot create an object twice");
            }
            // create tags
            let island = document.createElement("div");
            let islandPhoto = document.createElement("img");
            
            // configuration tags
            island.style.width = `${window.innerWidth * this.widthProcent}px`;
            island.style.height = `${ window.innerWidth * this.heightProcent}px`;
            islandPhoto.src = this.image;
        
            // add class
            island.classList.add("island");
            islandPhoto.classList.add("island__photo");
            
            island.append(islandPhoto);

            this.elemet = island;

            this.coordinates = random(
            (window.innerWidth * this.widthProcent),
                window.innerWidth - (window.innerWidth * this.widthProcent)
            );
        }catch(err){
            if(err instanceof ErrorNotCorectImage){
                console.log("Image Error: " + err.message);
            }else if(err instanceof DoubleCreationError){
                console.log("Object twice Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
    insertIsland(place){
        try{
            if(!this.coordinates){
                throw new NotCoordinatesError("you did not specify the coordinates");
            }else if(!this.elemet){
                throw new NotCreateElementError("you have not created an item");
            }else if(!place){
                throw new NotPlaceSpecifiedError("you didn't specify a place");
            }
            let coordinates = this.coordinates - window.innerWidth * this.widthProcent;
            if(!document.querySelector(".island")){
                place.prepend(this.elemet);
                this.elemet.style.transform = `translate(${coordinates}px, -60%)`;
            }else{
                let island = document.querySelector(".island");
                place.prepend(island);
                island.style.transform = `translate(${coordinates}px, -60%)`;
            }
        }catch(err){
            if(err instanceof NotCoordinatesError){
                console.log("Coordinates Error: " + err.message);
            }else if(err instanceof NotCreateElementError){
                console.log("Create Element Error: " + err.message);
            }else if(err instanceof NotPlaceSpecifiedError){
                console.log("Place Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
}

// code for create ship, and it move.
class CreateShip{
    constructor(image, widthProcent, heightProcent, island){
        this.image = image;
        this.widthProcent = widthProcent;
        // window.innerWidth * widthProcent
        this.heightProcent = heightProcent;
        // window.innerWidth * heightProcent
        this.island = island;

        // create ship
        try{
            if(!this.image.includes(".png")){
                throw new ErrorNotCorectImage("Not corect Image");
            }else if(this.elemet){
                throw new DoubleCreationError("You cannot create an object twice");
            }
            // create tags
            let ship = document.createElement("div");
            let shipPhotoBody = document.createElement("div");
            let shipPhoto = document.createElement("img");
            
            // configuration tags
            ship.style.width = `${window.innerWidth * this.widthProcent}px`;
            ship.style.height = `${ window.innerWidth * this.heightProcent}px`;
            shipPhoto.src = this.image;
        
            // add class
            ship.classList.add("ship");
            shipPhotoBody.classList.add("ship__body-image");
            shipPhoto.classList.add("ship__image");
            
            shipPhotoBody.append(shipPhoto);
            ship.append(shipPhotoBody);

            this.elemet = ship;
        }catch(err){
            if(err instanceof ErrorNotCorectImage){
                console.log("Image Error: " + err.message);
            }else if(err instanceof DoubleCreationError){
                console.log("Object twice Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
    static renewalWidthAndHeight(){
        try{
            if(!this.elemet){
                throw new NotCreateElementError("you have not created an item");
            }
            this.elemet.style.width = `${window.innerWidth * this.widthProcent}px`;
            this.elemet.style.height =  `${window.innerWidth * this.heightProcent}px`;
        }catch(err){
            if(err instanceof NotCreateElementError){
                console.log("Create Element Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
    insertShip(place){
        try{
            if(!this.island){
                throw new NotCreateIslandError("you haven't created an island, create an island first");
            }else if(!this.elemet){
                throw new NotCreateElementError("you have not created an item");
            }else if(!place){
                throw new NotPlaceSpecifiedError("you didn't specify a place");
            }
            let ship = this.elemet;
            if(document.querySelector(".ship")){
                ship = document.querySelector(".ship");
                ship.children[0].style.transform = "";
                ship.style.right = "";
                ship.style.left = "";
                ship.style.transform = "";
            }

            // configuration ship
            this.islandPosition = this.island.elemet.getBoundingClientRect().left + (this.island.elemet.getBoundingClientRect().width / 2);
            let viewport = {
                left: 0,
                right: window.innerWidth,
            }
            let result = {
                resultLeft: this.islandPosition - viewport.left,
                resultRight: -(this.islandPosition - viewport.right),
            }
            if(result.resultLeft > result.resultRight){
                ship.style.right = "100%";
                ship.style.transform = `translate(0, -65%)`;
                this.shipPosition = "left";
                ship.classList.add("left-front");
            }else if(result.resultLeft < result.resultRight){
                ship.style.left = "100%";
                ship.style.transform = `translate(0, -65%)`;
                this.shipPosition = "right";
                ship.classList.add("right-front");
            }
            place.prepend(ship);
            this.shipIsPlaced = true;

        }catch(err){
            if(err instanceof NotCreateIslandError){
                console.log("Create Island Error: " + err.message);
            }else if(err instanceof NotCreateElementError){
                console.log("Create Element Error: " + err.message);
            }else if(err instanceof NotPlaceSpecifiedError){
                console.log("Place Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
    shipMove(){
        try{
            if(!this.island){
                throw new NotCreateIslandError("you haven't created an island, create an island first");
            }else if(!this.elemet){
                throw new NotCreateElementError("you have not created an item");
            }else if(!this.shipIsPlaced){
                throw new NotIsPlacedShipError("place the ship on the map");
            }
            this.island.elemet.classList.add("active");
            setTimeout(() => {
                if(this.shipPosition === "left"){
                    this.elemet.classList.remove("right-front");
                    let distance = -(
                        (this.elemet.getBoundingClientRect().right - this.islandPosition)
                         + this.island.elemet.getBoundingClientRect().width * 0.4
                    );
                    this.elemet.style.transform = `translate(${distance}px, -60%)`;
                    setTimeout(() => {
                        this.island.elemet.classList.remove("active");
                        this.elemet.style.transform = `translate(${window.innerWidth + (window.innerWidth * this.widthProcent)}px, -65%)`;
                    }, 13000);
                }
                if(this.shipPosition === "right"){
                    this.elemet.classList.remove("left-front");
                    let distance = 
                        (this.elemet.getBoundingClientRect().right - this.islandPosition)
                         - this.island.elemet.getBoundingClientRect().width * 1.1;            
                    this.elemet.style.transform = `translate(-${distance}px, -60%)`;
                    setTimeout(() => {
                        this.island.elemet.classList.remove("active");
                        this.elemet.style.transform = `translate(-${window.innerWidth + 2 * (window.innerWidth * this.widthProcent)}px, -65%)`;
                    }, 13000);
                }
            }, 1600)
        }catch(err){
            if(err instanceof NotCreateIslandError){
                console.log("Create Island Error: " + err.message);
            }else if(err instanceof NotCreateElementError){
                console.log("Create Element Error: " + err.message);
            }else if(err instanceof NotIsPlacedShipError){
                console.log("Placed ship Error: " + err.message);
            }else{
                throw err;
            }
        }
    }
}
let island = new CreateIsland(islandsImage[0], 0.25, 0.25);
let ship = new CreateShip("img/mainPhoto/front-page/ship.png", 0.18, 0.18, island);

if(window.innerWidth <= 768){
    island = new CreateIsland(islandsImage[0], 0.4, 0.4);
    ship = new CreateShip("img/mainPhoto/front-page/ship.png", 0.3, 0.3, island);
}

function startAnimation(island, ship, iteration, waves){
    island.urlImage = islandsImage[random(0, islandsImage.length - 1)];
    island.elemet.querySelector('.island__photo').src = island.urlImage;
    island.coordinates = random(
        window.innerWidth * island.widthProcent,
        window.innerWidth
    );

    island.insertIsland(waves[iteration]);
    ship.insertShip(waves[iteration]);
    ship.shipMove();
    
    if(iteration === (waves.length - 1)){
        iteration = 0;
        console.log("2")
    }else{
        iteration += 1;
    }
     setTimeout(() => {
        startAnimation(island, ship, iteration, waves);
    }, 23000)
}

setTimeout(() => {
    startAnimation(island, ship, iteration, waves);
}, 3000);

const oltWidthVieport = window.innerWidth;
window.addEventListener('resize', (e) => {
    if(oltWidthVieport !== window.innerWidth) location.reload();
});

// scroll to front-page
const frontPage = document.querySelector(".front-page");
frontPage.scrollIntoView(true);