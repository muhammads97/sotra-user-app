import Axios from "axios";

export async function call(request) {
  let response;
  switch (request.type) {
    case "POST":
      response = await Axios.post(request.url, request.data, request.options);
      break;
    case "GET":
      response = await Axios.get(request.url, request.options);
      break;
    case "PATCH":
      response = await Axios.patch(request.url, request.data, request.options);
      break;
    case "DELETE":
      response = await Axios.delete(request.url, request.options);
      break;
  }
  return response;
}

export function queueRequest(request) {
  // get api_queue_length from local storage
  // store request with api_queue_{index} where index = api_queue_length + 1
  // increase api_queue_length
  // if api_queue_length run a setInterval that checks on the queue until it clears the queue
}

function startQueueWatcher() {
  // set interval every 1 min to check connection and try to execute the queue
  // if done clear interval
}
