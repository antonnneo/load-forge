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
  const url = `${__ENV.HOST}`;
  const randomMessage = randomItem(messages);
  const payload = JSON.stringify({message_text: randomMessage});
  const params = {
    headers: {'Content-Type': 'application/json'},
    timeout: 30000
  };

  const response = http.post(url, payload, params);
  check(response, {'status is 200': (r) => r.status === 200,});
  console.log(`Response: ${response.body}`);

  if (response.status !== 200) {
    console.log(`Code: ${response.status}`);
    console.log(`Response: ${response.body}`);
  }
  sleep(1);
}
