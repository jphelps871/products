export function getFeedback(feedbackId) {
  return fetch(`/api/feedback?feedbackId=${feedbackId}`, {
    method: "GET",
  }).then((response) => response.json());
}

export async function feedback(method, data, feedbackId) {
  const options = {};
  let route = "/api/feedback";

  if (method === "delete") {
    options["method"] = "DELETE";
    route = `/api/feedback?feedbackId=${feedbackId}`;
  } else if (method === "post") {
    options["method"] = "POST";
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = JSON.stringify(data);
  } else if (method === "update") {
    options["method"] = "PUT";
    options["headers"] = { "Content-Type": "application/json" };
    data["feedbackId"] = parseInt(feedbackId);

    options["body"] = JSON.stringify(data);
  }

  try {
    const response = await fetch(route, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error; // You can re-throw the error to handle it at the caller level
  }
}
