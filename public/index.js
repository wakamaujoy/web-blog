
// let items = document.querySelectorAll('.carousel .carousel-item')

// 		items.forEach((el) => {
// 			const minPerSlide = 4
// 			let next = el.nextElementSibling
// 			for (var i=1; i<minPerSlide; i++) {
// 				if (!next) {
//             // wrap carousel by using first child
//             next = items[0]
//         }
//         let cloneChild = next.cloneNode(true)
//         el.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//         }
//     })

$(window).load(function() {
    $(".carousel .carousel-item").each(function() {
        var i = $(this).next();
        i.length || (i = $(this).siblings(":first")),
        i.children(":first-child").clone().appendTo($(this));
         
        for (var n = 0; n < 4; n++)(i = i.next()).length ||
        (i = $(this).siblings(":first")),
        i.children(":first-child").clone().appendTo($(this))
    })
});
