import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

export class DropdownDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lazyItems: [],
            lazyLoading: false,
            selectedTime: null,
        };

        this.time = [
            { name: 'Last 12 Months', code: 'Year' },
            { name: 'Last 30 Days', code: 'Month' },
            { name: 'Last 7 Days', code: 'Week' }
        ];
        
        this.items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));
        this.onTimeChange = this.onTimeChange.bind(this);
    }
    onTimeChange(e) {
        this.setState({ selectedTime: e.value });
    }

    render() {
        return (
        <Dropdown value={this.state.selectedTime} options={this.time} onChange={this.onTimeChange} optionLabel="name" placeholder="Select a Time" />
        );
    }
}
export default DropdownDemo;