# pivotal-tracker

pivotal-tracker is a node.js wrapper for the Pivotal Tracker API (v5).


## Installation

    npm install pivotal-tracker


## tl;dr

Get all projects for the user:
```javascript
var tracker = require('pivotal-tracker');
var client = new tracker.Client('mytoken');

client.projects.all(function(error, projects){

    /* Stuff & things (projects returned in an array) */
});

```

Get a *specific* project:
```javascript
client.project(12345).get(function(error, project){

    /* Bells & whistles (data returned as a single project object) */ 
});

```

Get all stories in a project:
```javascript
client.project(12345).stories.all(function(error, stories){

    /* Livin' it up.. (stories returned in an array) */
});

```

Get a *specific* story in a *specific* project:
```javascript
client.project(12345).story(67890).get(function(error, story){

    /* Doin' the thang.. (data returned as a single story object) */
});

```


## Authentication
https://www.pivotaltracker.com/help/api#Request_Authentication_and_CORS

Authenticating is easy. Pass in a string with the user's API token when creating a client:
```javascript
var tracker = require('pivotal-tracker');
var client = new tracker.Client('apiToken');
```

Change the token at any time. Note that this will affect & auto-update the token for any "sub-services" (for projects, stories, etc.) accessed via this client instance:
```javascript
var tracker = require('pivotal-tracker');
var client = tracker.Client('firstToken');

/* stuff happens... */

client.useToken('apiToken');
```

You can also retrieve the token with a username and password:
```javascript
var tracker = require('pivotal-tracker');
var user = 'mario';
var password = 'fireball';

tracker.getToken(user, password, function(error, token){

    /* Super cool logic */
});
```


## Naming Conventions

#### Singular vs. Plural "Service" Names (Methods vs. (Non-Function) Properties)

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
Think of access to the various resources in terms of the inherent hierarchy of RESTful services.

These hierarchical relationships are reflected in the pivotal-tracker module interface.

Example:

Access to CRUD methods for comments is provided via the story sub-service...
```javascript
client.project(123).story(456).comments.all(function(error, comments) {

    /* This is totally a thing. */
});

```

...but you can't get to comments directly by way of a project, since the two resources have only an indirect relationship via stories...
```javascript
client.project(123).comments.all(function(error, comments) {

    /* This is not a thing. Exception city over here. */
});

```

...which is a reflection of the structure of the REST web API:
```javascript
/* Not a thing... */
GET http://www.pivotaltracker.com/services/v5/projects/123/comments

/* ...but this is.     */
GET http://www.pivotaltracker.com/services/v5/projects/123/stories/456/comments

```


#### Variable & Property Name Capitalization
As is common with JSON interfaces, the property names recognized & returned by the v5 Pivotal Tracker REST service follow an underscore_naming_convention.

It's also of course the case that JS code commonly follows the camelCaseNamingConvention for variables and properties.

Instead of forcing one convention or the other, both are satisfied; underscore is used when transmitting to/from Pivotal, while the "public" interface for this module uses camelCase. It will automatically translate names when sending/retrieving data from the service, converting camelCaseNames to & from underscore_names as needed.

In other words...you should interact with using the camelCase convention:
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
// PUT http://www.pivotaltracker.com/services/v4/projects/123

{
    "name" : "hay guyz, new name",
    "enable_following": true,
    "week_start_day": "Friday"
}

```

...and vice-versa.



## Type Conversion
The Basics:

JSON is the data transfer format, so there's a layer of JSON.parse() and JSON.stringify() on incoming & outgoing POST/PUT body data, respectively.

In addition to this, for ease of use, type coersion is applied according to whatever JS type is equivalent to the data type specified for a for a given resource's property in the Pivotal API docs. *NOTE that this is true both for data retrieved from the API as well as for property values you set on instantiated objects.*

Here are the basics of how type coersion is applied:

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


## API

#### tracker main
* tracker.getToken
* tracker.Client
* tracker.fileAttachment

#### tracker Client
* client.getToken
* client.useToken
* client.account
* client.accounts
* client.project
* client.projects

#### account Service
* account.membership
* account.memberships

#### account membership Service
* acctmember.all
* acctmember.get
* acctmember.create
* acctmember.update
* acctmember.delete

#### project Service
* project.all
* project.get
* project.create
* project.update
* project.delete
* project.membership
* project.memberships
* project.label
* project.labels
* project.epic
* project.epics
* project.story
* project.stories
* project.uploads

#### project membership Service
* projmember.all
* projmember.get
* projmember.create
* projmember.update
* projmember.delete

#### epic Service
* epic.all
* epic.get
* epic.create
* epic.update
* epic.delete
* epic.comment
* epic.comments

#### story Service
* story.all
* story.get
* story.create
* story.update
* story.delete
* story.task
* story.tasks
* story.label
* story.labels
* story.comment
* story.comments

#### task Service
* task.all
* task.get
* task.create
* task.update
* task.delete

#### label Service
* label.all
* label.get
* label.create
* label.update
* label.delete

#### comment Service
* comment.all
* comment.get
* comment.create
* comment.update
* comment.delete
* comment.fileAttachment

#### file attachment Service
* attachment.delete
* attachment.upload
* attachment.download


## Running Tests
```
$ npm test
```

## Full Pivotal Tracker API (v5) Documentation

https://www.pivotaltracker.com/help/api?version=v5


## Roadmap
#### Support planned in future versions for:
* Iteration Overrides
* Google Attachments
* Top-level Story service (not accessed throug a particular project)
* Top-level Epic service (not accessed throug a particular project)
+ Followers
+ Saved Searches
+ Project Webhooks
+ Project Integrations
+ Exports
+ Source Commits


## License (MIT)

Copyright (c) 2014 Sabra Pratt pratt.sabra@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.