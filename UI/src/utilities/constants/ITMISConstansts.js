import { t } from "i18next";

export const USER_LEVEL = {
  MINISTRY: "MINISTRY",
  PROVINCE: "PROVINCE",
  DISTRICT: "DISTRICT",
  LOCAL_LEVEL: "LOCAL LEVEL",
  LOCAL_LEVEL_VERIFIER: "LOCAL LEVEL VERIFIER",
  WARD: "WARD",
  SOCIAL_SERVICE: "SOCIAL SERVICE",
  OTHERS: "OTHERS",
};

export const STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const MODULE_FUNCTION_VALUE = {
  1: "view",
  2: "add",
  3: "edit",
  4: "delete",
};
export const MODULE_FUNCTION_FIELD = {
  VIEW: "view",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

export const SOCIAL_SERVICE_MODULES = {
  SHELTER_HOME: "Shelter Home",
  CHILD_HOME: "Child Home",
  CHILD_CORRECTION: "Juvenile Correction Home",
  OLD_AGE_HOME: "Old Age Home",
};

export const YES_NO = {
  YES: "Yes",
  NO: "No",
  OTHERS: "Others",
};

export const TRUE_FALSE = {
  TRUE: "true",
  FALSE: "false",
};

export const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

export const AGE_GROUP = {
  CHILDREN: "Children",
  ADULT: "Adult",
  ELDER: "Elder",
};

export const AGE_GROUP_OLD = {
  Age6065: "60-65",
  Age6068: "60-68",
  Age6975: "69-75",
  Age6570: "65-70",
  Age7690: "76-90",
  Age7080: "70-80",
  Age8090: "80-90",
  Age9199: "91-99",
  Age90Above: "90 and Above",
  Age99Above: "99 and Above",
};

export const CASTE = {
  DALIT: "Dalit",
  MUSLIM: "Muslim",
  MADHESI: "Madhesi",
  JANAJATI: "Janajati",
  BRAHMIN: "Brahmin",
  OTHER: "Other",
};

export const ORPHAN_OR_NOT = {
  PARENT_GUARIDIAN_PRESENT: "Parent Guardian Present",
  SINGLE_PARENT: "Single Parent",
  ORPHAN: "Orphan",
};

export const REHABILITATED_TO = {
  HOME: "Home",
  OJT: "OJT",
  OUT_OF_COMMUNITY: "Out Of Community",
  ADOPTION: "Adoption",
  FOSTER_HOME: "Foster Home",
};

export const LABOUR_MIGRATION_VISA_TYPE = {
  MANPOWER: "Manpower",
  INDIVIDUAL: "Individual",
  VISIT_VISA: "Visit Visa",
};

export const LABOUR_MIGRATION_RECEIPT_AMT_PAID = {
  TAKEN: "Taken",
  NOT_TAKEN: "Not Taken",
};

export const LABOUR_MIGRATION_DOCUMENTED = {
  DOCUMENTED: "Documentated",
  UNDOCUMENTED: "Undocumentated",
};

export const LABOUR_MIGRATION_FORMAL_CONTRACT = {
  RECEIVED: "Received",
  NOT_RECEIVED: "NotReceived",
};

export const ACTION = {
  VIEW: "VIEW",
  UPDATE: "UPDATE",
};

export const LANGUAGE = {
  ENGLISH: "en",
  NEPALI: "np",
};

export const MODULE_LIST = [
  { moduleName: t("Women and Minorities"), moduleId: "WomenAndMinorities" },
  { moduleName: t("Children"), moduleId: "Children" },
  { moduleName: t("Disabled"), moduleId: "Disabled" },
  { moduleName: t("Senior Citizen"), moduleId: "SeniorCitizen" },
  {
    moduleName: t("Complaint Registration"),
    moduleId: "ComplaintRegistration",
  },
  { moduleName: t("Shelter Home"), moduleId: "ShelterHome" },
  { moduleName: t("Sewa Kendra"), moduleId: "SewaKendra" },
  { moduleName: t("Child Home"), moduleId: "ChildHome" },
  { moduleName: t("Child Correction Home"), moduleId: "ChildCorrectionHome" },
  { moduleName: t("Old Age Home"), moduleId: "OldAgeHome" },
  { moduleName: t("Labour Migration"), moduleId: "LabourMigrationIndicator" },
];

export const ID_CATEGORY_NEPALI = {
  ka: " क",
  kha: "ख",
  ga: "ग",
  gha: "घ",
};
export const ID_CATEGORY_ENGLISH = {
  क: "ka",
  ख: "kha",
  ग: "Ga",
  घ: "Gha",
};

export const GENDER_NEPALI = {
  Male: "पुरुष",
  Female: "महिला",
  Other: "अन्य",
};
export const DISABILITY_BY_NATURE_NEPALI = {
  BLINDNESS: "दृष्टि विहीन",
  LOCOMOTOR_DISABILITY: "लोकोमोटर असक्षमता",
};
export const DISABILITY_BY_SEVERITY_NEPALI = {
  HIGH: "उच्च",
  MEDIUM: "मध्यम",
  LOW: "कम",
};
export const FORM_MODE = {
  NEW: "NEW",
  UPDATE: "UPDATE",
};

export const ID_CARD_SIZE = {
  SMART: "SMART",
  NORMAL: "NORMAL",
};
export const AVAILABLE_CONCESSION_NEPALI = {
  Discount_Medical_Expenses: "उपचार खर्चमा छुट",
  Discount_Air_Service_And_Car_Rental: "हवाई सेवा र गाडी भाडामा छुट",
  Discount_Air_Service_And_Car_Seat: "हवाई सेवा र गाडी सीटमा  बेबस्था",
};
export const AVAILABLE_CONCESSION_ENGLISH = {
  Discount_Medical_Expenses: "Discount on medical expenses",
  Discount_Air_Service_And_Car_Rental: "Discount on air service and car rental",
  Discount_Air_Service_And_Car_Seat: "Discount in air service and car seat",
};

