# pivotal-tracker

pivotal-tracker is a node.js wrapper for the Pivotal Tracker API (v5).


## Installation

    npm install pivotal-tracker


## Quick Start

Retrieve *all* projects for the user:
```javascript
var tracker = require('pivotal-tracker');
var client = new tracker.Client('mytoken');

client.projects.all(function(error, projects) {

    // Stuff & Things
    
});

```

Retrieve a *specific* story in a project:
```javascript
var tracker = require('pivotal-tracker');
var pivotal = new tracker.Client('mytoken');

client.project(12345).story(67890).get(function(error, projects) {

    // Bells & Whistles
    
});

```


## Property Naming
As is common with JSON interfaces, the property names recognized & returned by the v5 Pivotal Tracker REST service uses an underscore naming convention.

Of course, it's also the case that very commonly, code in .js files use a camelCase variable and property naming convention.

These two conventions are both useful. To serve them both while still being able to easily keep a consistent look & feel while using this module alongside other JS code, the interface for this module uses camelCasing for variable & property names. It will **automatically** translate names when sending/retrieving data from the service, converting your camelCaseNames to/from underscore_names as needed.

If anyone is particularly annoyed by this, file an issue; making this translation configurable is definitely an option.


## "Services" and the Singular/Plural Naming Convention
TODO: write this


## API

#### tracker main
* tracker.getToken
* tracker.useToken
* tracker.Client

#### tracker Client
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



## Authentication
https://www.pivotaltracker.com/help/api#Request_Authentication_and_CORS

TODO: this
```
```

You can also retrieve the token with a username and password:
```javascript
var tracker = require('pivotal-tracker');
var user = 'mario';
var password = 'fireball';

tracker.getToken(user, password, function(error, token) {

    // Super Cool Logic
    
});
```

## Full Pivotal Tracker API (v5) Documentation

- [Pivotal Tracker API v5 Documentation](https://www.pivotaltracker.com/help/api?version=v5 "Pivotal Tracker API v5")
