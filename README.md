# Graphql-Queries
 This repo contains personally made graphql queries and implementations.

Graphql makes it easier to build and understand complex api calls.


Also you can fetch varied data in a single api call.
i.e unlike in rest-api where for user data you make one api call and for posts you make another api call

Also you have to have different endpoints defined to serve those call requests.

Graphql minimizes the call requests efficiently, depends on how well you have defined your schema and resolvers

The only drawback to a graphql api over a rest api would be it does not provide a status value.
while rest api calls provide a status with each response so deceloper can decide how to handle that response with the status it reported. 

Graphql is best used with rapidly changing data.

Every Graphql query should have a predefined schema and a resolver for it.
 - A schema has the structure for your data that will be fetched through graphql api.
 - A resolver contains the returned data when received a query. You can also add functions to filter or perform action on the data based on user query before it is passed to the user through response.
