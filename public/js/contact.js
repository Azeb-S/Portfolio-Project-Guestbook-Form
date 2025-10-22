
//Make sure that any validation errors appear inline, near the relevant form fields.Do not use alerts.


document.addEventListener("DOMContentLoaded", () => {

 document.getElementById("contact-form").onsubmit = () => {



  clearErrors()
  // Flag variable to determine if form data is valid
  let isValid = true

  //First name are required validation 

  let fname = document.getElementById("fname").value.trim()
  if (!fname) {
   document.getElementById("err-fname").style.display = "block"
   isValid = false
  }
  //Last name are required Validation

  let lname = document.getElementById("lname").value.trim()
  if (!fname) {
   document.getElementById("err-lname").style.display = "block"
   isValid = false
  }

  /**
  Email address is optional. But if the user provides one, it must contain an @ symbol and a dot (.)
  Challenge:  Google how to use regular expressions in JavaScript to validate your email address
  If the user checks the mailing list checkbox, then email address is required
   */

  let email = document.getElementById("email").value.trim()
  let mailingList = document.getElementById("mailingList")

  if (mailingList.checked) {
   if (!email || !email.includes("@") || !email.includes(".")) {
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

  let linkinLink = document.getElementById("lurl").value.trim()
  if (linkinLink && !linkinLink.startsWith("https://linkedin.com/in/")) {
   document.getElementById("err-lurl").style.display = "block"
  }

  //"How we met" is required.

  //other-wrap the div
  //err-other err for other
  if (howWeMeet.value === "none") {
   document.getElementById("err-meet").style.display = "block"
   isValid = false
  } else if (otherInput.value.trim() === "") {
   // document.getElementById("err-meet").textContent = "Please specify how we met!"
   document.getElementById("err-other").style.display = "block"
   isValid = false
  }
  // Return isValid flag
  return isValid

 }
 /**
   Modify your form so that the email format buttons (HTML, text) are only visible when the mailing list checkbox is checked, 
   */
 const mailingList = document.getElementById("mailingList")
 const radioField = document.getElementById("radio-field")

 function syncEmailFormatVisibility() {
  if (mailingList.checked) {
   radioField.style.display = "block"
  }
 }

 syncEmailFormatVisibility()
 mailingList.addEventListener("change", syncEmailFormatVisibility)


 //and the "Other (please specify)" textbox is only visible when "Other" is selected from the "How we met" dropdown list.


 let howWeMeet = document.getElementById("meet")
 let otherWrap = document.getElementById("other-wrap")
 let otherInput = document.getElementById("other-input")

 function howWeMeetOther() {
  const howWeMeet = meet.value
  if (howWeMeet === "other") {
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