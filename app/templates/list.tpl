<% if (books.length === 0) { %>
    <div class="loader">loading list..</div>
<% } else { %>
	<% _.each(books, function(book) { %> 
		<li class="book" data-id="<%= book.id %>">
			<div class="thumb"><img src="<%= book.baseUrl + book.thumb %>"></div>
			<span class="title"><%= book.title %> by <%= book.author %></span>
			<span class="detail">rating: <%= book.rating %> first published in <%= book.published %></span>
			<span class="icon icon-arrow-right"></span>
		</li>
	<% }) %>
<% } %>