let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  posts.forEach((post, index) => {
    container.innerHTML += `
      <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>— ${post.author}</small><br><br>
        <button class="btn" onclick="editPost(${index})">Edit</button>
        <button class="btn" onclick="deletePost(${index})">Delete</button>
      </div>
    `;
  });
}

document.getElementById('blogForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const index = document.getElementById('postIndex').value;
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const author = document.getElementById('author').value.trim();

  if (!title || !content || !author) {
    alert("All fields are required!");
    return;
  }

  const post = { title, content, author };

  if (index === '') {
    posts.push(post); 
  } else {
    posts[index] = post; 
  }

  localStorage.setItem('posts', JSON.stringify(posts));
  document.getElementById('blogForm').reset();
  document.getElementById('postIndex').value = '';
  renderPosts();
});

function editPost(index) {
  const post = posts[index];
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  document.getElementById('author').value = post.author;
  document.getElementById('postIndex').value = index;
}

function deletePost(index) {
  if (confirm('Delete this post?')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}
renderPosts();
