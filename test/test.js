const chai = import("chai");
const expect = chai.expect;
const request = import("request");

describe("Add Task", function () {
  let expect, request;

  // Load the modules before running the tests
  before(async function () {
    const chai = await import("chai");
    expect = chai.expect;
    const requestModule = await import("request");
    request = requestModule.default;
  });

  var url = "http://localhost:3000/api/to-do";

  // Sample task data
  var task = {
    title: "Test Task",
    details: "This is a test task",
    dueDate: "2024-09-01",
    priority: "high",
  };

  it("returns status 201 when a task is successfully added", function (done) {
    request(
      { url: url, method: "POST", json: task },
      function (error, response, body) {
        expect(response.statusCode).to.equal(201);
        done();
      }
    );
  });

  it("returns statusCode key in body to check if API gives the right result", function (done) {
    request(
      { url: url, method: "POST", json: task },
      function (error, response, body) {
        expect(body.statusCode).to.equal(201);
        done();
      }
    );
  });

  it("task data should contain a due date", function (done) {
    request(
      { url: url, method: "POST", json: task },
      function (error, response, body) {
        expect(new Date(body.data.dueDate)).to.be.a("date");
        done();
      }
    );
  });

  it("returns an error when task title is missing", function (done) {
    var invalidTask = {
      details: "This task has no title",
      dueDate: "2024-09-01",
      priority: "medium",
    };
    request(
      { url: url, method: "POST", json: invalidTask },
      function (error, response, body) {
        expect(response.statusCode).to.not.equal(201);
        done();
      }
    );
  });

  it("returns all tasks, including the one that was inserted", function (done) {
    // First, we insert a task to ensure there's at least one task in the database
    request(
      { url: url, method: "POST", json: task },
      function (error, response, body) {
        // Now, we retrieve the list of tasks
        request({ url: url, method: "GET" }, function (error, response, body) {
          body = JSON.parse(body);
          expect(response.statusCode).to.equal(200);
          expect(body.data).to.be.an("array").that.is.not.empty;

          // Verify that the inserted task is included in the response
          const insertedTask = body.data.find((t) => t.title === task.title);
          expect(insertedTask).to.include({
            title: "Test Task",
            details: "This is a test task",
            priority: "high",
          });

          done();
        });
      }
    );
  });
});
