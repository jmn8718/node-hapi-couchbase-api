# we query for the users
curl -X GET "http://localhost:5000/api/v1/users"

# we create a user
curl -X POST -H "Content-Type: application/json" -d '{
	"name": "jose",
	"password": "jose",
	"email": "jose.navarro@famoco.com"
}' "http://localhost:5000/api/v1/users"

# we should get a json with a user
curl -X GET "http://localhost:5000/api/v1/users"

# we should get the users with that id
curl -X GET "http://localhost:5000/api/v1/users/e0b66baa-851d-4aae-9ef2-f12575519e5e"

# we update the user
curl -X PUT -H "Content-Type: application/json" -d '{
	"name": "jose_update",
	"password": "joseedit"
}' "http://localhost:5000/api/v1/users/e0b66baa-851d-4aae-9ef2-f12575519e5e"

# we delete the user
curl -X DELETE "http://localhost:5000/api/v1/users/e0b66baa-851d-4aae-9ef2-f12575519e5e"


# posts
# we query for the post of a user
curl -X GET "http://localhost:5000/api/v1/users/e717b7a3-e991-441e-8bca-562f2a572b19/posts"

# we create a post
curl -X POST -H "Content-Type: application/json" -d '{
	"title": "my post title",
	"body": "my post body"
}' "http://localhost:5000/api/v1/users/e717b7a3-e991-441e-8bca-562f2a572b19/posts"

# we query for a post
curl -X GET "http://localhost:5000/api/v1/users/e717b7a3-e991-441e-8bca-562f2a572b19/posts/94b1dd8e-73aa-4e4e-8b29-0870e6515945"

# we update a post
curl -X PUT -H "Content-Type: application/json" -d '{
	"title": "my edited title",
	"body": "my edited body"
}' "http://localhost:5000/api/v1/users/e717b7a3-e991-441e-8bca-562f2a572b19/posts/94b1dd8e-73aa-4e4e-8b29-0870e6515945"

# we delete a post
curl -X DELETE "http://localhost:5000/api/v1/users/e717b7a3-e991-441e-8bca-562f2a572b19/posts/94b1dd8e-73aa-4e4e-8b29-0870e6515945"
