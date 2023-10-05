export function getFeedback(feedbackId) {
  return fetch(`/api/feedback?feedbackId=${feedbackId}`, {
    method: "GET",
  }).then((response) => response.json());
}

export function feedback(method, data, feedbackId) {
  const options = {};
  let route = "/api/feedback";

  if (method === "delete") {
    options["method"] = "DELETE";
    route = `/api/feedback?feedbackId=${feedbackId}`;
  } else if (method === "post") {
    options["method"] = "POST";
    options["headers"] = { Accept: "application/json" };
    options["body"] = JSON.stringify(data);
  } else if (method === "update") {
    options["method"] = "PUT";
    options["headers"] = { Accept: "application/json" };
    data["feedbackId"] = parseInt(feedbackId);

    options["body"] = JSON.stringify(data);
  }

  return fetch(route, options).then((response) => response.json());
}
