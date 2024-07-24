export const COUNTERS = [
	{
		code: "DELAYED",
		label: "Delayed",
		className:
			"basis-1/2 flex justify-between flex-col border-r-2 p-4 bg-red-100 text-red-800 border-red-800",
	},
	{
		code: "INT",
		label: "In transit",
		className: "basis-1/2 flex justify-between flex-col p-4",
	},
	{
		code: "DEL",
		label: "Delivered",
		className: "basis-1/2 flex justify-between flex-col p-4",
	},
];

/** @description Status code to text map */
export const statusToTextMap = {
	RD: "Reached Destination",
	DEL: "Delivered",
	BKD: "Booked",
	INT: "In Transit",
	DELAYED: "Delayed",
	ALL: "Total Trips",
};

export const TRANSPORTER_OPTIONS = [
	{ label: "Select Transporter", value: "" },
	{ label: "Bluedart", value: "Bluedart" },
	{ label: "DTDC", value: "DTDC" },
	{ label: "Delhivery", value: "Delhivery" },
	{ label: "FedEx", value: "FedEx" },
	{ label: "Gati", value: "Gati" },
];

export const STATUS_COLOR_MAP = {
	BKD: "text-blue-800 bg-blue-50 dark:bg-blue-800 dark:text-blue-400 rounded-lg  p-2",
	RD: "text-green-800 bg-green-50 dark:bg-green-800 dark:text-green-400 rounded-lg  p-2",
	DEL: "text-green-800 bg-green-50 dark:bg-green-800 dark:text-green-400 rounded-lg  p-2",
	INT: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 rounded-lg  p-2",
};
