const fs = require('fs');

exports.readSpec = () => {
  // common elements
  const info = fs.readFileSync('./app/api/parts/info.yaml', 'utf8');
  const errors = fs.readFileSync('./app/api/parts/definitions/errors.yaml', 'utf8');

  const parts = {
    ping: {
      path: fs.readFileSync('./app/api/parts/paths/ping.yaml', 'utf8'),
      defn: fs.readFileSync('./app/api/parts/definitions/ping.yaml', 'utf8')
    },
    apps: {
      path: fs.readFileSync('./app/api/parts/paths/apps.yaml', 'utf8'),
      defn: fs.readFileSync('./app/api/parts/definitions/apps.yaml', 'utf8')
    }
  }

  return {
    info: info,
    errors: errors,
    parts: parts
  }
}
