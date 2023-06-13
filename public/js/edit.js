document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("edit-post-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const postData = {
        title: document.querySelector('input[name="title"]').value,
        content: document.querySelector('textarea[name="content"]').value,
      };

      const id = this.getAttribute("data-id");

      fetch(`/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post");
        }
      });
    });
});
