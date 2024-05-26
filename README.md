# Setup Nginx

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

# API server for gps tracker and waktu solat apps

Certificate is saved at: /etc/letsencrypt/live/api.hekhek.xyz/fullchain.pem
Key is saved at: /etc/letsencrypt/live/api.hekhek.xyz/privkey.pem

## TODO

### Backend

- [ ] scrape fuel price - https://www.kpdn.gov.my/ms/
- [ ] reporting
  - [ ] fuel consumption report - tele with Setel summary?
  - [ ] mileage report -
    - km per day, violations per day, etc
    - mileage vs distance
    - total time and mileage
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

### Frontend

- [x] fuel graph
- [x] use zustand!
- [x] use typescript
- [x] upgrade vitejs
- [ ] install shadcn
- [ ] change favico icon
- [ ] distance - shows meters if less than 1km
- [ ] time - shows seconds if less than 1 hour
- [ ] multiple language ? i18n
- [ ] show fueling icon in trips
- [ ] change car icon ? more accurate and interactive ?
- [ ] settings
  - [ ] settings page
  - [ ] default vehicle
  - [ ] trip sidebar width
  - [ ] hide/unhide speedchart's legend
- [ ] fix change date bugs - still select old trip
- [ ] keyboard's listener component.
- [ ] improve ant-path color based on speed ?
