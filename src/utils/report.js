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

export function calculateTripSummary(data) {
  return data.map(day => {
    const totalDuration = day.trips.reduce((sum, trip) => sum + trip.duration, 0);
    const totalDistance = day.trips.reduce((sum, trip) => sum + trip.distance, 0);
    const maxTopSpeed = Math.max(...day.trips.map(trip => trip.topSpeed));
    const totalFuelUsed = day.trips.reduce((sum, trip) => (!isNaN(trip.fuelUsed) && Math.sign(trip.fuelUsed) !== -1) ? sum + trip.fuelUsed : 0, 0);
    const totalRuntime = day.trips.reduce((sum, trip) => !isNaN(trip.runtimeTotal) && sum + trip.runtimeTotal, 0);
    const topAvgSpeed = Math.max(...day.trips.map(trip => parseFloat(trip.avgSpeed)));

    return {
      date: day.date,
      totalDuration,
      totalDistance,
      maxTopSpeed,
      totalFuelUsed,
      totalRuntime,
      topAvgSpeed
    };
  });
}