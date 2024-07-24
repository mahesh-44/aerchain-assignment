import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import Select from "../Select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { formatISO } from "date-fns";
import { randomInt } from "@/app/utils/utils";
import { uuid } from "uuidv4";
import { TRANSPORTER_OPTIONS } from "@/app/constants";

type PROPS = {
	open: boolean;
	handleClose: () => void;
	onAddTrip: (payload: any) => void;
};
type Inputs = {
	tripId: string;
	transporter: string;
	source: string;
	dest: string;
	phoneNumber: string;
};

const AddTripDialog = ({ open, handleClose, onAddTrip }: PROPS) => {
	const {
		trigger,
		getValues,
		control,
		unregister,
		formState: { errors, isValid },
	} = useForm<Inputs>();
	const [showSnackbar, setShowSnackbar] = useState(false);

	const handleAddTrip = () => {
		trigger();
		if (!isValid) {
			return false;
		}
		const creationTime = formatISO(new Date());
		const payload = {
			...getValues(),
			creationTime,
			currentStatusCode: "BKD",
			currenStatus: "Booked",
			etaDays: randomInt(1, 7),
			distanceRemaining: randomInt(50, 1000),
			tripStartTime: creationTime,
			lastPingTime: "",
			tripEndTime: "",
			_id: uuid(),
		};
		setShowSnackbar(true);
		if (onAddTrip) {
			onAddTrip(payload);
		}
		handleClose();
	};

	useEffect(() => {
		() => {
			unregister();
		};
	}, []);

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="add-trip-dialog"
				aria-describedby="add-trip-dialog"
				fullWidth
			>
				<DialogTitle id="add-trip-dialog-title">Add Trip</DialogTitle>
				<form>
					<DialogContent>
						<DialogContentText
							id="add-trip-dialog-description"
							style={{
								display: "grid",
								columnGap: "4%",
								rowGap: "20px",
								gridTemplateColumns: "48% 48%",
							}}
						>
							<Input
								control={control}
								name="tripId"
								label="Trip ID"
								type="text"
								variant="outlined"
								errors={errors?.tripId}
								trigger={() => trigger("tripId")}
							/>
							<Select
								control={control}
								name="transporter"
								label="Transporter"
								errors={errors?.transporter}
								trigger={() => trigger("transporter")}
								options={TRANSPORTER_OPTIONS}
							/>
							<Input
								control={control}
								name="source"
								label="Source"
								type="text"
								variant="outlined"
								errors={errors?.source}
								trigger={() => trigger("source")}
							/>
							<Input
								control={control}
								name="dest"
								label="Destination"
								type="text"
								variant="outlined"
								errors={errors?.dest}
								trigger={() => trigger("dest")}
							/>
							<Input
								control={control}
								name="phoneNumber"
								label="Phone"
								type="text"
								variant="outlined"
								errors={errors?.phoneNumber}
								trigger={() => trigger("phoneNumber")}
							/>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="outlined">
							<Typography textTransform={"capitalize"}>Cancel</Typography>
						</Button>
						<Button onClick={handleAddTrip} autoFocus variant="contained">
							<Typography textTransform={"capitalize"}>Add trip</Typography>
						</Button>
					</DialogActions>
				</form>
			</Dialog>
			{showSnackbar && (
				<Snackbar
					open={showSnackbar}
					autoHideDuration={5000}
					onClose={() => setShowSnackbar(false)}
					message="Trip added successfully"
				/>
			)}
		</>
	);
};

export default AddTripDialog;
