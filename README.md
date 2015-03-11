# Planning Poker

A free, online agile estimation tool for distributed or colocated project teams.

## Logging Issues

Please feel free to use the project's [issues page][issues] to log bugs, ask questions, or request new features.

We are also happy to announce that we've been granted an open source license for JIRA. If you are planning on contributing, please make sure you have an Atlassian Cloud account as we will be using our [JIRA][jira] instance for all project tracking functions.

![Atlassian Logo][atlassian]

## Installing Locally

#### Installing all project code and dependencies

1. Fork/Clone this repository on your local machine
1. Make sure you have [node js][node] installed
1. Install the Grunt Command Line Interface globally
  * `$ npm install -g grunt-cli`
1. In your planning-poker root directory, install project dependencies
  * `$ npm install`

#### Building and Deploying the application

1. Run the Grunt dev build task. The task will continue to run, watching for js or css changes. This is the default grunt task
  *  `$ grunt [default]` 
  * There is also a Grunt prod build. This task minifies js and css files, and terminates once complete (no watch)
    * `$ grunt prod`
1. Start a local server. Uses port 4000 by default. Can be configured in `Gruntfile.js`
  * `$ grunt serve`
1. Application should now be available at [localhost:4000][local]


[issues]: https://github.com/thorsenty/planning-poker/issues
[jira]: https://thorsent.atlassian.net/browse/PLAN
[node]: http://nodejs.org/
[local]: http://localhost:4000/

[atlassian]: assets/images/atlassian-rgb-navy-small.png
