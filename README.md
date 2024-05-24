# Setup Nginx

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

# API server for gps tracker and waktu solat apps

Certificate is saved at: /etc/letsencrypt/live/api.hekhek.xyz/fullchain.pem
Key is saved at: /etc/letsencrypt/live/api.hekhek.xyz/privkey.pem

## TODO

- [ ] scrape fuel price - https://www.kpdn.gov.my/ms/
- [ ] reporting
  - [ ] fuel consumption report - tele with Setel summary?
  - [ ] mileage report - km, violations, etc
  - [ ] idling report
  - [ ] weekly/monthly trips summary report
- [ ] use GeoJSON format
- [ ] geofencing ?
- [ ] notification [battery | fuel | geofence] ?
  - [ ] via twillio ?
  - [ ] via whatsapp ?
  - [x] via telegram ?
  - [ ] via push notification ?
- [ ] add/use queue ? overkill ?
- [x] every trip, query by id?
- [x] fuel graph
- [ ] use zustand!
- [ ] use typescript
- [ ] upgrade vitejs
