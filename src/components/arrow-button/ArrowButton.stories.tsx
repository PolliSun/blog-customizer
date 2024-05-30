import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonForStory = () => {
	const [isCliked, setIsCliked] = useState(false);

	return (
		<>
			<ArrowButton
				isSideMenuOpen={isCliked}
				onClick={() => {
					setIsCliked(!isCliked);
				}}
			/>
		</>
	);
};

export const ArrowButtonStory: Story = {
	render: () => {
		return <ArrowButtonForStory />;
	},
};
