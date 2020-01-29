(() => {
  "use strict";
  const axios = require("axios");
  const authEndpoint = process.env.AUTH_ENDPOINT;

  /**
   * Call auth endpoint and verify token
   * Send token in authorization header and
   * in return it should either send a 200 or
   * a 401 / error
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  const restricted = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send();
    }

    axios
      .get(authEndpoint)
      .then(r => next())
      .catch(e => res.status(401).send());
  };

  /**
   * Check for authorization header in
   * incoming requests and acts accordingly.
   *
   * Note: If axios is used within the service, this
   * adds the header by default for outgoing
   * requests.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  const headers = (req, res, next) => {
    if (req.headers.authorization) {
      axios.defaults.headers.common.Authorization = req.headers.authorization;
      return next();
    }
    return res.status(401).send();
  };

  exports = {
    restricted,
    headers
  };
})();
