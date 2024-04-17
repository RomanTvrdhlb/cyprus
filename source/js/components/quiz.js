import {addClassInArray,removeCustomClass, fadeOut, fadeIn, addCustomClass} from '../functions/customFunctions';

const sectionParents = document.querySelectorAll('[data-quiz]');
const btnClass = 'main-btn--disable';

sectionParents.forEach(function(section){
    const quizSlides = section.querySelectorAll('.quiz-list__item');
    const quizSlidesLength = quizSlides.length;
    const quizStatus = section.querySelector('.quiz-status');
    const btnNext = section.querySelector('[data-next]');
    const btnPrev = section.querySelector('[data-prev]');
    const currentNumber = section.querySelector('.quiz-section__current');
    const allNumber = section.querySelector('.quiz-section__all');
    const thumb = section.querySelector('.quiz-status__thumb');

    allNumber.innerText = quizSlidesLength;
    let clicks = 0;
    const totalClicks = quizSlidesLength - 1;

    function incrementProgress() {
        addCustomClass(document.querySelectorAll('.quiz-status__point')[clicks + 1]);
        if (clicks < totalClicks) {
            clicks++;
            const progress = (clicks / totalClicks) * 100;
            thumb.style.width = progress + '%';
        }
    }

    function decrementProgress() {
        removeCustomClass(document.querySelectorAll('.quiz-status__point')[clicks]);
        if (clicks > 0) {
            clicks--;
            const progress = (clicks / totalClicks) * 100;
            thumb.style.width = progress + '%';
        }
    }

    for(let i = 0;  i < quizSlidesLength; i++){
        const spanEl = `<span class='quiz-status__point'></span>`
        quizStatus.insertAdjacentHTML('beforeend', spanEl);
    }

    btnNext.addEventListener('click', function(e){
        e.preventDefault();
        
        if(!quizSlides[quizSlidesLength - 1].classList.contains('active')){
            showNextSlide(btnNext, currentNumber);
            incrementProgress();
            removeCustomClass(btnPrev, btnClass);
        
        }

        if(quizSlides[quizSlidesLength - 1].classList.contains('active')){
            fadeOut(document.querySelector('.quiz-section__bottom'), 0);
            fadeOut(document.querySelector('.quiz-section__top'), 0);
        }
    })

    btnPrev.addEventListener('click', function(e){
        e.preventDefault();
    
        if(!quizSlides[0].classList.contains('active')){
            showPrevSlide(btnPrev, btnNext, currentNumber);
            decrementProgress();
        } 
        if(quizSlides[0].classList.contains('active')){
            addCustomClass(btnPrev, btnClass);
        }
    })

    document.addEventListener('DOMContentLoaded', function(){
        addClassInArray([btnNext, btnPrev], btnClass);
    });

    document.querySelectorAll('.quiz-section input[type="radio"]').forEach(function(checkbox){
        checkbox.addEventListener('click', function(){
            checkState(btnNext);
        });
    })
})

    function checkCheckboxes(selector){
        const checkboxes = selector.querySelectorAll('input[type="radio"]')
        
        for(let checkbox of checkboxes){
            if(checkbox.checked){
                return true;
            } 
        }
        return false;
    }

    function checkState(btn){
        const activeSlide = document.querySelector('.quiz-list__item.active');
        const checkboxes = activeSlide.querySelectorAll('input[type="radio"]');
        checkboxes.forEach(function(checkbox){
            if(checkCheckboxes(activeSlide)){
                removeCustomClass(btn, btnClass);
            } 
            if(!checkCheckboxes(activeSlide)){
                addCustomClass(btn, btnClass);
            }
        })
    }

    function showNextSlide(btn, number){
        const activeSlide = document.querySelector('.quiz-list__item.active');
        const nextSlide = activeSlide.nextElementSibling;

        if(checkCheckboxes(activeSlide)){
            fadeOut(activeSlide, 0);
            removeCustomClass(activeSlide);
            fadeIn(nextSlide, 600, 'flex');
            addCustomClass(nextSlide);
            +number.innerText++
        } 

        if(!checkCheckboxes(nextSlide)){
            addCustomClass(btn, btnClass);
        }

        const position = document.querySelector('.quiz-section').offsetTop - document.querySelector('header').offsetHeight;

        window.scrollTo({
            top: position, 
            behavior:'smooth'
        });
    }

    function showPrevSlide(btn, nextBtn, number){
        const activeSlide = document.querySelector('.quiz-list__item.active');
        const prevSlide = activeSlide.previousElementSibling;
        fadeOut(activeSlide, 0);
        removeCustomClass(activeSlide);
        fadeIn(prevSlide, 600, 'flex');
        addCustomClass(prevSlide);
        +number.innerText--;
        removeCustomClass(btn, btnClass);

        if(checkCheckboxes(prevSlide)){
            removeCustomClass(nextBtn, btnClass);
        }

        const position = document.querySelector('.quiz-section').offsetTop - document.querySelector('header').offsetHeight;
    
        window.scrollTo({
            top: position, 
            behavior:'smooth'
        });
    }