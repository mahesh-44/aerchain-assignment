"use client";

import DataTable from "../components/DataTable";
import { useState } from "react";
import Data from "../data/trips.json";
import { GridFilterModel } from "@mui/x-data-grid";
import TripCounters from "../components/TripCounters";

export default function Dashboard() {
	const [tableData, setTableData] = useState(Data.data);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [
			{
				field: "currentStatusCode",
				operator: "contains",
				value: "DEL",
			},
		],
	});

	const updateFilter = (status: string) => {
		if (status === "DELAYED") {
			setFilterModel({
				items: [
					{
						field: "tat",
						operator: "contains",
						value: "delayed",
					},
				],
			});
		} else {
			setFilterModel({
				items: [
					{
						field: "currentStatusCode",
						operator: "contains",
						value: status,
					},
				],
			});
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
			<div className="flex gap-4 w-full">
				<TripCounters
					tableData={tableData}
					filterModel={filterModel}
					updateFilter={updateFilter}
				/>
			</div>
			<div className="z-10 w-full max-w-7xl items-center justify-between text-sm lg:flex">
				<DataTable
					tableData={tableData}
					setTableData={setTableData}
					filterModel={filterModel}
					setFilterModel={setFilterModel}
				/>
			</div>
		</main>
	);
}
