import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectEndDateProps = {
	control: Control<SelectFormType>;
	minDate?: string | null;
};

export default function SelectEndDate({ minDate, control, ...controller }: SelectEndDateProps) {
	return (
		<Controller
			render={(params) => {
				const { field } = params;
				return <DatePicker {...field} label="Select End Date " onChange={(data) => field.onChange(data)} minDate={minDate} />;
			}}
			name="selectEndDate"
			control={control}
			{...controller}
		/>
	);
}
