document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("comment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const commentData = {
        comment_text: document.querySelector('textarea[name="comment"]').value,
      };

      const postId = this.getAttribute("data-id");

      fetch(`/blog/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          document.location.href = `/blog/${postId}`;
        } else {
          alert("Failed to create comment");
        }
      });
    });

  document.querySelector(".delete-btn").addEventListener("click", function (e) {
    e.preventDefault();

    const postId = this.getAttribute("data-id");

    fetch(`/blog/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        document.location.href = `/dashboard`;
      } else {
        alert("Failed to delete post");
      }
    });
  });
});
