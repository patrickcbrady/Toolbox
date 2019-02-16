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
