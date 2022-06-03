"use strict";

var _dotenv = require("dotenv");

var _init = require("./database/init.js");

var _init2 = require("./acl/init");

var _app = require("./app");

// Load ENV files
(0, _dotenv.config)(); // Load database

(0, _init.initDb)(); // Load ACL

(0, _init2.initAcl)(); // Load App

(0, _app.boot)((0, _app.registerRoutes)());