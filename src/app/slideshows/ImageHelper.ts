/**
 * Value Object
 * thumbnail: The resized ImageHelper 
 * preview: base64 string representation of the thumbnail
 */
export class VO {
	thumbnail: Blob
	preview: string
}


/**
 * Image Helper 
 */
export class ImageHelper {

	private canvas;

	/**
	 * Converts a base64 string to blob
	 * returns a new promise with vo (seee above) as result
	 * canvas.toBlob is unfortunately not supported by all browsers
	 */
	dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0) {
			byteString = window.atob(dataURI.split(',')[1]);
		} else {
			byteString = decodeURI(dataURI.split(',')[1]);
		}
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		// convert to byte Array
		var array = [];
		for (var i = 0; i < byteString.length; i++) {
			array.push(byteString.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], { type: mimeString });
	}

	/**
	 * Creates a thumbnail from a File
	 * Returns new Promise with the result of vo (see VO Class)
	 */
	resizeWithCanvas(file: File): Promise<VO> {
		return new Promise((resolve, reject) => {

			let MAX_WIDTH = 100;
			let MAX_HEIGHT = 100;
			let OUTPUT_QUALITY = .75;
			let ctx = this.canvas.getContext("2d");
			let self = this;
			let img = new Image;
			let vo = new VO();

			img.onload = () => { // make sure the image has been loaded

				let width = img.width;
				let height = img.height;

				if (width > height || width > MAX_WIDTH) {
					//if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
					//}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				self.canvas.width = width;
				self.canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);
				vo.thumbnail = self.dataURItoBlob(self.canvas.toDataURL("image/jpeg", OUTPUT_QUALITY));
				vo.preview = self.canvas.toDataURL("image/jpeg", OUTPUT_QUALITY);
				// if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				// 	return this.canvas.toDataURL("image/jpeg", OUTPUT_QUALITY);
				// } else {
				// 	return this.canvas.toDataURL("image/jpeg");
				// }
				resolve(vo);
			}
			img.src = URL.createObjectURL(file);
		});

	}

	constructor() {
		this.canvas = document.createElement("canvas");

	}
}