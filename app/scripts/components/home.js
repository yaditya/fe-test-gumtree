import React, {Component} from 'react';
import Content from './content';
import data from '../../../content.json';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Content data={data} />
			</div>
		);
	}
}
