import React from 'react';
import './NotFound.css';
import repairIcon from './repair.png';

import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="error-msg">
			<img src={repairIcon} alt="" className="repair-icon" />
			<h1>404</h1>
			<p>It's look like there is no such page</p>
			<p>
				Try redirect to <Link to="/">home page</Link>
			</p>
		</div>
	);
};

export default NotFound;
