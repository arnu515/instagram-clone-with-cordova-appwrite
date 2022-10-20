import React, { FC, InputHTMLAttributes, LabelHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
	customMessages?: {
		patternMismatch?: string;
		tooLong?: string;
		tooShort?: string;
		rangeOverflow?: string;
		rangeUnderflow?: string;
		typeMismatch?: string;
		valueMissing?: string;
	};
}

const MESSAGE_TYPES = [
	'patternMismatch',
	'tooLong',
	'tooShort',
	'rangeOverflow',
	'rangeUnderflow',
	'typeMismatch',
	'valueMissing'
];

const Input: FC<Props> = ({
	label,
	id,
	className: inputClass = '',
	labelProps = {},
	customMessages,
	...inputProps
}) => {
	function onInput(e: React.FormEvent<HTMLInputElement>) {
		const input = e.currentTarget;

		for (const key of MESSAGE_TYPES) {
			if (input.validity[key as keyof typeof input.validity]) {
				input.setCustomValidity(
					customMessages?.[key as keyof typeof customMessages] ||
						input.validationMessage
				);
				input.reportValidity();
			} else {
				input.setCustomValidity('');
			}
		}
	}

	return (
		<>
			<label
				htmlFor={id}
				className={`mr-4 font-bold text-gray-700 md:mr-6 lg:mr-10 ${
					labelProps?.className || ''
				}`}
				{...labelProps}
			>
				{label}
			</label>
			<input
				{...inputProps}
				className={`rounded-lg border border-gray-500 px-2 py-1 text-gray-800 outline-none placeholder:text-gray-500 focus:border-gray-900 focus:shadow sm:w-[250px] md:w-[350px] lg:w-[550px] ${inputClass}`}
				onChange={onInput}
			/>
		</>
	);
};

export default Input;
