import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MUI_SELECT,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const Select = (props: any) => {
	return (
		<FormControl error={props.errors}>
			<Controller
				name={props.name}
				control={props.control}
				defaultValue={""}
				rules={{ required: true }}
				render={({ field: { onChange, value } }) => (
					<>
						<InputLabel>{props.label}</InputLabel>
						<MUI_SELECT
							labelId={props.label}
							value={value}
							onChange={(e) => {
								onChange(e.target.value);
								props.trigger();
							}}
							label={props.label}
							placeholder={props.label}
							{...props.rest}
						>
							{props.options.map(
								(option: { label: string; value: string }, index: number) => (
									<MenuItem value={option.value} key={index}>
										{option.label}
									</MenuItem>
								)
							)}
						</MUI_SELECT>
						{props.errors && <FormHelperText>Required</FormHelperText>}
					</>
				)}
			/>
		</FormControl>
	);
};

export default Select;
