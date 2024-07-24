import { ReactNode } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";

type PROPS = {
	children: ReactNode;
	onClick?: () => void;
	[x: string]: any;
};

const CardComponent = (props: PROPS) => {
	return (
		<Card
			sx={{ minWidth: 275 }}
			onClick={() => {
				if (props.onClick) {
					props.onClick();
				}
			}}
			className={`cursor-pointer ${props.className}`}
			{...props.rest}
		>
			<CardContent {...props.cardContent}>{props.children}</CardContent>
		</Card>
	);
};

export default CardComponent;
