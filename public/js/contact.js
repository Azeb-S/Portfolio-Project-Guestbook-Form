
//Make sure that any validation errors appear inline, near the relevant form fields.Do not use alerts.


document.addEventListener("DOMContentLoaded", () => {


  const howWeMeet = document.getElementById("meet")
  const mailingList = document.getElementById("mailingList")
  const radioField = document.getElementById("radio-field")
  const otherWrap = document.getElementById("other-wrap")
  const otherInput = document.getElementById("otherinput")
  const emailBlock = document.getElementById("emailblock")


  document.getElementById("contact-form").onsubmit = (e) => {

    const fname = document.getElementById("fname").value.trim()
    const lname = document.getElementById("lname").value.trim()
    const email = document.getElementById("email").value.trim()
    const linkinLink = document.getElementById("lurl").value.trim()

    clearErrors()
    // Flag variable to determine if form data is valid
    let isValid = true

    //First name are required validation 


    if (!fname) {
      document.getElementById("err-fname").style.display = "block"
      isValid = false
    }
    //Last name are required Validation


    if (!lname) {
      document.getElementById("err-lname").style.display = "block"
      isValid = false
    }

    /**
    Email address is optional. But if the user provides one, it must contain an @ symbol and a dot (.)
    Challenge:  Google how to use regular expressions in JavaScript to validate your email address
    If the user checks the mailing list checkbox, then email address is required
     */




    if (mailingList.checked) {

      if (!email) {
        document.getElementById("err-emailc").style.display = "block"
        isValid = false
      }
    } else {

      if (email && (!email.includes("@") || !email.includes("."))) {
        document.getElementById("err-email").style.display = "block"
        isValid = false
      }
    }

    //LinkedIn address is optional. If one is provided, it must start with "https://linkedin.com/in/"


    if (linkinLink && !linkinLink.startsWith("https://linkedin.com/in/")) {
      document.getElementById("err-lurl").style.display = "block"
      isValid = false

    }

    //"How we met" is required.

    //other-wrap the div
    //err-other err for other

    if (howWeMeet.value === "none") {
      document.getElementById("err-meet").style.display = "block"
      isValid = false
    } else if (howWeMeet.value === "other" && otherInput.value.trim() === "") {
      // document.getElementById("err-meet").textContent = "Please specify how we met!"
      document.getElementById("err-other").style.display = "block"
      isValid = false
    }
    // Return isValid flag
    //return isValid
    if (!isValid) {
      e.preventDefault()
    }
    // else: allow normal post to /submit-order → server renders confirmation.ejs
  }



  /**
    Modify your form so that the email format buttons (HTML, text) are only visible when the mailing list checkbox is checked, 
    */


  function syncEmailFormatVisibility() {
    if (mailingList.checked) {
      radioField.style.display = "block"
    } else {
      radioField.style.display = "none"
    }
  }

  // show/hide the email block based on the checkbox
  function syncEmailBlockVisibility() {
    // if some CSS class hides it, ensure it's removed
    emailBlock.classList.remove("hidden") // safe even if you don't use .hidden
    if (mailingList.checked) {
      emailBlock.style.display = "grid"   // or "block"
    } else {
      emailBlock.style.display = "none"
    }

  }

  // run once on load and whenever the checkbox changes
  syncEmailBlockVisibility()
  mailingList.addEventListener("change", syncEmailBlockVisibility)



  syncEmailFormatVisibility()
  mailingList.addEventListener("change", syncEmailFormatVisibility)


  //and the "Other (please specify)" textbox is only visible when "Other" is selected from the "How we met" dropdown list.





  function howWeMeetOther() {
    //const howWeMeet = howWeMeet.value
    if (howWeMeet.value === "other") {
      otherWrap.style.display = "grid"
    } else {
      otherWrap.style.display = "none"
      otherInput.value = ""
    }

    // isValid = false

  }

  howWeMeetOther()
  howWeMeet.addEventListener("change", howWeMeetOther)



  function clearErrors() {
    let errors = document.getElementsByClassName("error")
    for (let i = 0; i < errors.length; i++) {
      errors[i].style.display = "none"
    }
  }
})