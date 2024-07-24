import React, { useMemo } from "react";
import CardComponent from "../Card";
import { Typography } from "@mui/material";
import styles from "./TripCounters.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getTATStatus } from "@/app/utils/utils";
import { TRIPS_MODEL } from "@/app/model/trips";
import { COUNTERS, statusToTextMap } from "@/app/constants";

const TripCounters = ({ tableData, filterModel, updateFilter }: any) => {
	const currFilterStatus = filterModel?.items[0]?.value || "";
	const currFilterField = filterModel.items[0]?.field || "";
	const tableMeta = useMemo(() => {
		const statusCounts = {
			RD: 0,
			DEL: 0,
			BKD: 0,
			INT: 0,
			ON_TIME: 0,
			DELAYED: 0,
			TOTAL: 0,
		};
		tableData.map((data: TRIPS_MODEL) => {
			statusCounts[data.currentStatusCode as keyof typeof statusCounts]++;
			const tatStatus = getTATStatus(data);
			if (data.etaDays > 0) {
				if (
					data.currentStatusCode === filterModel.items[0].value ||
					!filterModel.items[0].value
				) {
					if (tatStatus === "on time") {
						statusCounts.ON_TIME = statusCounts.ON_TIME + 1;
					}
				}
				if (tatStatus === "delayed") {
					statusCounts.DELAYED = statusCounts.DELAYED + 1;
				}
			}
		});
		return {
			...statusCounts,
			TOTAL: tableData.length,
		};
	}, [tableData, filterModel]);
	let percentage = 0;
	const NON_ALL_FILTER = tableMeta[currFilterStatus as keyof typeof tableMeta];
	if (NON_ALL_FILTER) {
		percentage = Math.round(
			(tableMeta.ON_TIME /
				tableMeta[currFilterStatus as keyof typeof tableMeta]) *
				100
		);
	} else {
		percentage = Math.round((tableMeta.ON_TIME / tableMeta.TOTAL) * 100);
	}

	return (
		<>
			<CardComponent
				onClick={() => updateFilter("")}
				cardContent={{ className: "h-full" }}
				className="basis-1/4"
			>
				<div className="flex h-full justify-between">
					<div className="flex flex-col basis-1/2 justify-between">
						<Typography className={styles.grayText}>Total Trips</Typography>
						<Typography className="text-2xl">{tableMeta.TOTAL}</Typography>
					</div>
				</div>
			</CardComponent>
			<CardComponent className="basis-1/4">
				<div className="flex">
					<div className="flex flex-col basis-1/2 border-r-2 justify-between">
						<Typography className={styles.grayText}>
							{currFilterField === "tat"
								? statusToTextMap.DELAYED
								: NON_ALL_FILTER
								? statusToTextMap[
										currFilterStatus as keyof typeof statusToTextMap
								  ]
								: statusToTextMap.ALL}
						</Typography>
						<Typography className="text-2xl">
							{currFilterField === "tat"
								? tableMeta.DELAYED
								: NON_ALL_FILTER
								? NON_ALL_FILTER
								: tableMeta.TOTAL}
						</Typography>
					</div>
					<div className="flex flex-col items-center basis-1/2 ml-2">
						<div style={{ width: 50, height: 50 }}>
							<CircularProgressbar
								value={percentage}
								text={`${percentage}%`}
								styles={{
									path: { stroke: `rgba(57, 203, 96, ${percentage / 100})` },
								}}
							/>
						</div>
						<Typography className="text-sm">
							On time:{" "}
							<span className={`text-blue-500`}>{tableMeta.ON_TIME}</span>
						</Typography>
					</div>
				</div>
			</CardComponent>
			<CardComponent
				className="basis-1/2"
				cardContent={{
					className: "h-full",
					style: {
						padding: "0 !important",
					},
				}}
			>
				<div className="flex w-full h-full">
					{COUNTERS.map((counter, index) => {
						return (
							<div
								key={index}
								className={counter.className}
								onClick={() => updateFilter(counter.code)}
							>
								<Typography>{counter.label}</Typography>
								<Typography>
									{tableMeta[counter.code as keyof typeof tableMeta]}
								</Typography>
							</div>
						);
					})}
				</div>
			</CardComponent>
		</>
	);
};

export default TripCounters;
