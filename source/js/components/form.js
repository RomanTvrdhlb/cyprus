const fileInput = document.getElementById('fileInput');
const fileListContainer = document.getElementById('fileList');
let filesList = [];
const updateFileListDisplay = () => {
	fileListContainer.innerHTML = '';
	filesList.forEach((file, index) => {
		const fileElement = document.createElement('span');
		fileElement.classList.add('main-form__add-item');
		fileElement.textContent = file.name;
		fileElement.onclick = () => {
			filesList = filesList.filter((f, i) => i !== index);
			updateFileListDisplay();
		};

		fileListContainer.appendChild(fileElement);
	});
};

if (fileInput &&  fileListContainer) {
	fileInput.addEventListener('change', (event) => {
		Array.from(event.target.files).forEach(file => {
			filesList.push(file);
		});
		updateFileListDisplay();
	});
}
