# Setup Nginx

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

# API server for gps tracker and waktu solat apps

Certificate is saved at: /etc/letsencrypt/live/api.hekhek.xyz/fullchain.pem
Key is saved at: /etc/letsencrypt/live/api.hekhek.xyz/privkey.pem

## TODO

- [ ] scrape fuel price
- [ ] reporting
  - [ ] fuel consumption - tele with Setel summary?
  - [ ] weekly/monthly trips summary
- [ ] use GeoJSON format
- [ ] geofencing ?
- [ ] notification [battery | fuel | geofence] ?
  - [ ] via twillio ?
  - [ ] via whatsapp ?
  - [ ] via telegram ?
  - [ ] via push notification ?
- [ ] add/use queue ? overkill ?
- [ ] every trip, query by id?
