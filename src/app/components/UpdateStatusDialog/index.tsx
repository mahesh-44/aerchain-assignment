import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Snackbar,
	Typography,
} from "@mui/material";
import Transporter from "../Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "../Select";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { TRANSPORTER_OPTIONS } from "@/app/constants";

type PROPS = {
	open: boolean;
	handleClose: () => void;
	onUpdateStatus: (payload: any) => void;
};

type Inputs = {
	transporter: string;
	date: string;
};

const UpdateStatusDialog = ({ open, handleClose, onUpdateStatus }: PROPS) => {
	const {
		trigger,
		getValues,
		control,
		unregister,
		formState: { errors, isValid },
	} = useForm<Inputs>();
	const [showSnackbar, setShowSnackbar] = useState(false);

	const handleUpdateStatus = () => {
		trigger();
		if (!isValid) {
			return false;
		}
		const payload = {
			...getValues(),
		};
		setShowSnackbar(true);
		if (onUpdateStatus) {
			onUpdateStatus(payload);
		}
		handleClose();
	};

	function Label({
		componentName,
		valueType,
	}: {
		componentName: string;
		valueType: string;
	}) {
		const content = (
			<span>
				<>{componentName}</>
			</span>
		);
		return content;
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="update-status-dialog"
				aria-describedby="update-status-dialog"
			>
				<DialogTitle id="update-status-dialog-title">Add Trip</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="update-status-dialog-description"
						className="flex flex-col mt-2"
					>
						<Select
							control={control}
							name="transporter"
							label="Transporter"
							errors={errors?.transporter}
							trigger={() => trigger("transporter")}
							options={TRANSPORTER_OPTIONS}
						/>
						<Controller
							name="date"
							control={control}
							defaultValue={""}
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DemoContainer components={["DatePicker"]}>
										<DemoItem
											label={<Label componentName="Date" valueType="date" />}
										>
											<DatePicker
												format="dd/MM/yyyy"
												onChange={(e) => {
													onChange(e);
													trigger("date");
												}}
											/>
										</DemoItem>
									</DemoContainer>
								</LocalizationProvider>
							)}
						></Controller>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus variant="outlined">
						<Typography textTransform={"capitalize"} onClick={handleClose}>
							Cancel
						</Typography>
					</Button>
					<Button onClick={handleUpdateStatus} variant="contained">
						<Typography textTransform={"capitalize"}>Update Status</Typography>
					</Button>
				</DialogActions>
			</Dialog>
			{showSnackbar && (
				<Snackbar
					open={showSnackbar}
					autoHideDuration={5000}
					onClose={() => setShowSnackbar(false)}
					message="Trip updated successfully"
				/>
			)}
		</>
	);
};

export default UpdateStatusDialog;
