import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type SelectEndDateProps = {
	control: Control<SelectFormType>;
	maxTime: string | null;
};

export default function SelectStartTime({ maxTime, control, ...controller }: SelectEndDateProps) {
	return (
		<>
			<Controller
				render={(params) => {
					const { field } = params;
					return (
						<TimePicker
							{...field}
							label="Select Start Time "
							onChange={(data) => {
								field.onChange(data);
							}}
							maxTime={maxTime}
						/>
					);
				}}
				name="selectStartTime"
				control={control}
				{...controller}
			/>
		</>
	);
}
