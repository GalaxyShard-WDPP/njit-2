// example code from mr doob : https://mrdoob.com/lab/javascript/requestanimationframe/
let lastFrameTime = 0;
let waitTime = 5000; //time in ms

function resetTime() {
	lastFrameTime = new Date().getTime();
}
function animate() {
	requestAnimationFrame(animate); // requestAnimationFrame has existed in every standard browser since 2016

	let currentTime = new Date().getTime();
	if (lastFrameTime === 0) {
		lastFrameTime = currentTime;
	}
	if ((currentTime - lastFrameTime) > waitTime) {
		swapPhoto();
		lastFrameTime = currentTime;
	}
}
animate();

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function mod(n, m) {
	return ((n % m) + m) % m;
}

let currentIndex = 0;

let images = [];
// Not a security concern because this is being fetched by the client side, anything that can be fetched is already exposed to the Internet
let jsonUrl = new URLSearchParams(window.location.search).get("json") || "images.json";

function swapPhoto() {
	if (images.length == 0) {
		return;
	}
	updatePhoto();
	currentIndex = mod(currentIndex+1, images.length);
}
function updatePhoto() {
	if (images.length == 0) {
		return;
	}
	let image = images[currentIndex];

	$(".location").text("Location: " + image.location);
	$(".description").text("Description: " + image.description);
	$(".date").text("Date: " + image.captureDate);
	$("#photo").attr("src", image.photo);

}


class GalleryImage {
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
	constructor (location, description, captureDate, photo /* : string | HTMLImageObject */) {
		this.location = location;
		this.description = description;
		this.captureDate = captureDate;
		this.photo = photo;
	}
}

function fetchJson() {
	// could just use `fetch` which has been widely supported for almost a decade
	fetch(jsonUrl).then(data => data.json()).then(json => {
		for (let image of json.images) {
			images.push(new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath));
		}
		resetTime();
		updatePhoto();
	}).catch(e => console.log(e));
	
	// alternatively, XMLHttpRequest
	// let request = new XMLHttpRequest();
	// request.responseType = "json";
	// request.addEventListener("load", e => {
	// 	   let galleryJson = request.response; // `response` parses json automatically (because responseType is set to "json"), unlike the deprecated `responseText`

	// 	    for (let image of galleryJson.images) {
	// 			images.push(new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath));
	// 		}
	//  	resetTime();
	//  	updatePhoto();
	// });
	// request.open("GET", jsonUrl);
	// request.send();
}

// no need for .ready or onload, JavaScript modules are deferred

// This initially hides the photos' metadata information
$('.details').eq(0).hide();

$(".moreIndicator").on("click", e => {
	$(".details").slideToggle();
	$(e.currentTarget).toggleClass("rot90");
	$(e.currentTarget).toggleClass("rot270");
});
$("#nextPhoto").on("click", e => {
	if (images.length == 0) {
		return;
	}
	resetTime();
	currentIndex = mod(currentIndex+1, images.length);
	updatePhoto();
});
$("#prevPhoto").on("click", e => {
	if (images.length == 0) {
		return;
	}
	resetTime();
	currentIndex = mod(currentIndex-1, images.length);
	updatePhoto();
});

fetchJson();
