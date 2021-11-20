import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1000,
  duration: '30s',

  // discardResponseBodies: true,
  // scenarios: {
  //   contacts: {
  //     executor: 'constant-arrival-rate',
  //     rate: 100, // 200 RPS, since timeUnit is the default 1s
  //     duration: '1m',
  //     preAllocatedVUs: 50,
  //     maxVUs: 1000,
  //   },
  // },
};
export default function () {
  let randi = Math.floor(Math.random() * 300000);
  http.get(`http://localhost:3000/reviews/meta/?product_id=${randi}`);
  // sleep(1);
}
