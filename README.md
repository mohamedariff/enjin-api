# Setup Nginx

- [How to Set Up a Node.js Application for Production on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)

# API server for gps tracker and waktu solat apps

Certificate is saved at: `/etc/letsencrypt/live/api.hekhek.xyz/fullchain.pem`
Key is saved at: `/etc/letsencrypt/live/api.hekhek.xyz/privkey.pem`

## TODO

### Backend

- [ ] scrape fuel price - [https://www.kpdn.gov.my/ms/](https://www.kpdn.gov.my/ms/)
- [ ] reporting
  - [ ] fuel consumption report - tele with Setel summary?
  - [ ] mileage report -
    - [ ] km per day, violations per day, etc
    - [ ] mileage vs distance
    - [ ] total time and mileage
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
- [x] refuel logic

### Frontend

- [x] fuel graph
- [x] use zustand!
- [x] use typescript
- [x] upgrade vitejs
- [ ] install shadcn
- [ ] fix typescript import component/module
- [ ] change favico icon
- [ ] distance - shows meters if less than 1km
- [ ] time - shows seconds if less than 1 hour
- [ ] multiple language ? i18n
- [x] show fueling icon in trips
- [x] fix trip playback bug
- [ ] ~~change car icon ? more accurate and interactive ?~~
- [ ] settings

  - [ ] settings page
  - [ ] default vehicle
  - [ ] trip sidebar width
  - [ ] hide/unhide speedchart's legend

- [x] fix change date bugs - still select old trip
- [ ] keyboard's listener component.
- [ ] ~~improve ant-path color based on speed ?~~
- [ ] Add a feature to categorize/tag trips (e.g., work, leisure, errands) for easier tracking and analysis.
- [ ] Allow users to compare multiple trips side-by-side, highlighting differences in time, distance, speed, and fuel usage.
- [ ] Provide options to export trip data to CSV or PDF for further analysis or record-keeping.
- [ ] Include a feature to calculate the cost of fuel used for each trip, based on current fuel prices.
