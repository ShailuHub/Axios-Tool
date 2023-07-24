// GET REQUEST
//https://jsonplaceholder.typicode.com/todos

//one way

// function getTodos() {
//   axios({
//     method: "get",
//     url: "https://jsonplaceholder.typicode.com/todos",
//     params: {
//       _limit: 5,
//     },
//   })
//     .then((res) => {
//       showOutput(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//Second way

// function getTodos() {
//   axios
//     .get("https://jsonplaceholder.typicode.com/todos", {
//       params: { _limit: 5 },
//     })
//     .then((res) => {
//       showOutput(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//Third Way
//Since we are making get request by default axios uses get method
function getTodos() {
  axios("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      title: "New Data",
      completed: false,
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios
  //   .put("https://jsonplaceholder.typicode.com/todos/1", {
  //     title: "Update Data",
  //     completed: false,
  //   })
  //   .then((res) => {
  //     showOutput(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Update Data",
      completed: false,
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// SIMULTANEOUS DATA
//If we want to access data from two different api simulatneously
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then((res) => {
      // console.log(res[0]);
      // console.log(res[1]);
      // We can use spread method of axios
      axios.spread(([posts, todos]) => {
        showOutput(posts);
        //showOutput(todos);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Data",
        completed: false,
      },
      {
        headers: {
          Authorization: "Some token",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
}
// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(`error: ${error.message}`);
    });
}

// CANCEL TOKEN
function cancelToken() {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url}
  at ${new Date().getTime()}`);
    return config;
  },
  (error) => {
    return new Promise.reject(err);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);

/*

Basically headers are additional pieces of information that one can include when making HTTP request. You can think like of headers as a small notes attached to the request or addition instructions to the server.

For example:

Imagine you are sending a package to a person. The package itself represents data that you want to send to a person. However, sometime you might attached a sticky note to the package. The instruction may be like "Handles this package with care", "Please don't open if you are not the actual owner" in the same fashion you can create headers and attach it to the HTTP request with axios.

Headers are key-value pairs that carry additional information about request. Some common request are like {Authorisation:value, Content-Type:value}.



2.	Axios is java sript library that helps you to make HTTP request from your code to the server. Basically it

is a tool







*/
