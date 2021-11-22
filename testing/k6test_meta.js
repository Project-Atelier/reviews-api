import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  // vus: 1000,
  // duration: '30s',

  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 200, // x RPS, since timeUnit is the default 1s
      duration: '30s',
      preAllocatedVUs: 200,
      maxVUs: 5000,
    },
  },
};

//  1000011 is current product count, use top 10% according to learn?
// 900000, 100000
export default function () {
  let randi = Math.floor(Math.random() * 100000 + 900000);
  // let randi = Math.floor(Math.random() * 1000011);
  const url = `http://localhost:3001/reviews/meta/?product_id=${randi}`;
  // console.log(url);
  const res = http.get(url);
  // console.log(res.body);
  // sleep(1);
}
