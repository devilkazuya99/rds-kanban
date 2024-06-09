const PROXY_CONFIG = {
  "/svc": {
    target: "http://localhost:8443",
    secure: false,
    logLevel: "debug",
  },
};

module.exports = PROXY_CONFIG;
