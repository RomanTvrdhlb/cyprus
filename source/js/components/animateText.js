document.addEventListener("DOMContentLoaded", () => {
	const searchForm = document.querySelector('.search-form');
	const inputElement = document.getElementById('searchText');

	if (searchForm && inputElement) {

		const dataText = searchForm.getAttribute('data-text').split('|');
		let index = 0;
		let textIndex = 0;
		let isDeleting = false;

		function animatePlaceholder() {
			const currentText = dataText[index];
			if (!isDeleting) {
				inputElement.placeholder = currentText.substring(0, textIndex + 1);
				textIndex++;
				if (textIndex === currentText.length) {
					isDeleting = true;
					setTimeout(animatePlaceholder, 1000);
				} else {
					setTimeout(animatePlaceholder, 100);
				}
			} else {
				inputElement.placeholder = currentText.substring(0, textIndex - 1);
				textIndex--;
				if (textIndex === 0) {
					isDeleting = false;
					index++;
					if (index === dataText.length) {
						index = 0;
					}
				}
				setTimeout(animatePlaceholder, 100);
			}
		}

		animatePlaceholder();

		inputElement.addEventListener('focus', () => {
			inputElement.placeholder = '';
		});

		inputElement.addEventListener('blur', () => {
			inputElement.placeholder = dataText[index];
		});
	}

});



const expandText = (event) => {
	const card = event.currentTarget;
	const hiddenText = card.querySelector('.step-list__wrap');
	const imageWrapp = card.querySelector('.step-list__image');
	const hiddenTextTag = card.querySelector('.step-list__wrap p');
	const computedStyle = window.getComputedStyle(hiddenTextTag);
	const height = parseFloat(computedStyle.getPropertyValue('height'));
	const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'));
	const paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-bottom'));
	const totalHeight = height + paddingTop + paddingBottom;

	hiddenText.style.height = totalHeight + 'px';
	imageWrapp.style.marginBottom = (-totalHeight + 20 + 'px');
};

const collapseText = (event) => {
	const card = event.currentTarget;
	const hiddenText = card.querySelector('.step-list__wrap');
	const imageWrapp = card.querySelector('.step-list__image');
	hiddenText.style.height = '0';
	imageWrapp.style.marginBottom = '20px';
};

const cards = document.querySelectorAll('.step-list__item');

cards.forEach((card) => {
	card.addEventListener('mouseenter', expandText);
	card.addEventListener('touchstart', expandText);
	card.addEventListener('mouseleave', collapseText);
	card.addEventListener('touchend', collapseText);
});
