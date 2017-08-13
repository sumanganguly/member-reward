const pingServer = require('../../../app/controllers/Ping')
describe('Testing Ping Server', () => {
  var response = {
    jsonString: '',
    kvmap: [],
    setHeader: function(key, value) {
      this.kvmap[key] = value
    },
    end: function(jsonString) {
      this.jsonString = jsonString;
    }
  }
  pingServer.pingServer({}, response, {})
  it('Unit testing ping server', () => {
    expect(response.kvmap['Content-Type']).toBe('application/json')
    var json = JSON.parse(response.jsonString)
    expect(json.message).toBe('server running')
  })
})
