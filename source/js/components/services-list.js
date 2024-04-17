import {fadeOut, fadeIn, addCustomClass, removeCustomClass} from "../functions/customFunctions";
import {disableScroll} from "../functions/disable-scroll";
import {enableScroll} from "../functions/enable-scroll";


let isFixedBlockVisible = false;

document.querySelectorAll('.services-box__row').forEach(item => {
	const button = item.querySelector('.arrow-button');
	const fixedBlock = item.querySelector('.services-box__article');
	const innerBox = item.querySelector('.services-box__inner');
	const headerHeight = document.querySelector('header') ?
																document.querySelector('header').clientHeight : 0;
	isFixedBlockVisible = false;

	function scrollToItem() {
		const itemPositionRelativeToViewport = item.getBoundingClientRect().top;
		const targetScrollPosition = window.pageYOffset + itemPositionRelativeToViewport - headerHeight;

		window.scrollTo({
			top: targetScrollPosition,
			behavior: 'smooth'
		});
	}

	button.addEventListener('click', function () {
		if (!isFixedBlockVisible) {
			addCustomClass(innerBox);

			scrollToItem();

			setTimeout(() => {
				disableScroll();
				fadeIn(fixedBlock, 400, 'block');

				const updatedPosition = window.innerHeight - item.getBoundingClientRect().bottom;
				setListPosition(updatedPosition);

				setupCloseHandler(fixedBlock, innerBox);
				initShowNextHandler(item, innerBox);
				isFixedBlockVisible = true;

				document.querySelector(':root').style.setProperty('--list-item-height', `${innerBox.clientHeight}px`);
			}, 600);
		} else {
			removeCustomClass(innerBox)
			fadeOut(fixedBlock, 400);
			enableScroll();
			isFixedBlockVisible = false;
		}
	});
});

function setListPosition(position) {
	document.querySelector(':root').style.setProperty('--article-height', `${position}px`);
}


function setupCloseHandler(fixedBlock, innerBox) {

	const closeBtns = fixedBlock.querySelectorAll('[data-close]');
	closeBtns.forEach(closeBtn => {
		closeBtn.onclick = function () {
			removeCustomClass(innerBox);
			fadeOut(fixedBlock, 400);
			enableScroll();
			isFixedBlockVisible = false;
		}
	});
}

function initShowNextHandler(prevBlock, innerBox) {
	const currentBlock = prevBlock.nextElementSibling;


	if (currentBlock) {
		prevBlock.querySelector('[data-next]').onclick = function () {
			removeCustomClass(innerBox);
			setTimeout(function () {
				fadeOut(prevBlock.querySelector('.services-box__article'), 400);
				enableScroll();
				isFixedBlockVisible = false;
			}, 200);

			setTimeout(function () {
				isFixedBlockVisible = false;
				currentBlock.querySelector('.arrow-button').click();
			}, 400);
		};
	}
}
