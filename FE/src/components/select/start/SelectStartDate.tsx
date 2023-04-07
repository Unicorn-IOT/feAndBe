import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectStartDateProps = {
	control: Control<SelectFormType>;
};

export default function SelectStartDate({ control, ...controller }: SelectStartDateProps) {
	return (
		<Controller
			render={(params) => {
				const { field } = params;
				return <DatePicker {...field} label="Select Start Date " onChange={(data) => field.onChange(data)} />;
			}}
			name="selectStartDate"
			control={control}
			{...controller}
		/>
	);
}
