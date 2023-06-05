import { TimePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectEndDateProps = {
	control: Control<SelectFormType>;
	minTime?: string | null;
};

export default function SelectEndTime({ minTime, control, ...controller }: SelectEndDateProps) {
	return (
		<Controller
			render={(params) => {
				const { field } = params;
				return (
					<TimePicker
						{...field}
						label="Select End Time "
						onChange={(data) => {
							field.onChange(data);
						}}
						minTime={minTime}
					/>
				);
			}}
			name="selectEndTime"
			control={control}
			{...controller}
		/>
	);
}
