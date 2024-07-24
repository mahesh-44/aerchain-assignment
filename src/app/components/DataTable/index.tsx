import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridFilterModel,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import { TRIPS_MODEL } from "../../model/trips";
import { add, differenceInDays, format } from "date-fns";
import { getTATStatus, nextStatusMap } from "@/app/utils/utils";
import { Button, Typography } from "@mui/material";
import AddTripDialog from "../AddTripDialog";
import UpdateStatusDialog from "../UpdateStatusDialog";
import { STATUS_COLOR_MAP } from "@/app/constants";

type PROPS = {
	tableData: TRIPS_MODEL[];
	setTableData: any;
	filterModel: GridFilterModel;
	setFilterModel: any;
};

const DataGridDemo = ({
	tableData,
	setTableData,
	filterModel,
	setFilterModel,
}: PROPS) => {
	const columns: GridColDef<(typeof tableData)[number]>[] = [
		{ field: "tripId", headerName: "Trip Id", width: 150 },
		{
			field: "transporter",
			headerName: "Transporter",
		},
		{
			field: "source",
			headerName: "Source",
			width: 150,
		},
		{
			field: "dest",
			headerName: "Destination",
			width: 110,
		},
		{
			field: "phoneNumber",
			headerName: "Phone",
			width: 110,
		},
		{
			field: "etaDays",
			headerName: "ETA",
			width: 110,
			align: "center",
			headerAlign: "center",
			valueGetter: (value, row) =>
				format(
					add(new Date(row.tripStartTime), { days: row.etaDays }),
					"dd/MM/yyyy"
				),
		},
		{
			field: "distanceRemaining",
			headerName: "Distance Remaining",
			width: 150,
			align: "center",
		},
		{
			field: "currentStatusCode",
			headerName: "Current status code",
		},
		{
			field: "currenStatus",
			headerName: "Trip Status",
			width: 180,
			headerAlign: "center",
			align: "center",
			renderCell: (params: GridRenderCellParams<any>) => {
				const { currentStatusCode, currenStatus }: TRIPS_MODEL = params.row;
				return (
					<>
						<span
							className={
								STATUS_COLOR_MAP[
									currentStatusCode as keyof typeof STATUS_COLOR_MAP
								]
							}
						>
							{currenStatus}
						</span>
					</>
				);
			},
		},
		{
			field: "tat",
			headerName: "TAT Status",
			align: "center",
			width: 90,
			valueGetter: (value, row) => {
				if (row.etaDays > 0) {
					return getTATStatus(row);
				}
			},
			renderCell: (params: GridRenderCellParams<any>) => {
				const row: TRIPS_MODEL = params.row;
				const tatStatus = getTATStatus(row);

				return (
					<>
						{tatStatus === "on time" ? (
							<div>
								<span className="text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 p-2">
									On time
								</span>
							</div>
						) : tatStatus === "delayed" ? (
							<div>
								<span className="text-orange-500 rounded-lg bg-orange-50 dark:bg-gray-800 dark:text-orange-400 p-2">
									Delayed
								</span>
							</div>
						) : null}
					</>
				);
			},
		},
	];
	const [dialog, setDialog] = useState<string>("");
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const ADD_TRIP = "addTrip";
	const UPDATE_STATUS = "updateStatus";

	/**
	 *
	 * @param payload Data from update status dialog
	 * update selected rows from table to next status
	 */
	const handleUpdateStatus = (payload: any) => {
		const temp: TRIPS_MODEL[] = [...tableData];
		temp.forEach((element) => {
			selectedRows.forEach((id: string) => {
				if (id === element._id && element.currenStatus !== "DEL") {
					element.transporter = payload.transporter;
					element.etaDays = differenceInDays(new Date(), payload.date);
					if (
						nextStatusMap[
							element.currentStatusCode as keyof typeof nextStatusMap
						].nextStatusCode === "DEL"
					) {
						element.tripEndTime = new Date().toISOString();
					}
					element.lastPingTime = new Date().toISOString();
					element.currenStatus =
						nextStatusMap[
							element.currentStatusCode as keyof typeof nextStatusMap
						].nextStatus;
					element.currentStatusCode =
						nextStatusMap[
							element.currentStatusCode as keyof typeof nextStatusMap
						].nextStatusCode;
				}
			});
		});
		setTableData([...temp]);
	};

	const DataGridTitle = () => {
		return (
			<Box className="px-3 py-4 flex justify-between items-center w-full bg-white border text-base">
				<Typography variant="h6" className="font-extrabold text-base">
					Trip List
				</Typography>
				<Box className="flex gap-2">
					<Button
						size="small"
						variant="outlined"
						disabled={!selectedRows.length}
						onClick={() => setDialog(UPDATE_STATUS)}
					>
						<Typography textTransform={"capitalize"}>Update Status</Typography>
					</Button>
					<Button
						size="small"
						variant="contained"
						onClick={() => setDialog(ADD_TRIP)}
					>
						<Typography textTransform={"capitalize"}>Add trip</Typography>{" "}
					</Button>
				</Box>
			</Box>
		);
	};

	return (
		<Box sx={{ height: 500, width: "100%" }} className="bg-white">
			<DataGridTitle />
			<DataGrid
				rows={tableData}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 7,
						},
					},
					columns: {
						columnVisibilityModel: {
							currentStatusCode: false,
						},
					},
				}}
				pageSizeOptions={[7]}
				checkboxSelection
				disableRowSelectionOnClick
				getRowId={(row) => row._id}
				filterModel={filterModel}
				onRowSelectionModelChange={(ids: any) => setSelectedRows(ids)}
				onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
			/>
			{dialog === ADD_TRIP && (
				<AddTripDialog
					open={dialog === ADD_TRIP}
					handleClose={() => setDialog("")}
					onAddTrip={(payload) => {
						setTableData([...tableData, payload]);
					}}
				/>
			)}
			{dialog === UPDATE_STATUS && (
				<UpdateStatusDialog
					open={dialog === UPDATE_STATUS}
					handleClose={() => setDialog("")}
					onUpdateStatus={(payload) => handleUpdateStatus(payload)}
				/>
			)}
		</Box>
	);
};

export default DataGridDemo;
