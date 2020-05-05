# Instructions to run

A basic web server for the project (because of cors issues), if you a node.js environment is available the quickest way would be to install http-server - a basic static server that you can run off the shelf without any config or code required. You can use it as follows:

`
npm i -g http-server
cd project_directory
http-server
`

If node.js is unavailable, most languages have a similar package. Python for example has http.server (python3) or SimpleHTTPServer (python2). One can also use Apache or Nginx - any static file server will do