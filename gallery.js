// example code from mr doob : https://mrdoob.com/lab/javascript/requestanimationframe/

let mLastFrameTime = 0;
let mWaitTime = 5000; //time in ms
function animate() {
	requestAnimationFrame(animate);
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


// Counter for the mImages array
let mCurrentIndex = 0;

// XMLHttpRequest variable
let mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
let mImages = [];

// Holds the retrived JSON information
let mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
let mUrl = 'images.json';

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);


class GalleryImage {
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
	constructor (location, description, captureDate, photo /* : string | HTMLImageObject */) {
		this.location = location;
		this.description = description;
		this.captureDate = captureDate;
		this.photo = photo;
	}
}