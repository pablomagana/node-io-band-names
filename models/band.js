const uuid = require('uuid');

class Band {

    constructor(name = 'no-name') {
        this.id = uuid.v4().toString();
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;