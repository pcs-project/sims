import React, { useState, useEffect,Component  } from 'react';
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
import { ProductService } from '../Components/ProductService';
class usercreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
        products: []
    };

    this.productService = new ProductService();
}

componentDidMount() {
    this.productService.getProductsSmall().then(data => this.setState({ products: data }));
}

  render() {
  return(
<>
<Card className='p-mb-1' style={{ borderRadius:'8px 8px 0px 0px', background:'#f7f7f8'}}>
     <div className=' p-card-content'>
       <h4 className='p-pt-0'>Registration of Shelter / Child / Child Correction / Old Age Home</h4> 
     </div>
</Card>
<Card className='p-mt-0'>
<div className=" datatable-scroll-demo">
            <div className="card p-col-12 p-md-8" style={{float:'left'}}>
                <h4 style={{paddingTop:'0px'}}>  List</h4>

                {/* <DataTable scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                <Column field="id" header="SN" style={{ flexGrow: 1, flexBasis: '20px' }}></Column>
                    <Column field="id" header="Name" style={{ flexGrow: 1, flexBasis: '100px' }}></Column>
                    <Column field="name" header="Username" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="country.name" header="Email" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="date" header="Phone" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="company" header="User Level" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="status" header="Action" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>

                </DataTable> */}


<table border="1" className='ucTable' style={{border:'1px solid #CCC'}}>
  <thead>
  <tr>
    <th>Category  </th>
    <th>Name</th>
    <th>Address   </th>
    <th>Types of Service </th>
    <th>Action</th>
  </tr>
  </thead>

  <tbody>
<tr>
  <td>Child   </td>
  <td>Balsewa Griha  </td>
  <td>Bagmati Lalitpur</td>
  <td>Counseling</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td>Child C.    </td>
  <td>BalMandir Griha </td>
  <td>Bagmati Bhaktapur</td>
  <td>Medical</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td> Old Age H.  </td>
  <td>Nyano B asram  </td>
  <td> Lumbini Rupendehi   </td>
  <td>Lifeskill</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td>Child   </td>
  <td>Balsewa Griha  </td>
  <td>Bagmati Lalitpur</td>
  <td>Counseling</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td>Child C.    </td>
  <td>BalMandir Griha </td>
  <td>Bagmati Bhaktapur</td>
  <td>Medical</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td> Old Age H.  </td>
  <td>Nyano B asram  </td>
  <td> Lumbini Rupendehi   </td>
  <td>Lifeskill</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr><tr>
  <td>Child   </td>
  <td>Balsewa Griha  </td>
  <td>Bagmati Lalitpur</td>
  <td>Counseling</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td>Child C.    </td>
  <td>BalMandir Griha </td>
  <td>Bagmati Bhaktapur</td>
  <td>Medical</td>
  <td>    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i></td>
</tr>
<tr>
  <td> Old Age H.  </td>
  <td>Nyano B asram  </td>
  <td> Lumbini Rupendehi   </td>
  <td>Lifeskill</td>
  <td>
    <i className="pi pi-user-edit float-left"></i>
    <i className="pi pi-trash float-right"></i>
  </td>
</tr>
  </tbody>
</table>

            </div>
            <div className="card p-col-12 p-md-4" style={{float:'left'}}>
                 <h4 className="p-ml-3" style={{paddingTop:'0px'}}>Shelter Creation</h4>

                 <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                 Category : 

                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left">
                 <RadioButton name="city"  />  Shelter Home<br></br>
                 <RadioButton name="city"  /> Child Home <br></br>
                 <RadioButton  name="city"  /> Child Correction<br></br>
                 <RadioButton  name="city"  /> Old Age Home  &nbsp; 
                 </div>
               </div>



                 <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                      Name : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left">
                    <InputText placeholder=''></InputText>
                 </div>
               </div>



               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                     <strong>Address</strong> 
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                    Province : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='select' style={{width:'100%'}} />
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                     District : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='select' style={{width:'100%'}} />
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                 Local Level: 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='select' style={{width:'100%'}} />
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                    Ward  : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='select' style={{width:'100%'}} />
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Phone No. : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Email : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Website : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-12 p-md-12 float-left">
                     <strong>Contact of Head</strong> 
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Name of Head : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Email : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                   Mobile : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>
               
               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-12 p-md-12 float-left">
                     <strong>Registration Details </strong> 
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-left">
                 Number : 
                 </div>
                 <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                 <InputText placeholder=''></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-4 p-md-4 float-right">
                 <InputText placeholder='Place' style={{width:'100px'}}></InputText>
                 </div>
                 <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                 <InputText placeholder='Date' style={{width:'100px'}}></InputText>
                 </div>
               </div>

              



               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-12 p-md-12 float-left">
                     <strong>Other Details</strong> 
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                 Own building? 

                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left">
                 <RadioButton name="city"  /> Yes
                 <RadioButton name="city"  /> No 
               </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                      Rent? 
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left">
                      <RadioButton name="city"  /> Yes
                      <RadioButton name="city"  /> No 
               </div>
               </div>


               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                    Types of service : 
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='select' style={{width:'100%'}} />
                 </div>
               </div>


               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                     Physical Infra.
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <InputText placeholder=''  style={{width:'100%'}}></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                     Number of staff
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <div className="p-inputgroup">
               <span className="p-inputgroup-addon">
                                <InputText placeholder='M' />

                                </span>
                                <span className="p-inputgroup-addon">
                                <InputText placeholder='F'  />
                                </span>
                            </div>
                 </div>
               </div>
               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                    
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <InputText placeholder='Other'  style={{width:'100%'}}></InputText>
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                    Source of Funding
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='Donation' style={{width:'100%'}} />
                 </div>
               </div>

               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-6 p-md-6 float-left">
                    Management Type
                 </div>
                 <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                 <Dropdown inputId="dropdown" placeholder='Board' style={{width:'100%'}} />
                 </div>
               </div>


               <div className="p-field p-col-12 p-md-12 float-left">
                 <div class="p-field p-col-8 p-md-8 float-left">
                 </div>

                 <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                 <Button style={{background:'#4e70ae', color:'#FFF',width:'100%', textAlign:'center'}}>
                    Create
                 </Button>
                 </div>

               </div>
            </div>
</div>
 <div style={{clear:'both'}}></div>
</Card>
</>
    );
  }
}     
export default usercreation;