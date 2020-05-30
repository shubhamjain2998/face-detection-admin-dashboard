import React from 'react';
import { Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<Button
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		variant='transparent'
	>
		<BsThreeDotsVertical />
		{children}
	</Button>
));

export default CustomToggle;
