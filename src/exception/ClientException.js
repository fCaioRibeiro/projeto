class ClientException extends Error {
    constructor (message) {
      super(message);
      this.name = this.constructor.name;
      this.status = 500;
    };
};

module.exports = ClientException;