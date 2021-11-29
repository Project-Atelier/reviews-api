import http from 'k6/http';
import { sleep } from 'k6';
const port = require('../../port.js');
export const options = {
  // vus: 10,
  // duration: '30s',
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 400, // RPS, since timeUnit is the default 1s
      duration: '30s',
      preAllocatedVUs: 400,
      maxVUs: 1000,
    },
  },
}; 

export default function () {
  let randi = Math.floor(Math.random() * 100000 + 900000);
  //let randi = Math.floor(Math.random() * 1000011);
  http.get(`http://localhost:${port}/reviews/?product_id=${randi}&sort=newest`);

  //sleep(1);
}
