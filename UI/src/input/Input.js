import React from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const Input = (props) => {
    return (<InputText {...props} />)
}

export const Select = (props) => {
    const list = props.list;

    return (<Dropdown optionLabel="name" options={list} placeholder="Select a City"/>)
}

export default Input;