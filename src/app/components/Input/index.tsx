import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const Input = (props: any) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			defaultValue={""}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<TextField
					value={value}
					onChange={(e) => {
            onChange(e.target.value);
            props.trigger();
          }}
					error={props.errors}
					helperText={props.errors ? "Required" : ""}
					{...props}
				/>
			)}
		/>
	);
};

export default Input;
