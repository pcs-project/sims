
import { adToBs, bsToAd } from "@sbmdkl/nepali-date-converter";
import moment from "moment";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";


export const convertDOBNepToNepali = (dateEng) => {
    let data = adToBs(moment(dateEng).format("YYYY-MM-DD")).toString();
    const dobNepArray = data.split("-");
    const dobNep =
        englishToNepaliNumber(dobNepArray[0]) +
        "-" +
        englishToNepaliNumber(dobNepArray[1]) +
        "-" +
        englishToNepaliNumber(dobNepArray[2]);
    return dobNep;
};


