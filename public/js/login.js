document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const userData = {
        username: document.querySelector('#login-form input[name="username"]')
          .value,
        password: document.querySelector('#login-form input[name="password"]')
          .value,
      };

      fetch("/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        }
      });
    });
});
