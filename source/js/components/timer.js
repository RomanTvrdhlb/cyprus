document.addEventListener('DOMContentLoaded', function() {
	const timerElement = document.querySelector('.timer-info');

	if (timerElement) {
		const duration =  timerElement.getAttribute('data-timer').split(':');

		const days = parseInt(duration[0]);
		const hours = parseInt(duration[1]);
		const minutes = parseInt(duration[2]);
		const seconds = parseInt(duration[3]);

		// Преобразование времени в миллисекунды
		const endTime = new Date().getTime() + ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds) * 1000;

		const interval = setInterval(function() {
			const now = new Date().getTime();
			const difference = endTime - now;

			if (difference <= 0) {
				clearInterval(interval);
				timerElement.querySelectorAll('.timer-info__num').forEach((item)=> {
					item.textContent = '00'
				})
				timerElement.setAttribute('data-title', 'Час вийшов!');
				return;
			}

			// Вычисление оставшегося времени
			const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
			const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

			// Обновление элементов на странице
			timerElement.querySelector('.days').textContent = remainingDays;
			timerElement.querySelector('.hours').textContent = remainingHours;
			timerElement.querySelector('.minutes').textContent = remainingMinutes;
			timerElement.querySelector('.seconds').textContent = remainingSeconds;
		}, 1000);
	}

});
