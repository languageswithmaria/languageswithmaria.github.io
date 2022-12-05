/**
* PHP Email Form Validation - v3.5
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              console.log(1)
              displayError(thisForm, error)
            }
          });
        } else {
          console.log(2)
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }

    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');

      var jsoninfo = JSON.parse(data)

      // if (data.trim() == 'OK') {
      if (jsoninfo.ok == true) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
      }
    })
    .catch((error) => {
      console.log(3)
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    // thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').innerHTML = "Seems to be some error. You can try to contact me directly to my email.";
    thisForm.querySelector('.error-message').classList.add('d-block');
    console.log('error:', error)
  }

})();
