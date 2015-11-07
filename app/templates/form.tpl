<div class="title"><h1>User Form module</h1></div>
<form class="user">
	<div class="row">
		<label for="firstName">First Name</label>
		<input id="firstName" placeholder="first name" name="firstName" type="text" value="<%= user.firstName %>">
	</div>
	<div class="row">
		<label for="lastName">Last Name</label>
		<input id="lastName" placeholder="last name" name="lastName" type="text" value="<%= user.lastName %>">
	</div>
	<div class="row horizontal">
		<label for="gender">Gender</label>
		<select id="gender" class="right" name="gender">
			<option <%= user.gender === 'female' ? 'selected': '' %> value="female">Female</option>
			<option <%= user.gender === 'male' ? 'selected': '' %> value="male">Male</option>
		</select>
	</div>
	<div class="row">
		<label for="writer">Writer<input class="right" id="writer" name="writer" type="checkbox" <%= user.writer ? 'checked' : '' %> ></label>
	</div>
	<input class="btn" type="submit" name="submit" value="Submit" />
</form>