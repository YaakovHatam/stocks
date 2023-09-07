const db = require('./db_install');
const envVars = require('./env.vars');

db();
envVars();