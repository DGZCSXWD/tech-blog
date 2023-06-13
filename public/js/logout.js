document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        document.location.href = "/";
      } else {
        alert("Failed to logout");
      }
    });
  });
});
