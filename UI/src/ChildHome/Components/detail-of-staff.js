import React, {  } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";


import { Dropdown } from 'primereact/dropdown';

function SeniorCitizenModule(){
  return(
<>
<Card className='p-mb-1' style={{ borderRadius:'8px 8px 0px 0px', background:'#f7f7f8'}}>
     <div className=' p-card-content'>
       <h4 className='p-pt-0'>Detail of Staff</h4> 
     </div>
</Card>
<Card className='p-mt-0'>
     
     <div className=' p-card-content'>
     <form className="p-grid p-fluid ">
     <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-2 p-md-2 float-left">
                 Fiscal Year :
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                  <Dropdown inputId="dropdown" placeholder='Select'  />
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               Quarter
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                  <Dropdown inputId="dropdown" placeholder='Select'  />
               </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
          <div className="p-field p-col-12 p-md-12 ">
              <hr style={{marginTop:'5px'}}></hr>
              </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               Total number of staff: 
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder=''></InputText>
               </div>
               <div className="p-field p-col-4 p-md-4 float-left">
               No. of male staff
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder=''></InputText>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               No. of female staff
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder=''></InputText>
               </div>
               <div className="p-field p-col-4 p-md-4 float-left">
                No. of LGBQT staff
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder=''></InputText>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               Age of staff
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="ageofstaff" /> over 18  
               
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="ageofstaff" /> under 18  
               </div>
               
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                   Eudcation level
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder='Male'></InputText>
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder='Female'></InputText>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                Contract paper of employee
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="Contract" /> Yes  
               
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="Contract" /> No  
               </div>

               {/* <div className="p-field p-col-2 p-md-2 float-left">
              <div className="p-inputgroup">
               <span className="p-inputgroup-addon">
                                <InputText placeholder='Boys' />

                                </span>
                                <span className="p-inputgroup-addon">
                                <InputText placeholder='Girls'  />
                                </span>
                            </div> 
               </div> */}
               
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                  ID card provided/ Dress provided
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="idcard" /> Yes  
               
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="idcard" /> No  
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                  Working hours
               </div>
               <div className="p-field p-col-4 p-md-4 float-left">
              <div className="p-inputgroup">
               <span className="p-inputgroup-addon">
                                <InputText placeholder='for male' />
                                </span>
                                <span className="p-inputgroup-addon">
                                <InputText placeholder='for female'  />
                                </span>
                            </div> 
               </div>
               
          </div>


          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                    Average salary
               </div>
               <div className="p-field p-col-4 p-md-4 float-left">
              <div className="p-inputgroup">
               <span className="p-inputgroup-addon">
                                <InputText placeholder='for male' />
                                </span>
                                <span className="p-inputgroup-addon">
                                <InputText placeholder='for female'  />
                                </span>
                            </div> 
               </div>
               
          </div>


          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               Weekly working days for male/female
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                <InputText placeholder='' />
               </div>

               <div className="p-field p-col-2 p-md-2 float-left">
               Drop-off facility
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="facility" /> Yes  
               
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="facility" /> No  
               </div>
               
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                Position of staff
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <Dropdown placeholder='' />
               </div>

               <div className="p-field p-col-2 p-md-2 float-left">
               Dependent of staff
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="dependent" /> Yes  
               
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="dependent" /> No  
               </div>
               
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               If Yes  please specify children (boy/girl), spouse info. 
               </div>
               <div className="p-field p-col-6 p-md-6 float-left">
               <InputText placeholder=''  />
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               Legal document present with individual
               </div>
               <div className="p-field p-col-6 p-md-6 float-left">
               <InputText placeholder='if Yes: specify what kind of citizenship, birth certificate, etc. '  />
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                  Married
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="married" /> Married  
               
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="married" /> un-married  
               </div>

               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="married" />  livingtogther 
               </div>
               
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               </div>
               <div className="p-field p-col-6 p-md-6 float-left">
               <InputText placeholder='If married please provide marriage certificate No. '  />
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               No of missing staffs (if any)
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <InputText placeholder=''  />
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                    No of incident of violence/ exploitation (if any)
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="exploitation" /> Labor  
               
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="exploitation" /> Sexual  
               </div>

               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="exploitation" />  Physical
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               <input type="radio" name="exploitation" />  Psycological
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
               </div>
               <div className="p-field p-col-6 p-md-6 float-left">
               <InputText placeholder='others (specify…)'  />
               </div>
          </div>


          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-4 p-md-4 float-left">
                    Abroad visit
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="Abroad" /> yes  
               
               </div>
               <div className="p-field p-col-1 p-md-1 float-left">
               <input type="radio" name="Abroad" /> No  
               </div>

               <div className="p-field p-col-3 p-md-3 float-left">
               <InputText placeholder='(specify, 3 months/6 months)'  />
               
               </div>
          </div>


          

















          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-10 p-md-10 float-left">
              
               </div>
               
               <div className="p-field p-col-2 p-md-2 float-right">
               <Button style={{ justifyContent:'center', alignItems:'center', background:'#1c80cf', color:'#FFF'}}> Submit </Button>
               </div>
          </div>


     </form>
          
     </div>
     
</Card>
</>
          );
        }
        
export default SeniorCitizenModule;



