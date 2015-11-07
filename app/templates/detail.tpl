<div class="title"><h1><%= book.title %></h1></div>
<div class="img"><img src="<%= book.baseUrl + book.image %>"></div>
<div class="info">
	<span class="author">By <%= book.author %></span>
	<span class="rating">Rating: <%= book.rating %></span>
	<span class="published">Published on <%= book.published %></span>
</div>
<hr/>
<div class="description">
	<%= book.description %>
</div>