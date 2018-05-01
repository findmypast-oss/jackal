"use strict";

const fs = require("fs");
const _ = require("lodash");
const exec = require("child_process").exec;
const request = require("request");
const jackal = require("../../helpers/jackal");
const Provider = require("../../helpers/provider");

describe("CLI.Stats Integration Test", function() {
  let port, dbPath, options, providerOne, providerTwo;

  before(function(done) {
    port = 8378;
    dbPath = "test/integration/api/stats.json";
    options = {
      port: port,
      quiet: true,
      db: { path: dbPath }
    };

    jackal.start(options, done);
  });

  before(function(done) {
    providerOne = new Provider();
    providerOne.start({ port: 8379 }, done);
  });

  before(function(done) {
    providerTwo = new Provider();
    providerTwo.start({ port: 8380 }, done);
  });

  before(function(done) {
    const buf = fs.readFileSync("test/contracts/stats.json");

    const req = {
      url: `http://localhost:${port}/api/contracts`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: buf
    };

    request(req, (err, res, body) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  after(function(done) {
    fs.stat(dbPath, (err, stats) => {
      if (stats) {
        fs.unlink(dbPath, done);
      } else {
        done();
      }
    });
  });

  after(jackal.stop);

  after(function(done) {
    providerOne.stop(done);
  });

  after(function(done) {
    providerTwo.stop(done);
  });

  context("using the JSON reporter", function() {
    it("should get the basic stats pack when not specifying the consumer or provider", function(done) {
      const expected = {
        consumerCount: 1,
        consumers: ["consumer"],
        providerCount: 2,
        providers: ["provider_one", "provider_two"],
        apiCount: 3,
        contractCount: 3
      };

      exec(
        `node index stats -r json http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the consumer specific stats pack when specifying a consumer", function(done) {
      const expected = {
        consumer: "consumer",
        providerCount: 2,
        providers: ["provider_one", "provider_two"],
        apiCount: 3,
        contractCount: 3
      };

      exec(
        `node index stats -r json -c consumer http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the consumer specific stats pack when specifying an invalid consumer", function(done) {
      const expected = {
        consumer: "invalid",
        providerCount: 0,
        providers: [],
        apiCount: 0,
        contractCount: 0
      };

      exec(
        `node index stats -r json -c invalid http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the provider specific stats pack when specifying a provider", function(done) {
      const expected = {
        provider: "provider_one",
        consumerCount: 1,
        consumers: ["consumer"],
        apiCount: 2,
        apis: ["receipt_api", "user_api"],
        contractCount: 2
      };

      exec(
        `node index stats -r json -p provider_one http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          const parsed_stdout = JSON.parse(stdout);
          parsed_stdout.apis.sort();
          expected.apis.sort();
          expect(parsed_stdout).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the provider specific stats pack when specifying an invalid provider", function(done) {
      const expected = {
        provider: "invalid",
        consumerCount: 0,
        consumers: [],
        apiCount: 0,
        apis: [],
        contractCount: 0
      };

      exec(
        `node index stats -r json -p invalid http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the the consumer/provider specific stats pack when specifying a consumer and provider", function(done) {
      const expected = {
        consumer: "consumer",
        provider: "provider_one",
        apiCount: 2,
        apis: ["receipt_api", "user_api"],
        contractCount: 2
      };

      exec(
        `node index stats -r json -c consumer -p provider_one http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          const parsed_stdout = JSON.parse(stdout);
          parsed_stdout.apis.sort();
          expected.apis.sort();
          expect(parsed_stdout).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the the consumer/provider specific stats pack when specifying an invalid consumer and invalid provider", function(done) {
      const expected = {
        consumer: "invalid",
        provider: "invalid_too",
        apiCount: 0,
        apis: [],
        contractCount: 0
      };

      exec(
        `node index stats -r json -c invalid -p invalid_too http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.eql(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });
  });

  context("using the pretty reporter", function() {
    it("should get the provider specific stats pack when specifying an invalid provider", function(done) {
      const expected =
        "\u001b[32mprovider: \u001b[39m     invalid\n\u001b[32mconsumerCount: \u001b[39m\u001b[34m0\u001b[39m\n\u001b[32mconsumers: \u001b[39m\n  (empty array)\n\u001b[32mapiCount: \u001b[39m     \u001b[34m0\u001b[39m\n\u001b[32mapis: \u001b[39m\n  (empty array)\n\u001b[32mcontractCount: \u001b[39m\u001b[34m0\u001b[39m\n";

      exec(
        `node index stats -r pretty -p invalid http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(stdout).to.equal(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });

    it("should get the the consumer/provider specific stats pack when specifying an invalid consumer and invalid provider", function(done) {
      const expected =
        "\u001b[32mconsumer: \u001b[39m     invalid\n\u001b[32mprovider: \u001b[39m     invalid_too\n\u001b[32mapiCount: \u001b[39m     \u001b[34m0\u001b[39m\n\u001b[32mapis: \u001b[39m\n  (empty array)\n\u001b[32mcontractCount: \u001b[39m\u001b[34m0\u001b[39m\n";

      exec(
        `node index stats -r pretty -c invalid -p invalid_too http://localhost:${port}`,
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(stdout).to.equal(expected);
          expect(stderr).to.equal("");
          done();
        }
      );
    });
  });
});
