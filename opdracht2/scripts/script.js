// JavaScript Document
dsadsdsadsa
/* sortable */ 

new Sortable(
	dropzone,
	{
    group: {
			name: 'shared', // set both lists to same group
			pull: false
		},
    animation: 150,
		onAdd: function (/**Event*/evt) {
			const nieuweFilm = evt.item;
			const geclonedFilm = evt.clone

			console.log(evt);

			nieuweFilm.tabIndex = 0;

			nieuweFilm.addEventListener ('keydown', function(event){
				if (event.key == 'Backspace') {
					verwijderFilm(this);
					geclonedFilm.classList.remove("liked");
				}
			});
			nieuweFilm.addEventListener ("click", function(event){
				verwijderFilm(this);
				console.log(geclonedFilm);
			});
		}
	}
);

function verwijderFilm (deFilm) {
	deFilm.remove();
}

new Sortable(
	nieuw,
	{
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
		}
	}   
);

new Sortable(
	action,
	{
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
	anime,
	{
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
	comedy,
	{
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
	crime,
	{
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

/* scroll sticky */

window.onscroll = () => {
	const section = document.querySelector('section:nth-of-type(3)');
	if(this.scrollY <= 200) section.className = ''; else section.className = 'scroll';
  };

/* delete */

let selectMovie = document.querySelector('#dropzone');
var deleteItem = document.querySelector("li")

function removeMovie () {
	selectMovie.removeChild(selectMovie.lastElementChild);
// 	console.log("verwijderd");
}

deleteItem.addEventListener("click", removeMovie);



