$("document").ready(function () {
  populateJobsTable();
});

function populateJobsTable() {
  fetch("http://localhost:5000/job", {
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((data) => {
      var jobsTable = $("#jobsTable").empty();
      var tr = $(
        "<tr>" +
          "<th>ID</th>" +
          "<th>Job Title</th>" +
          "<th>Company URL</th>" +
          "<th>Job URL</th>" +
          "<th>Job Posting Date</th>" +
          "<th>Edit</th>" +
          "<th>Delete</th>" +
          "</tr>"
      );
      jobsTable.append(tr);
      $(data).each(function () {
        tr = $(
          "<tr>" +
            "<td class='align-middle'>" +
            this.id +
            "</td>" +
            "<td class='align-middle'>" +
            this.job_title +
            "</td>" +
            "<td class='align-middle'>" +
            this.company_url +
            "</td>" +
            "<td class='align-middle'>" +
            this.job_url +
            "</td>" +
            "<td class='align-middle'>" +
            this.job_posting_date +
            "</td>" +
            "<td class='align-middle'><button class='btn btn-primary' id='" +
            this.id +
            "' onclick='editJob(id);'>Edit</button></td>" +
            "<td class='align-middle'><button class='btn btn-danger' id='" +
            this.id +
            "' onclick='deleteJob(id);'>Delete</button></td>" +
            "</tr>"
        );
        jobsTable.append(tr);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addNewJob() {
  const job_title = document.querySelector("#job-title").value;
  const company_url = document.querySelector("#company-url").value;
  const job_url = document.querySelector("#job-url").value;

  fetch("http://localhost:5000/job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      job_title: job_title,
      company_url: company_url,
      job_url: job_url,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteJob(id) {
  fetch("http://localhost:5000/job/" + id, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((data) => {
      populateJobsTable();
    })
    .catch((error) => {
      console.log(error);
    });
}
