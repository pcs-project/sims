import React, { useState, useEffect, Component } from 'react';
import { PrimeIcons } from 'primereact/api';
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import AppProps from "../../AppProps";
import { InputSwitch } from 'primereact/inputswitch';
import { Image } from "primereact/image";
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from 'primereact/radiobutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { TreeSelect } from 'primereact/treeselect';
import { Password } from 'primereact/password';
class FiscalYearSetup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    render() {
        return (
            <>
                <Card className='p-mb-1' style={{ borderRadius: '8px 8px 0px 0px', background: '#f7f7f8' }}>
                    <div className=' p-card-content'>
                        <h4 className='p-pt-0'>Under Construction </h4>
                    </div>
                </Card>
                
            </>
        );
    }
}
export default FiscalYearSetup;