// example code from mr doob : https://mrdoob.com/lab/javascript/requestanimationframe/
let mLastFrameTime = 0;
let mWaitTime = 5000; //time in ms

function animate() {
	requestAnimationFrame(animate); // requestAnimationFrame has existed in every standard browser since 2016

	let currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}
	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}
animate();

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
let currentIndex = 0;

let images = [];
// Not a security concern because this is being fetched by the client side, anything that can be fetched is already exposed to the Internet
let jsonUrl = new URLSearchParams(window.location.search).get("json") || "images.json";

function swapPhoto() {
	if (images.length == 0) {
		return;
	}
	let image = images[currentIndex]; 
	
	$(".details.location").text("Location: " + image.location);
	$(".details.description").text("Description: " + image.description);
	$(".details.date").text("Date: " + image.captureDate);
	$("#photo").attr("src", image.photo);

	currentIndex += 1;
	currentIndex %= images.length;
}


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		images.push(galleryImage);
	}
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
	// fetch(jsonUrl).then(data => data.json()).then(json => {}).catch(e => console.log(e));
	let request = new XMLHttpRequest();
	request.responseType = "json";
	request.addEventListener("load", e => {
		let galleryJson = request.response; // `response` parses json automatically (because responseType is set to "json"), unlike the deprecated `responseText`

		for (let image of galleryJson.images) {
			images.push(new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath));
		}
	});
	request.open("GET", jsonUrl);
	request.send();
}

// no need for .ready or onload, JavaScript modules are deferred
// This initially hides the photos' metadata information
$('.details').eq(0).hide();

fetchJson();
