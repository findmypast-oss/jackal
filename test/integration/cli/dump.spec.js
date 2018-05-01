"use strict";

const fs = require("fs");
const exec = require("child_process").exec;
const request = require("request");
const jackal = require("../../helpers/jackal");
const Provider = require("../../helpers/provider");

describe("CLI.Dump Integration Test", function() {
  let providerOne, providerTwo;

  before(function(done) {
    providerOne = new Provider();
    providerOne.start({ port: 8379 }, done);
  });

  before(function(done) {
    providerTwo = new Provider();
    providerTwo.start({ port: 8380 }, done);
  });

  after(function(done) {
    providerOne.stop(done);
  });

  after(function(done) {
    providerTwo.stop(done);
  });

  context("using the JSON reporter", function() {
    let port, dbPath, options;

    before(function(done) {
      port = 8378;
      dbPath = "test/integration/api/db.json";
      options = {
        port: port,
        quiet: true,
        db: { path: dbPath }
      };

      jackal.start(options, done);
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

    it("should get an up to date copy of the database serialised as JSON", function(done) {
      exec(
        `node index dump -r json http://localhost:${port}`,
        {},
        (err, stdout, stderr) => {
          expect(err).to.not.exist;
          expect(JSON.parse(stdout)).to.be.an("object");
          expect(stderr).to.equal("");
          done();
        }
      );
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
  });
});
