import noUiSlider from 'nouislider';

const sliders = document.querySelectorAll('.custom-range');

sliders.forEach((slider) => {
  const min = +slider.dataset.min;
  const max = +slider.dataset.max;
  const defaultMin = +slider.dataset.defaultMin;
  const defaultMax = +slider.dataset.defaultMax;
  const rangeSlider = slider.querySelector('.custom-range__slide');
  const inputs = slider.querySelectorAll('input[type="number"]');
  const minValueInput = inputs[0];
  const maxValueInput = inputs[1];

  const updateInputs = (values) => {
    const [minValue, maxValue] = values;
    minValueInput.value = parseInt(minValue);
    maxValueInput.value = parseInt(maxValue);
  };

  const updateSlider = () => {
    const newMin = parseInt(minValueInput.value);
    const newMax = parseInt(maxValueInput.value);
    rangeSlider.noUiSlider.set([newMin, newMax]);
  };

  noUiSlider.create(rangeSlider, {
    start: [defaultMin, defaultMax],
    connect: true,
    step: 1,
    range: {
      'min': min,
      'max': max
    },

    handleAttributes: [
      { 'aria-label': 'lower' },
      { 'aria-label': 'upper' },
    ],
  });

  rangeSlider.noUiSlider.on('update', updateInputs);

  minValueInput.addEventListener('change', updateSlider);
  maxValueInput.addEventListener('change', updateSlider);
});




