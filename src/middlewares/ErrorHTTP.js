class ErrorHTTP extends Error {
    constructor(status, error) {
        super(error);
        this.status = status;
    }
}

module.exports = ErrorHTTP;