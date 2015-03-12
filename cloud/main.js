var parseConfig = {
  port: 80,
  useStatic: false
};
require('cloud/app.js').start(parseConfig);

require('cloud/api/_api.js');
require('cloud/jobs/_jobs.js');

