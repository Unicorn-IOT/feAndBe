import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { SelectFormType } from '../SelectForm';

type SelectGranularityUnitProps = {
	control: Control<SelectFormType>;
};

export default function SelectGranularityUnit({ control, ...controller }: SelectGranularityUnitProps) {
	return (
		<Controller
			render={(params) => {
				const { field } = params;
				return (
					<Select {...field} label="Select Granularity Unit" onChange={(data) => field.onChange(data)} fullWidth>
						<MenuItem value={'minutes'}>minutes</MenuItem>
						<MenuItem value={'hours'}>hours</MenuItem>
						<MenuItem value={'days'}>days</MenuItem>
					</Select>
				);
			}}
			name="granularityUnit"
			control={control}
			{...controller}
		/>
	);
}
