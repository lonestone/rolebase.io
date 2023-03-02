# @rolebaseio/api

Api provided by NHost ❤️


## How it's work

+ We use serverless functions inside `functions` directory. It's exposed route.
+ We use `nhost+hasura` graphql API for request information


## FAQ

### Why not use hasura server for getting schema in graphql.config.json ?

+ Source of true is what codegen provide 
+ It's avoid typing .gql with new file inside and forgot to launch codegen
+ Seem faster

### Why don't use NHost Graphql Client ?

+ Loose strict typechecking
+ Less performant