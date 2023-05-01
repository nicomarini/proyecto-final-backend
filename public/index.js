const URL = "http://localhost:8080";

const phoneInputField = document.getElementById("phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function TelephoneCodes(event) {
  let phone = phoneInput.getNumber();
  document.getElementById("phoneNumber").value = phone;
}

function SendToCart(pid) {
  return fetch(`${URL}/cart`, {
    method: "POST",
    body: JSON.stringify({ id: pid }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

function DeleteProduct(pid) {
  return fetch(`${URL}/cart/product`, {
    method: "POST",
    body: JSON.stringify({ id: pid }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
function DeleteCart() {
  return fetch(`${URL}/cart`, { method: "DELETE" });
}
