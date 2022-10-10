import React, { useState, useEffect } from 'react';
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import AppProps from "../../AppProps";
import { InputSwitch } from 'primereact/inputswitch';
import { Image } from "primereact/image";
import LogoGov from "../../scafolding/assets/images/govLogo.png";
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from 'primereact/radiobutton';

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

const MISReport =()=>{
  return(
<>
<Card className='p-mb-1' style={{ borderRadius:'8px 8px 0px 0px', background:'#f7f7f8'}}>
     <div className=' p-card-content'>
       <h4 className='p-pt-0'> मानव बेचबिखन र नियन्त्रणको अवस्था </h4> 
     </div>
</Card>

<Card className='p-mt-0'>
    <form className="p-grid p-fluid">

          <div className="p-field p-col-12 p-md-12 ">

          <div className="p-field p-col-2 p-md-2 float-left">
                प्रदेश :
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
            <Dropdown inputId="dropdown" placeholder=''  />
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
          जिल्ला  :
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
            <Dropdown inputId="dropdown" placeholder=''  />
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
          स्थानिय सरकार  :
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
            <Dropdown inputId="dropdown" placeholder=''  />
          </div>

          <div className="p-field p-col-2 p-md-2 float-left">
                    वडा न. : 
          </div>
          <div className="p-field p-col-2 p-md-2 float-left">
            <Dropdown inputId="dropdown" placeholder=''  />
          </div>

          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-2 p-md-2 float-left">
                    प्रतिवेदन पेश गरिएको मिति : 
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                    <InputText></InputText>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-5 p-md-5 float-left">
               <strong>प्रतिवेदनको अवधी :</strong>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-2 p-md-2 float-left">
                    महिना / त्रैमासिक :  
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                  <InputText></InputText>
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
               वर्ष :  
               </div>
               <div className="p-field p-col-2 p-md-2 float-left">
                <InputText></InputText>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <div className="p-field p-col-5 p-md-5 float-left">
               <strong>क्रियाकलाप प्रतिवेदन :</strong>
               </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
               <table border="2" className='tbl-style' style={{borderCollapse:'collapse', width:'100%'}}>
                    <thead style={{backgroundColor:'#ccc'}}>
                         <tr>
                              <th rowSpan={2}>क्र.सं.</th>
                              <th rowSpan={2}>क्रियाकलापहरू</th>
                              <th rowSpan={2}>एकार्इ</th>
                              <th colSpan={4}>उपलब्धि / प्रगती</th>

                              <th rowSpan={2}>बिषयबस्तुहरू</th>
                              <th rowSpan={2}>कैफियत</th>
                         </tr>
                         <tr>
                              <th>जम्मा</th>
                              <th>पूरूष</th>
                              <th>महिला</th>
                              <th>अन्य</th>
                              
                         </tr>
                         <tr>
                              <th>1</th>
                              <th colSpan={8} style={{textAlign:'left'}}>प्रदेश, जिल्ला, स्थानिय र वडा स्तरिय मानव बेचबिखन नियन्त्रण समितिहरू</th>
                              
                         </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>क. </td>
                            <td>गठनको स्थिति / अवस्था </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                         <tr>
                            <td>ख. </td>
                            <td>बैठकहरू </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                         <tr>
                            <td>ग. </td>
                            <td>महत्वपूर्ण निर्णयहरू </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td></td>
                            <td>स्थानिय तहमा कस्ता प्रकारको कोश खडा गरिएको <br></br> 
                                छ (कृपया भएको जती छान्नु होला) </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td rowSpan={8}></td>
                            <td rowSpan={8}></td>
                            <td>मानब बेचबिखन समबन्धी</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            
                            <td>लैंङ्गीक हिंसा  समबन्धी </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                         <tr>
                            
                            <td>बाल उद्धार ब्यवस्थापान समबन्धी  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            
                            <td>दैभिक प्रकोप समबन्धी </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            
                            <td>अपाङ्गता समबन्धी </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            
                            <td>अन्य  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                         <tr>
                            <td> <p>&nbsp;</p></td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td> <p>&nbsp;</p></td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr style={{backgroundColor:'#CCC'}}>
                              <th>2</th>
                              <th colSpan={8} style={{textAlign:'left'}}>
                                 व्यत्तिहरूमा पुगिएको संख्या (उपलब्ध/ पहिचान अवस्था)
                              </th>
                              
                         </tr>

                         <tr>
                            <td>क.</td>
                            <td>मानव बेचबिखनका (cases) केसहरू पहिचान गरिएको</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ख.</td>
                            <td>बाहिर जाने / आकांक्षी आप्रवासीहरू</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ग.</td>
                            <td>स्वदेश फर्किएका आप्रवासीहरू</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>घ.</td>
                            <td>लैंङ्गीक हिंसा (घरेलु हिंसा, बोक्सीको आरोप, बहुविवाह, आदि)</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ङ.</td>
                            <td>बाल विवाह</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>च.</td>
                            <td>बलात्कार र बलात्कारको प्रयास</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>छ. </td>
                            <td>हरार्इरहेको व्यत्ति</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ज.</td>
                            <td>न्यायीक समितिमा प्राप्त र रेफर गरिएका केस संख्या </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>झ.</td>
                            <td>अन्य</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                         <tr style={{backgroundColor:'#CCC'}}>
                              <th>3</th>
                              <th colSpan={8} style={{textAlign:'left'}}>
                                  सेवा र सहायताहरू प्रदान गरिएका व्यत्तिहरूको संख्या
                              </th>
                              
                         </tr>
                         <tr>
                            <td>क.</td>
                            <td>आवास/पुनरस्थापना </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ख.</td>
                            <td>परामर्श (कानूनी, स्वास्थ्य सेवा, मनोसामाजिक, आदि)</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ग.</td>
                            <td>जीविकोपार्जन</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>घ.</td>
                            <td>सचेतना अभिबृर्दि</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>ङ.</td>
                            <td>उद्धार (Rescue)</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>च.</td>
                            <td>रेफर (Referral)</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>
                         <tr>
                            <td>झ.</td>
                            <td>अन्य</td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                            <td>  </td>
                         </tr>

                    </tbody>
               </table>
              <p className='p-pt-3'>रिपोर्टि गर्ने एकार्इ / संस्था तथा निकायहरू</p> 
              <table table border="2" style={{borderCollapse:'collapse', width:'100%'}}>
              <thead style={{backgroundColor:'#ccc'}}>
                     <tr>
                        <th>क्र.सं.</th>
                        <th>रिपोर्टि गर्ने संस्था तथा निकाय</th>
                        <th>संस्था / निकायको कार्यक्षेत्रहरू</th>
                        <th>सम्पर्क नम्बर (तोकिएको व्यत्ति / निकाय)</th>
                        <th>र्इमेल ठेगाना</th>
                     </tr>
                   </thead>
                   <tbody>
                        <tr>
                             <td><p>&nbsp;</p></td>
                             <td> </td>
                             <td> </td>
                             <td> </td>
                             <td> </td>
                        </tr>
                   </tbody>
              </table>
          </div>

    </form>
</Card>
</>
          
          );
        }
        
export default MISReport;



