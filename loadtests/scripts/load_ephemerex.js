import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check, sleep } from 'k6';
import http from 'k6/http';


export const options = {
  tags: {
    service: 'ephemerex',
    testid: `${__ENV.TEST_ID}`
  },
};

const messages = open(`${__ENV.MESSAGES}`).split('\n');

export default function () {
  // preparing new message
  let url = `${__ENV.HOST_NEW_MESSAGE}`;
  let payload = JSON.stringify({message_text: randomItem(messages)});
  let params = {
    headers: {'Content-Type': 'application/json'},
    timeout: 30000
  };

  // making new message
  let response = http.post(url, payload, params);
  check(response, {'status is 200': (r) => r.status === 200,});

  // logging
  const savedMessageId = JSON.parse(response.body).message_id
  console.log(`Saved message id: ${savedMessageId}`);

  // preparing to read message
  url = `${__ENV.HOST_READ_MESSAGE}`;
  payload = JSON.stringify({message_id: savedMessageId});
  params = {
    headers: {'Content-Type': 'application/json'},
    timeout: 30000
  };

  // reading message
  response = http.post(url, payload, params);
  check(response, {'status is 200': (r) => r.status === 200,});

  // logging
  const readedMessage = JSON.parse(response.body).message_text
  console.log(`Secret text: ${readedMessage}`);  

  // pause between iterations
  sleep(1);
}
