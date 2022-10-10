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
class DisabilityType extends Component {
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
                        <h4 className='p-pt-0'>Disability Type </h4>
                    </div>
                </Card>
                <Card className='p-mt-0'>
                    <div className=" datatable-scroll-demo">
                        <div className="card p-col-12 p-md-8" style={{ float: 'left' }}>
                            <h4 style={{ paddingTop: '0px' }}> Disability Type List</h4>

                            {/* <DataTable scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                <Column field="id" header="SN" style={{ flexGrow: 1, flexBasis: '20px' }}></Column>
                    <Column field="id" header="Name" style={{ flexGrow: 1, flexBasis: '100px' }}></Column>
                    <Column field="name" header="Username" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="country.name" header="Email" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="date" header="Phone" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="company" header="User Level" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="status" header="Action" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>

                </DataTable> */}
                            <table border="1" className='ucTable' style={{ border: '1px solid #CCC' }}>
                                <thead>
                                    <tr>
                                        <th>SN </th>
                                        <th>Name</th>
                                        <th>Name Nepali   </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1   </td>
                                        <td>Physically disabled </td>
                                        <td>Physically disabled</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>


                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2   </td>
                                        <td>Partially Visually impaired </td>
                                        <td>Partially Visually impaired</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i></td>
                                    </tr>

                                    <tr>
                                        <td>3   </td>
                                        <td>Fully Visually impaired </td>
                                        <td>Fully Visually impaired</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>4   </td>
                                        <td>Partially Deaf </td>
                                        <td>Partially Deaf</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5   </td>
                                        <td>Deaf </td>
                                        <td>Deaf</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>


                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6   </td>
                                        <td>Deaf Blind</td>
                                        <td>Deaf Blind</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i></td>
                                    </tr>

                                    <tr>
                                        <td>7  </td>
                                        <td>Speech and hearing disability </td>
                                        <td>Speech and hearing disability</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>8   </td>
                                        <td>Mental disability </td>
                                        <td>Mental disability</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>9   </td>
                                        <td>Intellectually disabled </td>
                                        <td>Intellectually disabled</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>


                                        </td>
                                    </tr>
                                    <tr>
                                        <td>10  </td>
                                        <td>Hemophelia </td>
                                        <td>Hemophelia</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i></td>
                                    </tr>

                                    <tr>
                                        <td>11  </td>
                                        <td>Autism </td>
                                        <td>Autism</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>12   </td>
                                        <td>Multiple</td>
                                        <td>Multiple</td>
                                        <td>Active</td>
                                        <td>
                                            <i className="pi pi-user-edit float-left"></i>
                                            <i className="pi pi-ban float-right"></i>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="card p-col-12 p-md-4" style={{ float: 'left' }}>
                            <h4 className="p-ml-3" style={{ paddingTop: '0px' }}>Disability Type Creation</h4>
                            <div className="p-field p-col-12 p-md-12 float-left">
                                <div class="p-field p-col-4 p-md-4 float-left">
                                    Name Eng:
                                </div>
                                <div class="p-field p-col-8 p-md-8 float-left">
                                    <InputText placeholder=''></InputText>
                                </div>
                            </div>
                            <div className="p-field p-col-12 p-md-12 float-left">
                                <div class="p-field p-col-4 p-md-4 float-left">
                                    Name Nep:
                                </div>
                                <div class="p-field p-col-8 p-md-8 float-left">
                                    <InputText placeholder=''></InputText>
                                </div>
                            </div>


                            <div className="p-field p-col-12 p-md-12 float-left">
                                <div class="p-field p-col-4 p-md-4 float-left">
                                    Status:
                                </div>
                                <div class="p-field p-col-8 p-md-8 float-left">
                                    <RadioButton name="city" /> Active &nbsp;
                                    <RadioButton name="city" /> Inactive
                                </div>
                            </div>



                            <div className="p-field p-col-12 p-md-12 float-left">
                                <div class="p-field p-col-8 p-md-8 float-left">
                                </div>

                                <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                                    <Button style={{ background: '#4e70ae', color: '#FFF', width: '100%', textAlign: 'center' }}>
                                        Create
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </Card>
            </>
        );
    }
}
export default DisabilityType;