export function detectRefuelEvents(data) {
  let refuelEvents = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i].fuel > data[i - 1].fuel) {
      refuelEvents.push({
        refuelTimestamp: data[i - 1].timestamp,
        beforeRefuel: data[i - 1].fuel,
        afterRefuel: data[i].fuel,
        refuel: data[i].fuel - data[i - 1].fuel,
        obdOdo: data[i - 1].obdOdo,
        odo: data[i - 1].odo,
      });
    }
  }

  return refuelEvents;
}