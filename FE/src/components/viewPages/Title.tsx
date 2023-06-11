import { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

type TitleProps = {
	children?: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
	return (
		<Typography component="h2" variant="h6" gutterBottom>
			{children}
		</Typography>
	);
};
