import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectStartDateProps = {
	control: Control<SelectFormType>;
	maxDate: string | null;
};

export default function SelectStartDate({ maxDate, control, ...controller }: SelectStartDateProps) {
	return (
		<Controller
			render={(params) => {
				const { field } = params;
				return <DatePicker {...field} label="Select Start Date " onChange={(data) => field.onChange(data)} maxDate={maxDate} />;
			}}
			name="selectStartDate"
			control={control}
			{...controller}
		/>
	);
}
