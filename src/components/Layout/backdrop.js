import React from 'react';

const Backdrop = (props) => {
	if (props.show) {
		return <div className='backdrop' onClick={props.showSidebar}></div>;
	}
	return <></>;
};
export default Backdrop;
