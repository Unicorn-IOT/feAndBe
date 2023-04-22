import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectGranularityProps = {
	control: Control<SelectFormType>;
};
export default function SelectGranularity({ control }: SelectGranularityProps) {
	return (
		<Controller
			render={(params) => {
				const {
					field,
					fieldState: { error },
				} = params;
				return (
					<TextField
						{...field}
						label="Select granularity"
						type="number"
						variant="standard"
						error={Boolean(error)}
						helperText={error?.message}
						sx={{ width: '200px' }}
					/>
				);
			}}
			name="granularity"
			control={control}
		/>
	);
}
