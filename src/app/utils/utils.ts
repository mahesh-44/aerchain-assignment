import { differenceInDays, add } from "date-fns";
import { TRIPS_MODEL } from "../model/trips";

export const getTATStatus = (data: TRIPS_MODEL) => {
	let tripEndTime = data.tripEndTime || data.lastPingTime;

	const lastDateforDelivery = add(data.tripStartTime, { days: data.etaDays });
	const availableDays = differenceInDays(lastDateforDelivery, tripEndTime);
	if (availableDays < 0) {
		return "delayed";
	} else {
		return "on time";
	}
};

export function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const nextStatusMap = {
	BKD: {
		nextStatusCode: "INT",
		nextStatus: "In Transit",
	},
	INT: {
		nextStatusCode: "RD",
		nextStatus: "Reached Destination",
	},
	RD: {
		nextStatusCode: "DEL",
		nextStatus: "Delivered",
	},
};
