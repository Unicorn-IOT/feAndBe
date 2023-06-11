import { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

type TitleProps = {
	children?: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
	return (
		<Typography component="h2" variant="h5" gutterBottom>
			{children}
		</Typography>
	);
};
