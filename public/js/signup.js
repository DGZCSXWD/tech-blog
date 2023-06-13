document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userData = {
        username: document.querySelector('#signup-form input[name="username"]')
          .value,
        password: document.querySelector('#signup-form input[name="password"]')
          .value,
      };

      fetch("/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to sign up");
        }
      });
    });
});
