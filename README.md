# pivotaltracker

A node.js wrapper for the Pivotal Tracker API (v5).


### Installation

    npm install pivotaltracker


### tl;dr

##### Standard resource CRUD methods:

* all(cb)
* get(id, cb)
* create(data, cb)
* update(data, cb)
* delete(id, cb)

##### Examples:

Get all projects for the user:
```javascript
var tracker = require('pivotaltracker');
var client = new tracker.Client('mytoken');

client.projects.all(function(error, projects) {

    /* Stuff & things (projects returned in an array) */
});

```

Get a *specific* project:
```javascript
client.project(12345).get(function(error, project) {

    /* Bells & whistles (data returned as a single project object) */
});

```

Get all stories in a project:
```javascript
client.project(12345).stories.all(function(error, stories) {

    /* Livin' it up.. (stories returned in an array) */
});

```

Get a *specific* story in a *specific* project:
```javascript
client.project(12345).story(67890).get(function(error, story) {

    /* Doin' the thang.. (data returned as a single story object) */
});

```


### Authentication
https://www.pivotaltracker.com/help/api#Request_Authentication_and_CORS

Authenticating is easy. Pass in a string with the user's API token when creating a client:
```javascript
var tracker = require('pivotaltracker');
var client = new tracker.Client('apiToken');
```

Change the token at any time. Note that this will affect & auto-update the token for any "sub-services" (for projects, stories, etc.) accessed via this client instance:
```javascript
var tracker = require('pivotaltracker');
var client = tracker.Client();

/* stuff happens... */

client.useToken('apiToken');
```

You can also retrieve the token with a username and password:
```javascript
var tracker = require('pivotaltracker');
var user = 'mario';
var password = 'fireball';

tracker.getToken(user, password, function(error, token) {

    /* Super cool logic */
});
```


### Naming Conventions

#### Singular vs. Plural "Service" Names

Want to get multiple instances of a resource (eg. "all stories")? Use the plural form of the resource name:
```javascript
// GET http://www.pivotaltracker.com/services/v5/projects

client.projects.all(function(error, projects) {
    /* ... */
});
```

Want a particular instance? Use the singular form of the resource name and pass in the identifier:
```javascript
// GET http://www.pivotaltracker.com/services/v5/projects/123

client.project(123).get(function(error, project) {
    /* ... */
});
```

#### Service Chaining & the Resource Hierarchy
Chaining works in a way that reflects the hierarchy of the REST API's resource objects.

Example:

Access to CRUD methods for comments is provided via stories...
```javascript
client.project(123).story(456).comments.all(function(error, comments) {

    /* This is totally a thing. */
});

```

...but you can't get to comments directly by way of projects, since the two resources have only an indirect relationship via stories...
```javascript
client.project(123).comments.all(function(error, comments) {

    /* This is not a thing. Exception city over here. */
});

```

...which is a reflection of the structure of the REST web API:
```javascript
/* Not a thing...  */
GET http://www.pivotaltracker.com/services/v5/projects/123/comments

/* ...but this is. */
GET http://www.pivotaltracker.com/services/v5/projects/123/stories/456/comments

```


#### Variable & Property Name Capitalization
The underscore_naming_convention is used when transmitting data to/from Pivotal, while the "public" interface for this module uses the camelCase convention. It will automatically translate names when sending/retrieving data from the service, converting camelCaseNames to & from underscore_names as needed.

You should interface using camelCase convention:
```javascript
proj.name = 'hay guyz, new name';
proj.enableFollowing = true;
proj.weekStartDay = 'Friday';

client.project(123).update(proj, function(error, updatedProject) {

    /* moar things */
});

```

We'll deal with converting that to:
```javascript
PUT http://www.pivotaltracker.com/services/v4/projects/123

{
    "name" : "hay guyz, new name",
    "enable_following": true,
    "week_start_day": "Friday"
}

```

...and vice-versa.



### Type Validation
The Basics:

JSON is the data transfer format, so there's a layer of JSON.parse() and JSON.stringify() on incoming & outgoing POST/PUT body data, respectively.

In addition to this, for ease of use, type coercion is applied according to whatever JS type is equivalent to the data type specified for a for a given resource's property in the Pivotal API docs. *NOTE that this is true both for data retrieved from the API as well as for property values you set on instantiated objects.*

Here are the basics of how type coercion is applied:

1. Regardless of Pivotal-specified data type, the following values, when passed into object property setters, are always defaulted to null:
    * null
    * undefined
    * empty string
    * functions

2. Otherwise, when the Pivotal data type is
    * "string"
        * Setter coerces values to js String, using toString()
    * "int"
        * Setter coerces values to js Number, using toInt() w/ radix 10. If NaN, stored as null.
    * "float"
        * Setter coerces values to js Number, using toFloat(). If NaN, stored as null.
    * "date" / "datetime"
        * Setter coerces values to js Date, using validator's toDate(). If invalid data, stored as null.
    * "list"
        * If value is an array, stored as-is. Else, stored as null.
    * object / associated resource
        * If a non-null, non-array value has type 'object', it's set as-is. All other values are defaulted to null.


### API
[Module API Documentation](./docs/README.md)


### Running Tests
```
$ npm test
```

### Complete Pivotal Tracker API (v5) Documentation

https://www.pivotaltracker.com/help/api?version=v5


### Roadmap
#### Support planned in future versions for:
* [Iteration Overrides](https://www.pivotaltracker.com/help/api/rest/v5#Iterations "Pivotal Tracker API Documentation - Iteration Overrides")
* [Google Attachments](https://www.pivotaltracker.com/help/api/rest/v5#Attachments "Pivotal Tracker API Documentation - Google Attachments")
* [Top-level Story service (not accessed through a particular project)](https://www.pivotaltracker.com/help/api/rest/v5#Attachments "Pivotal Tracker API Documentation - Stories")
* [Top-level Epic service (not accessed through a particular project)](https://www.pivotaltracker.com/help/api/rest/v5#Epics "Pivotal Tracker API Documentation - Epics")
* [Followers](https://www.pivotaltracker.com/help/api/rest/v5#follower_resource "Pivotal Tracker API Documentation - Followers")
* [Saved Searches](https://www.pivotaltracker.com/help/api/rest/v5#Saved_Search "Pivotal Tracker API Documentation - Saved Searches")
* [Project Webhooks](https://www.pivotaltracker.com/help/api/rest/v5#Project_Webhooks "Pivotal Tracker API Documentation - Project Webhooks")
* [Project Integrations](https://www.pivotaltracker.com/help/api/rest/v5#Project_Integrations "Pivotal Tracker API Documentation - Project Integrations")
* [Exports](https://www.pivotaltracker.com/help/api/rest/v5#Exports "Pivotal Tracker API Documentation - Exports")
* [Source Commits](https://www.pivotaltracker.com/help/api/rest/v5#Source_Commits "Pivotal Tracker API Documentation - Source Commits")
* Configuration Options:
    * underscore vs. camel case naming convention
    * on/off type coercionyou


### License (MIT)

Copyright (c) 2014 General UI LLC &lt;support@generalui.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
