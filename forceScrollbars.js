// Enables scrolling on a website if it's been disabled
// To use, simply paste this code into the browser's console and press return
(function(){
	var all = document.all;
	var i = 0;
	while ( i < all.length ){
		if (
			all[i].style &&
			all[i].style.overflow
		){
			all[i].style.overflow = null;
		}
		i += 1;
	}
}())
