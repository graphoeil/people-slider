// Imports
import people from './data.js';

// Variables
const container = document.querySelector('.slide-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Display people
container.innerHTML = people.map((person, slideIndex) => {
	// Variables
	const { img, name, job, text } = person;
	// Classe en fonction de l'index
	let position = 'next';
	if (slideIndex === 0){ position = 'active'; }
	if (slideIndex === people.length - 1){ position = 'last'; }
	// Return
	return(
		`<article class="slide ${ position }">
			<img src="${ img }" class="img" alt="${ name }">
			<h4>${ name }</h4>
			<p class="title">${ job }</p>
			<p class="text">${ text }</p>
			<div class="quote-icon">
				<i class="fas fa-quote-right"></i>
			</div>
		</article>`
	);
}).join('');

// Slider function
const startSlider = (type) => {
	const active = container.querySelector('.active');
	const last = container.querySelector('.last');
	/* Nous sélectionnons le slide juste après l'active, 
	car il pourrait y en avoir d'autres ... */
	let next = active.nextElementSibling;
	// End of array ? no next ,-)
	if (!next){
		// Reset
		next = container.firstElementChild;
	}
	// Nous retirons les classes des éléments
	/* Nous passons un array à remove pour ne supprimer 
	que la classe active */
	active.classList.remove(['active']);
	last.classList.remove(['last']);
	next.classList.remove(['next']);
	// Prev ?
	if (type === 'prev'){
		active.classList.add('next');
		last.classList.add('active');
		next = last.previousElementSibling;
		if (!next){
			next = container.lastElementChild;
		}
		next.classList.add('last');
		return;
	}
	// Nous ajoutons les nouvelles classes
	active.classList.add('last');
	last.classList.add('next');
	next.classList.add('active');
};

// Next and prev btns
nextBtn.addEventListener('click', () => {
	startSlider();
});
prevBtn.addEventListener('click', () => {
	startSlider('prev');
});