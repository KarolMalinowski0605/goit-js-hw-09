

import Notiflix from "notiflix";




function createPromise(position, delay) {
 const promise =  new Promise((resolve, reject) => {
   
    setTimeout(() => {
     
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); 
      }
    }, delay);
    
  });
  return promise;
  
}

  const form = document.querySelector('.form');

  
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    const delayInput = document.querySelector('[name="delay"]');
    const stepInput = document.querySelector('[name="step"]');
    const amountInput = document.querySelector('[name="amount"]');
    
    for (let i = 0; i < amountInput.value; i++) {
    
      const currentDelay = parseInt(delayInput.value, 10) + (i * parseInt(stepInput.value, 10));
      
      
       createPromise(2, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            timeout: 8000, 
          });
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            timeout: 8000, 
          });
        });
    }
  });

  










