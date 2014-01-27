# pivotal-tracker

pivotal-tracker is a node.js wrapper for the Pivotal Tracker API (v5).


## Installation

    npm install pivotal-tracker


## Quick Start

Get *all* projects for the user:
```javascript
var tracker = require('pivotal-tracker');
var client = new tracker.Client('mytoken');

client.projects.all(function(error, projects){

    // Stuff & Things
    
});

```

Get a *specific* story in a project:
```javascript
var tracker = require('pivotal-tracker');
var pivotal = new tracker.Client('mytoken');

client.project(12345).story(67890).get(function(error, projects){

    // Bells & Whistles
    
});

```


## Property Naming: "Sub-Services" and the Singular/Plural Convention
Think of access to the various resources in terms of the inherent hierarchy of RESTful services.

These heirarchical relationships are reflected in the pivotal-tracker module's interface.

Examples:

Access to CRUD methods for comments is provided via the story sub-service:

```
client.project(123).story(456).comments.all(function(error, comments) {

    // This is totally a thing.
    
});

```
...but you can't get to comments directly by way of a project, since the two resources have only an indirect relationship via stories...

```
client.project(123).comments.all(function(error, comments) {

    // This is NOT a thing. Exception city right here.
    
});

```
...which is a reflection of the structure of the REST web API:

```
// Also not a thing.

GET http://www.pivotaltracker.com/services/v5/projects/123/comments

// But this is!

GET http://www.pivotaltracker.com/services/v5/projects/123/stories/456/comments

```


## Property Naming: Capitalization
As is common with JSON interfaces, the property names recognized & returned by the v5 Pivotal Tracker REST service follow an underscore_naming_convention.

Of course, it's also the case that very commonly, JS code follows the camelCase variable and property naming convention.

These two conventions seem equally useful for these respective common cases. To satisfy both while still being able to easily keep a consistent look & feel when using this module alongside conventionally-named JS variables & properties, the interface for this module uses camelCasing. It will **automatically** translate names when sending/retrieving data from the service, converting camelCaseNames to & from underscore_names as needed.

NOTE: If you're particularly annoyed by this as the across-the-board behavior, please feel free to file an issue; making this translation configurable is definitely an option.

In other words...you can interact under the camelCase convention like this:
```
proj.name = 'hay guyz, new name';
proj.enableFollowing = true;
proj.weekStartDay = 'Friday';

client.project(123).update(proj, function(error, updatedProject) {
    // stuff
});

```

Which would be auto-converted as follows in the request made to the API:
```
// PUT http://www.pivotaltracker.com/services/v4/projects/123

{
    "name" : "hay guyz, new name",
    "enable_following": true,
    "week_start_day": "Friday"
}

```
...and vice-versa.



## Type Conversion
It's often nice to deal directly with JS primitives when data is retrieved from someplace--as opposed to having to parse and manipulate a bunch of strings.

First, since JSON is the data transfer format--we start off with a simple layer of JSON.parse() and JSON.stringify() on incoming & outgoing POST/PUT body data, respectively.

In addition to this, type coersion is applied according to whatever JS type is equivalent to the data type the Pivotal API specifies for a given resource's property. *NOTE that this is true both for data retrieved from the API as well as for property values you set on instantiated objects.*

This is done for one simple reason: ease of use. By limiting the possible range of data types allowed for the value of any given property, validation & general consumption of data is simplified.

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
    * object / associated resource
        * If a non-null value has type 'object', it's passed-through/set as-is. All other values are defaulted to null.


## API

#### tracker main
* tracker.getToken
* tracker.useToken

#### tracker Client
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


## Running Tests
```
$ npm test
```

## Authentication
https://www.pivotaltracker.com/help/api#Request_Authentication_and_CORS

Authenticating is easy. Pass in a string with the user's API token when creating a client:
```
var tracker = require('pivotal-tracker');
var client = tracker.Client('apiToken');
```
Change the token at any time. Note that this will affect & auto-update the token for any "sub-services" (for projects, stories, etc.) created from this client instance:
```
var tracker = require('pivotal-tracker');
var client = tracker.Client();

// stuff happens...

client.useToken('apiToken');
```

You can also retrieve the token with a username and password:
```javascript
var tracker = require('pivotal-tracker');
var user = 'mario';
var password = 'fireball';

tracker.getToken(user, password, function(error, token){

    // Super Cool Logic
    
});
```

## Full Pivotal Tracker API (v5) Documentation

[Pivotal Tracker API v5 Documentation](https://www.pivotaltracker.com/help/api?version=v5 "Pivotal Tracker API v5")


## License (MIT)

Copyright (c) 2014 Sabra Pratt pratt.sabra@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.