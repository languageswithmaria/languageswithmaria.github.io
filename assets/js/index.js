function toggleThanksMessage() {
  var text = document.getElementById("thank_message");
  text.style.display = "block";

  var email = document.getElementById("email");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");
  console.log('aa', email.value, subject.value, message.value)
  email.value = ""
  subject.value = ""
  message.value = ""
}
