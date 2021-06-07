// JavaScript Document


// lets and const vanilla-JS geen sortable // 
const section = document.querySelector('section:nth-of-type(3)');
let selectallKinderen = document.querySelectorAll('li');
let selectbodyKeyboard = document.querySelector("body")
let iconSwith = document.querySelector("#icon")
let lightmodeh1 = document.querySelector('h1');
let lightmodeh2 = document.querySelector('h2');
let lightmodeDropzone = document.querySelector("section:nth-of-type(3) ul")
let lightmodetext = document.querySelectorAll('h3');
let lightmodus = document.querySelector("section:first-of-type button");
let ul = document.getElementById("dropzone");
let lis = ul.getElementsByTagName("li");
let hideNieuw = document.querySelector("#nieuw");
let hideAction = document.querySelector("#action");
let hideAnime = document.querySelector("#anime");
let hideComedy = document.querySelector("#comedy");
let hideCrime = document.querySelector("#crime");

//******************* functies *****************//

/* scroll sticky */
window.onscroll = () => {
	if (this.scrollY <= 200) section.className = '';
	else section.className = 'scroll';
};

/* dit geeft tab index aan alle LI's */
for (var i = 0; i < selectallKinderen.length; i++) {
	selectallKinderen[i].tabIndex = 0;
};

// naar LIGHT MODUES veranderen via knop//
// verandert het icoontje
function change() {
	if (iconSwith.className == "fas fa-sun") {
		iconSwith.className = "far fa-moon";
	} else {
		iconSwith.className = "fas fa-sun";
	}
}

function hiddenNieuw() {
	hideNieuw.classList.toggle("hide-items");
}

function hiddenAction() {
	hideAction.classList.toggle("hide-items");
}

function hiddenAnime() {
	hideAnime.classList.toggle("hide-items");
}

function hiddenComedy() {
	hideComedy.classList.toggle("hide-items");
}

function hiddenCrime() {
	hideCrime.classList.toggle("hide-items");
}

// voegt classes toe voor de lightmodus
function lightModus() {
	document.body.classList.toggle("light-mode");
	lightmodeh1.classList.toggle("lightmodeh1en2");
	lightmodeh2.classList.toggle("lightmodeh1en2");
	lightmodeDropzone.classList.toggle("lightmodeDropzone");
	document.body.classList.toggle("lightmodeForbidden");
	for (var i = 0; i < lightmodetext.length; i++) {
		lightmodetext[i].classList.toggle("lightmodetext");
	};
	change();
}

// ***** EVENTS LISTERS ********* //

// kan ook via l aan en uit zetten.
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'l') {
		lightModus();
	}
});

// Verwijdert alle films in de dropzone wanneer je klikt op " r "
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'r') {
		while (lis.length > 0) {
			ul.removeChild(lis[0]);
			counterLijst.textContent = document.querySelectorAll("#dropzone li").length;
		}
	};
});

// Hide films van een lijst (DIT IS DE NIEUWE LIJST) PRESS n
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'n') {
		hiddenNieuw();
	}
});


// Hide films van een lijst (DIT IS DE ACTION LIJST) PRESS a
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'a') {
		hiddenAction();
	}
});

// Hide films van een lijst (DIT IS DE ANIME LIJST) PRESS b
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'b') {
		hiddenAnime();
	}
});


// Hide films van een lijst (DIT IS DE COMEDY LIJST) PRESS c
selectbodyKeyboard.addEventListener('keydown', function (event) {
	if (event.key == 'c') {
		hiddenComedy();
	}
});

// klikken op icoon 
lightmodus.addEventListener("click", lightModus);


/*************************** SORTABLE ***************************/
let counterLijst = document.querySelector(".counter span");

var droppingZone = new Sortable(
	dropzone, {
		group: {
			name: 'shared', // set both lists to same group
			pull: false,
			put: true
		},
		animation: 150,
		onAdd: function ( /**Event*/ evt) {
			const nieuweFilm = evt.item;
			nieuweFilm.tabIndex = 0;
			/* TELLEN VAN LIST */
			let nieuweAantal = document.querySelectorAll("#dropzone li").length;
			/* Lengte checken van de UL */
			counterLijst.textContent = nieuweAantal;

			nieuweFilm.addEventListener('keydown', function (event) {
				if (event.key == 'Backspace') {
					verwijderFilm(this);
					/* Lengte checken van de UL bij verwijderen */
					counterLijst.textContent = document.querySelectorAll("#dropzone li").length;
				}
			});
			nieuweFilm.addEventListener("click", function (event) {
				verwijderFilm(this);
				/* Lengte checken van de UL bij verwijderen */
				counterLijst.textContent = document.querySelectorAll("#dropzone li").length; // nieuweAantal geeft error dit gaat wel goed
			});
		}
	}
);

function verwijderFilm(deFilm) {
	deFilm.remove();
}

/** https://codepen.io/shooft/pen/eYvyGZe << Sanne geholpen :) Kijken wat voor opties er allemaal in de lijst staan. */
var listOptions = {
	group: {
		name: 'shared',
		pull: 'clone', // To clone: set pull to 'clone'
		put: false
	},
	sort: false,
	animation: 150,
	chosenClass: "sortable-chosen",
	onStart: startDrag,
	onEnd: endDrag
};

/* Kijken of de item al in de lijst staat */

/* als er gestart wordt met draggen */
function startDrag(evt) {
	let inList = false;


	let likedItem = droppingZone.el.querySelectorAll("li");
	// als er minimaal 1 item in de dropzone array zit verder gaan met checken
	if (likedItem.length) {
		// de data-id van de film die versleept wordt bepalen
		let idMovie = evt.item.dataset.id;
		// de data-ids van de films in in dropzone array zitten in een array stoppen
		let likedItemIDs = [];
		likedItem.forEach((favo) => {
			likedItemIDs.push(favo.dataset.id);
		});
		// als de data-id van de versleepte film in de array zit
		if (likedItemIDs.includes(idMovie)) {
			// aangeven dat de film al in de lijst zit
			inList = true;
		};
	}

	// als de film al in de dropzone-lijst zit
	if (inList) {
		// de body class forbidden geven om te stylen
		document.body.classList.add("forbidden");
		// de favo lijst disablen als drop-zone
		droppingZone.option("disabled", true);

	}
	// als de film nog niet in de favo-lijst zit
	else {
		// de body class dragging geven om te stylen
		document.body.classList.add("dragging");
	};
}

/* als er gestopt wordt met draggen */
function endDrag(evt) {
	// beide classes weghalen
	// ik was te lui om te bepalen of het 1 van de twee is
	document.body.classList.remove("dragging", "forbidden");
	// de favo lijst weer enablen als drop-zone
	// ik was te lui om te checken of de lijst uberhaupt disabled was
	droppingZone.option("disabled", false);
}

/* de lijsten met films initialiseren */
new Sortable(nieuw, listOptions);
new Sortable(action, listOptions);
new Sortable(anime, listOptions);
new Sortable(comedy, listOptions);
new Sortable(crime, listOptions);


new Sortable(
	nieuw, {
		group: {
			name: 'shared',
			pull: 'clone', // To clone: set pull to 'clone'
			put: false,

		},
		animation: 150,
		sort: false,
		chosenClass: "sortable-chosen",
		onStart: function () {
			document.body.classList.add("dragging");
		},
		onEnd: function () {
			document.body.classList.remove("dragging");
		},
		onAdd: function ( /**Event*/ evt) {
			// same properties as onEnd
		},
	}
);

new Sortable(
	action, {
		group: {
			name: 'shared',
			pull: 'clone', // To clone: set pull to 'clone'
			put: false
		},
		animation: 150,
		sort: false,
		chosenClass: "sortable-chosen",
		onStart: function () {
			document.body.classList.add("dragging");
		},
		onEnd: function () {
			document.body.classList.remove("dragging");
		}
	}
);

new Sortable(
	anime, {
		group: {
			name: 'shared',
			pull: 'clone', // To clone: set pull to 'clone'
			put: false
		},
		animation: 150,
		sort: false,
		chosenClass: "sortable-chosen",
		onStart: function () {
			document.body.classList.add("dragging");
		},
		onEnd: function () {
			document.body.classList.remove("dragging");
		}
	}
);

new Sortable(
	comedy, {
		group: {
			name: 'shared',
			pull: 'clone', // To clone: set pull to 'clone'
			put: false
		},
		animation: 150,
		sort: false,
		chosenClass: "sortable-chosen",
		onStart: function () {
			document.body.classList.add("dragging");
		},
		onEnd: function () {
			document.body.classList.remove("dragging");
		}
	}
);

new Sortable(
	crime, {
		group: {
			name: 'shared',
			pull: 'clone', // To clone: set pull to 'clone'
			put: false
		},
		animation: 150,
		sort: false,
		chosenClass: "sortable-chosen",
		onStart: function () {
			document.body.classList.add("dragging");
		},
		onEnd: function () {
			document.body.classList.remove("dragging");
		}
	}
);