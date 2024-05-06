import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

// Misura il tasso di richieste riuscite
let successfulRequests = new Rate('successful_requests');

export let options = {
    stages: [
        // Fase di ramp-up
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 800 },
        { duration: '1m', target: 1600 },
        // Fase di ramp-down
        { duration: '1m', target: 1600 },
        { duration: '1m', target: 800 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 1 },
    ],
    thresholds: {
        successful_requests: ['rate>0.95'], // Imposta una soglia per il successo delle richieste
    },
};

export default function () {
    for (let i = 0; i < Math.floor(Math.random() * 30) + 1; i++) {
        let res = http.get('http://gtkubemaster:30003/weatherforecast');
        check(res, {
            'is status 200': (r) => r.status === 200,
        }) && successfulRequests.add(1);
        sleep(1 / Math.floor(Math.random() * 30) + 1);
    }
}
