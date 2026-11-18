// Implemented functions for R1 to R5

export function fareForRide(distanceKm, ratePerKm) {
    return Math.round(distanceKm * ratePerKm);
}

export function totalFare(rides) {
    return rides.reduce((total, ride) => {
        return total + fareForRide(ride.distanceKm, ride.ratePerKm);
    }, 0);
}

export function applyPeakSurcharge(amount, percent) {
    return Math.round(amount + (amount * percent / 100));
}

export function waitingCharge(minutes) {
    return Math.max(0, minutes - 5) * 10;
}

export function rideSummary(rides, surchargePercent, minutesWaited) {
    const fare = totalFare(rides);
    const increasedFare = applyPeakSurcharge(fare, surchargePercent);
    const surcharge = increasedFare - fare;
    const waiting = waitingCharge(minutesWaited);

    return {
        fare: fare,
        surcharge: surcharge,
        waitingCharge: waiting,
        total: fare + surcharge + waiting
    };
}
export function totalDistance(rides) {
    
	return rides.reduce((total, ride) => {
       
		 return total + ride.distanceKm;
    
	}, 0);

}
