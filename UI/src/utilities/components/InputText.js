import { AutoComplete } from 'primereact/autocomplete';
import { InputText as InputText2 } from "primereact/inputtext";
import { useState } from "react";
import TextConversion from "../components/TextConversion";

const nepaliNum = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

const InputText = (props) => {
    const [nepaliList, setNepaliList] = useState([]);
    const [internalValue, setInternalValue] = useState();

    if (props.convertToNepali) return <AutoComplete {...props}
        onFocus={() => {
            setInternalValue(props.value);
            console.log(props.value);
        }}
        onBlur={() => {
            console.log(internalValue, props.value, /[a-zA-Z]/.test(props.value));
            if (props.value && /[a-zA-Z]/.test(props.value))
                props.onChange({ value: internalValue, target:{ value: internalValue} });
            else
                setInternalValue(props.value);
        }}
        // forceSelection
        suggestions={nepaliList} completeMethod={(e) => {
            // if (!nepaliList || !nepaliList.length) {
            //     setNepaliList([e.query]);
            // }

            TextConversion(e.query)
                .then((texts) => {
                    setNepaliList(texts);
                })
        }} />;
    else return <InputText2 {...props} onChange={(e) => {
        if (props.isName)
            e.target.value = e.target.value && e.target.value.toUpperCase();
        props.onChange && props.onChange(e);
    }} onBlur={(e) => {
        if (props.clearSpace || props.isName)
            e.target.value = e.target.value && e.target.value.trim().replace(/ +/ig, ' ');

        props.onChange && props.onChange(e);
        props.onBlur && props.onBlur(e);
    }} />
};
export default InputText;