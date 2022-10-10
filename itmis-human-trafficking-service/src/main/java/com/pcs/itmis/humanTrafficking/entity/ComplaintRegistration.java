package com.pcs.itmis.humanTrafficking.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.pcs.itmis.humanTrafficking.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "COMPLAINT_REGISTRATION")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintRegistration {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long complaintRegistrationId;

	private String fiscalYear;
	private String quarter;

	private Long crUnder47Part1;
	@Convert(converter = StringListConverter.class)
	private List<String> crUnder47Part1Source;
	private String crUnder47Part1SourceOthers;

	private Long maleCrToWages;
	private Long femaleCrToWages;
	private Long dalitCrToWages;
	private Long ethnicMinoritiesCrToWages;
	private Long janajatiCrToWages;
	private Long madhesiCrToWages;
	private Long brahminCrToWages;
	@Convert(converter = StringListConverter.class)
	private List<String> crToWagesSource;
	private String crToWagesSourceOthers;

	private Long maleCrToSeniorCitizen;
	private Long femaleCrToSeniorCitizen;
	private Long dalitCrToSeniorCitizen;
	private Long ethnicMinoritiesCrToSeniorCitizen;
	private Long janajatiCrToSeniorCitizen;
	private Long madhesiCrToSeniorCitizen;
	private Long brahminCrToSeniorCitizen;
	@Convert(converter = StringListConverter.class)
	private List<String> crToSeniorCitizenSource;
	private String crToSeniorCitizenSourceOthers;

	private Long maleCrToMinors;
	private Long femaleCrToMinors;
	private Long dalitCrToMinors;
	private Long ethnicMinoritiesCrToMinors;
	private Long janajatiCrToMinors;
	private Long madhesiCrToMinors;
	private Long brahminCrToMinors;
	@Convert(converter = StringListConverter.class)
	private List<String> crToMinorsSource;
	private String crToMinorsSourceOthers;

	private Long maleCrUnder47Part2;
	private Long femaleCrUnder47Part2;
	private Long dalitCrUnder47Part2;
	private Long ethnicMinoritiesCrUnder47Part2;
	private Long janajatiCrUnder47Part2;
	private Long madhesiCrUnder47Part2;
	private Long brahminCrUnder47Part2;
	@Convert(converter = StringListConverter.class)
	private List<String> crUnder47Part2Source;
	private String crUnder47Part2SourceOthers;

	private Long maleCrToDivorce;
	private Long femaleCrToDivorce;
	private Long dalitCrToDivorce;
	private Long ethnicMinoritiesCrToDivorce;
	private Long janajatiCrToDivorce;
	private Long madhesiCrToDivorce;
	private Long brahminCrToDivorce;
	@Convert(converter = StringListConverter.class)
	private List<String> crToDivorceSource;
	private String crToDivorceSourceOthers;

	private Long maleCrToBattery;
	private Long femaleCrToBattery;
	private Long dalitCrToBattery;
	private Long ethnicMinoritiesCrToBattery;
	private Long janajatiCrToBattery;
	private Long madhesiCrToBattery;
	private Long brahminCrToBattery;
	@Convert(converter = StringListConverter.class)
	private List<String> crToBatterySource;
	private String crToBatterySourceOthers;

	private Long maleCrToDefamation;
	private Long femaleCrToDefamation;
	private Long dalitCrToDefamation;
	private Long ethnicMinoritiesCrToDefamation;
	private Long janajatiCrToDefamation;
	private Long madhesiCrToDefamation;
	private Long brahminCrToDefamation;
	@Convert(converter = StringListConverter.class)
	private List<String> crToDefamationSource;
	private String crToDefamationSourceOthers;

	private Long maleDsUnder47Part1;
	private Long femaleDsUnder47Part1;
	private Long dalitDsUnder47Part1;
	private Long ethnicMinoritiesDsUnder47Part1;
	private Long janajatiDsUnder47Part1;
	private Long madhesiDsUnder47Part1;
	private Long brahminDsUnder47Part1;
	@Convert(converter = StringListConverter.class)
	private List<String> dsUnder47Part1Source;
	private String dsUnder47Part1SourceOthers;

	private Long maleDsMedicationUnder47Part2;
	private Long femaleDsMedicationUnder47Part2;
	private Long dalitDsMedicationUnder47Part2;
	private Long ethnicMinoritiesDsMedicationUnder47Part2;
	private Long janajatiDsMedicationUnder47Part2;
	private Long madhesiDsMedicationUnder47Part2;
	private Long brahminDsMedicationUnder47Part2;
	@Convert(converter = StringListConverter.class)
	private List<String> dsMedicationUnder47Part2Source;
	private String dsMedicationUnder47Part2SourceOthers;

	private Long maleCrBeyondJurisdiction;
	private Long femaleCrBeyondJurisdiction;
	private Long dalitCrBeyondJurisdiction;
	private Long ethnicMinoritiesCrBeyondJurisdiction;
	private Long janajatiCrBeyondJurisdiction;
	private Long madhesiCrBeyondJurisdiction;
	private Long brahminCrBeyondJurisdiction;
	@Convert(converter = StringListConverter.class)
	private List<String> crBeyondJurisdictionSource;
	private String crBeyondJurisdictionSourceOthers;

	private Long maleCrRelevantInstitutions;
	private Long femaleCrRelevantInstitutions;
	private Long dalitCrRelevantInstitutions;
	private Long ethnicMinoritiesCrRelevantInstitutions;
	private Long janajatiCrRelevantInstitutions;
	private Long madhesiCrRelevantInstitutions;
	private Long brahminCrRelevantInstitutions;
	@Convert(converter = StringListConverter.class)
	private List<String> crRelevantInstitutionsSource;
	private String crRelevantInstitutionsSourceOthers;

	private Long maleCrToLegalAidService;
	private Long femaleCrToLegalAidService;
	private Long dalitCrToLegalAidService;
	private Long ethnicMinoritiesCrToLegalAidService;
	private Long janajatiCrToLegalAidService;
	private Long madhesiCrToLegalAidService;
	private Long brahminCrToLegalAidService;
	@Convert(converter = StringListConverter.class)
	private List<String> crToLegalAidServiceSource;
	private String crToLegalAidServiceSourceOthers;

	private Long maleCrToPsychoSocioCounselling;
	private Long femaleCrToPsychoSocioCounselling;
	private Long dalitCrToPsychoSocioCounselling;
	private Long ethnicMinoritiesCrToPsychoSocioCounselling;
	private Long janajatiCrToPsychoSocioCounselling;
	private Long madhesiCrToPsychoSocioCounselling;
	private Long brahminCrToPsychoSocioCounselling;
	@Convert(converter = StringListConverter.class)
	private List<String> crToPsychoSocioCounsellingSource;
	private String crToPsychoSocioCounsellingSourceOthers;

	private Long maleCrToMedicalInstitutions;
	private Long femaleCrToMedicalInstitutions;
	private Long dalitCrToMedicalInstitutions;
	private Long ethnicMinoritiesCrToMedicalInstitutions;
	private Long janajatiCrToMedicalInstitutions;
	private Long madhesiCrToMedicalInstitutions;
	private Long brahminCrToMedicalInstitutions;
	@Convert(converter = StringListConverter.class)
	private List<String> crToMedicalInstitutionsSource;
	private String crToMedicalInstitutionsSourceOthers;

	private Long maleCrAboutDisabilityCard;
	private Long femaleCrAboutDisabilityCard;
	private Long dalitCrAboutDisabilityCard;
	private Long ethnicMinoritiesCrAboutDisabilityCard;
	private Long janajatiCrAboutDisabilityCard;
	private Long madhesiCrAboutDisabilityCard;
	private Long brahminCrAboutDisabilityCard;
	@Convert(converter = StringListConverter.class)
	private List<String> crAboutDisabilityCardSource;
	private String crAboutDisabilityCardSourceOthers;

	private Long firRegisteredByMale;
	private Long firRegisteredByFemale;
	private Long firRegisteredByDalit;
	private Long firRegisteredByEthnicMinorities;
	private Long firRegisteredByJanajati;
	private Long firRegisteredByMadhesi;
	private Long firRegisteredByBrahmin;
	@Convert(converter = StringListConverter.class)
	private List<String> firRegisteredSource;
	private String firRegisteredSourceOthers;

	private Long gbvCaseProsecutedByCourt;
	private Long tipCaseProsecutedByCourt;
	private Long otherCaseProsecutedByCourt;
	@Convert(converter = StringListConverter.class)
	private List<String> caseProsecutedByCourtSource;
	private String caseProsecutedByCourtSourceOthers;

	private Long gbvCaseDecidedByCourt;
	private Long tipCaseDecidedByCourt;
	private Long otherCaseDecidedByCourt;
	@Convert(converter = StringListConverter.class)
	private List<String> caseDecidedByCourtSource;
	private String caseDecidedByCourtSourceOthers;

	private Long othersCrToWages;
	private Long othersCrToSeniorCitizen;
	private Long othersCrToMinors;
	private Long othersCrUnder47Part2;
	private Long othersCrToDivorce;
	private Long othersCrToBattery;
	private Long othersCrToDefamation;
	private Long othersDsUnder47Part1;
	private Long othersDsMedicationUnder47Part2;
	private Long othersCrBeyondJurisdiction;
	private Long othersCrRelevantInstitutions;
	private Long othersCrToLegalAidService;
	private Long othersCrToPsychoSocioCounselling;
	private Long othersCrToMedicalInstitutions;
	private Long othersCrAboutDisabilityCard;
	private Long firRegisteredByOthers;

	private Long muslimCrToWages;
	private Long muslimCrToSeniorCitizen;
	private Long muslimCrToMinors;
	private Long muslimCrUnder47Part2;
	private Long muslimCrToDivorce;
	private Long muslimCrToBattery;
	private Long muslimCrToDefamation;
	private Long muslimDsUnder47Part1;
	private Long muslimDsMedicationUnder47Part2;
	private Long muslimCrBeyondJurisdiction;
	private Long muslimCrRelevantInstitutions;
	private Long muslimCrToLegalAidService;
	private Long muslimCrToPsychoSocioCounselling;
	private Long muslimCrToMedicalInstitutions;
	private Long muslimCrAboutDisabilityCard;
	private Long firRegisteredByMuslim;
	
	private Long otherEthnicityCrToWages;
	private Long otherEthnicityCrToSeniorCitizen;
	private Long otherEthnicityCrToMinors;
	private Long otherEthnicityCrUnder47Part2;
	private Long otherEthnicityCrToDivorce;
	private Long otherEthnicityCrToBattery;
	private Long otherEthnicityCrToDefamation;
	private Long otherEthnicityDsUnder47Part1;
	private Long otherEthnicityDsMedicationUnder47Part2;
	private Long otherEthnicityCrBeyondJurisdiction;
	private Long otherEthnicityCrRelevantInstitutions;
	private Long otherEthnicityCrToLegalAidService;
	private Long otherEthnicityCrToPsychoSocioCounselling;
	private Long otherEthnicityCrToMedicalInstitutions;
	private Long otherEthnicityCrAboutDisabilityCard;
	private Long firRegisteredByOtherEthnicity;

	private String status;
	private String entryBy;
	private Long userOrganization;

	private LocalDate entryDate;

	private LocalDate lastModifiedDate;
	private String remarks;
	
	private Long crAboutTip;
	private Long crAboutPolygamy;
	private Long crAboutChildMarriage;
	private Long crAboutForcedAction;
	private Long crAboutForcedActionIndustry;
	private Long crAboutUnnaturalIntercourse;
	private Long crAboutChildSexualAbuse;
	private Long crAboutSexualAbuse;
	private Long crAboutAccusedOfWitchcraft;
	private Long crAboutDomesticViolence;
	private Long otherCrAboutWomenAndChildren;
	@Convert(converter = StringListConverter.class)
	private List<String> crToWomenAndChildrenSource;
	private String crToWomenAndChildrenSourceOthers;

	private Long crAboutTipHumanOrganTransplantation;
	private Long crAboutForcedTip;
	private Long crAboutBeatenAndMiscarried;
	private Long crAboutThrowingAliveChild;
	private Long crAboutKidnappingAndRape;
	private Long crAboutDutyByForce;
	private Long crAboutAbductionAndDuty;
	private Long otherCrMiscellaneous;
	@Convert(converter = StringListConverter.class)
	private List<String> crMiscellaneousSource;
	private String crMiscellaneousSourceOthers;
	
	public void copyData(ComplaintRegistration nDetails) {
		this.crUnder47Part1 = nDetails.crUnder47Part1;
		this.crUnder47Part1Source = nDetails.crUnder47Part1Source;
		this.crUnder47Part1SourceOthers = nDetails.crUnder47Part1SourceOthers;
		this.maleCrToWages = nDetails.maleCrToWages;
		this.femaleCrToWages = nDetails.femaleCrToWages;
		this.dalitCrToWages = nDetails.dalitCrToWages;
		this.ethnicMinoritiesCrToWages = nDetails.ethnicMinoritiesCrToWages;
		this.janajatiCrToWages = nDetails.janajatiCrToWages;
		this.madhesiCrToWages = nDetails.madhesiCrToWages;
		this.brahminCrToWages = nDetails.brahminCrToWages;
		this.crToWagesSource = nDetails.crToWagesSource;
		this.crToWagesSourceOthers = nDetails.crToWagesSourceOthers;
		this.maleCrToSeniorCitizen = nDetails.maleCrToSeniorCitizen;
		this.femaleCrToSeniorCitizen = nDetails.femaleCrToSeniorCitizen;
		this.dalitCrToSeniorCitizen = nDetails.dalitCrToSeniorCitizen;
		this.ethnicMinoritiesCrToSeniorCitizen = nDetails.ethnicMinoritiesCrToSeniorCitizen;
		this.janajatiCrToSeniorCitizen = nDetails.janajatiCrToSeniorCitizen;
		this.madhesiCrToSeniorCitizen = nDetails.madhesiCrToSeniorCitizen;
		this.brahminCrToSeniorCitizen = nDetails.brahminCrToSeniorCitizen;
		this.crToSeniorCitizenSource = nDetails.crToSeniorCitizenSource;
		this.crToSeniorCitizenSourceOthers = nDetails.crToSeniorCitizenSourceOthers;
		this.maleCrToMinors = nDetails.maleCrToMinors;
		this.femaleCrToMinors = nDetails.femaleCrToMinors;
		this.dalitCrToMinors = nDetails.dalitCrToMinors;
		this.ethnicMinoritiesCrToMinors = nDetails.ethnicMinoritiesCrToMinors;
		this.janajatiCrToMinors = nDetails.janajatiCrToMinors;
		this.madhesiCrToMinors = nDetails.madhesiCrToMinors;
		this.brahminCrToMinors = nDetails.brahminCrToMinors;
		this.crToMinorsSource = nDetails.crToMinorsSource;
		this.crToMinorsSourceOthers = nDetails.crToMinorsSourceOthers;
		this.maleCrUnder47Part2 = nDetails.maleCrUnder47Part2;
		this.femaleCrUnder47Part2 = nDetails.femaleCrUnder47Part2;
		this.dalitCrUnder47Part2 = nDetails.dalitCrUnder47Part2;
		this.ethnicMinoritiesCrUnder47Part2 = nDetails.ethnicMinoritiesCrUnder47Part2;
		this.janajatiCrUnder47Part2 = nDetails.janajatiCrUnder47Part2;
		this.madhesiCrUnder47Part2 = nDetails.madhesiCrUnder47Part2;
		this.brahminCrUnder47Part2 = nDetails.brahminCrUnder47Part2;
		this.crUnder47Part2Source = nDetails.crUnder47Part2Source;
		this.crUnder47Part2SourceOthers = nDetails.crUnder47Part2SourceOthers;
		this.maleCrToDivorce = nDetails.maleCrToDivorce;
		this.femaleCrToDivorce = nDetails.femaleCrToDivorce;
		this.dalitCrToDivorce = nDetails.dalitCrToDivorce;
		this.ethnicMinoritiesCrToDivorce = nDetails.ethnicMinoritiesCrToDivorce;
		this.janajatiCrToDivorce = nDetails.janajatiCrToDivorce;
		this.madhesiCrToDivorce = nDetails.madhesiCrToDivorce;
		this.brahminCrToDivorce = nDetails.brahminCrToDivorce;
		this.crToDivorceSource = nDetails.crToDivorceSource;
		this.crToDivorceSourceOthers = nDetails.crToDivorceSourceOthers;
		this.maleCrToBattery = nDetails.maleCrToBattery;
		this.femaleCrToBattery = nDetails.femaleCrToBattery;
		this.dalitCrToBattery = nDetails.dalitCrToBattery;
		this.ethnicMinoritiesCrToBattery = nDetails.ethnicMinoritiesCrToBattery;
		this.janajatiCrToBattery = nDetails.janajatiCrToBattery;
		this.madhesiCrToBattery = nDetails.madhesiCrToBattery;
		this.brahminCrToBattery = nDetails.brahminCrToBattery;
		this.crToBatterySource = nDetails.crToBatterySource;
		this.crToBatterySourceOthers = nDetails.crToBatterySourceOthers;
		this.maleCrToDefamation = nDetails.maleCrToDefamation;
		this.femaleCrToDefamation = nDetails.femaleCrToDefamation;
		this.dalitCrToDefamation = nDetails.dalitCrToDefamation;
		this.ethnicMinoritiesCrToDefamation = nDetails.ethnicMinoritiesCrToDefamation;
		this.janajatiCrToDefamation = nDetails.janajatiCrToDefamation;
		this.madhesiCrToDefamation = nDetails.madhesiCrToDefamation;
		this.brahminCrToDefamation = nDetails.brahminCrToDefamation;
		this.crToDefamationSource = nDetails.crToDefamationSource;
		this.crToDefamationSourceOthers = nDetails.crToDefamationSourceOthers;
		this.maleDsUnder47Part1 = nDetails.maleDsUnder47Part1;
		this.femaleDsUnder47Part1 = nDetails.femaleDsUnder47Part1;
		this.dalitDsUnder47Part1 = nDetails.dalitDsUnder47Part1;
		this.ethnicMinoritiesDsUnder47Part1 = nDetails.ethnicMinoritiesDsUnder47Part1;
		this.janajatiDsUnder47Part1 = nDetails.janajatiDsUnder47Part1;
		this.madhesiDsUnder47Part1 = nDetails.madhesiDsUnder47Part1;
		this.brahminDsUnder47Part1 = nDetails.brahminDsUnder47Part1;
		this.dsUnder47Part1Source = nDetails.dsUnder47Part1Source;
		this.dsUnder47Part1SourceOthers = nDetails.dsUnder47Part1SourceOthers;
		this.maleDsMedicationUnder47Part2 = nDetails.maleDsMedicationUnder47Part2;
		this.femaleDsMedicationUnder47Part2 = nDetails.femaleDsMedicationUnder47Part2;
		this.dalitDsMedicationUnder47Part2 = nDetails.dalitDsMedicationUnder47Part2;
		this.ethnicMinoritiesDsMedicationUnder47Part2 = nDetails.ethnicMinoritiesDsMedicationUnder47Part2;
		this.janajatiDsMedicationUnder47Part2 = nDetails.janajatiDsMedicationUnder47Part2;
		this.madhesiDsMedicationUnder47Part2 = nDetails.madhesiDsMedicationUnder47Part2;
		this.brahminDsMedicationUnder47Part2 = nDetails.brahminDsMedicationUnder47Part2;
		this.dsMedicationUnder47Part2Source = nDetails.dsMedicationUnder47Part2Source;
		this.dsMedicationUnder47Part2SourceOthers = nDetails.dsMedicationUnder47Part2SourceOthers;
		this.maleCrBeyondJurisdiction = nDetails.maleCrBeyondJurisdiction;
		this.femaleCrBeyondJurisdiction = nDetails.femaleCrBeyondJurisdiction;
		this.dalitCrBeyondJurisdiction = nDetails.dalitCrBeyondJurisdiction;
		this.ethnicMinoritiesCrBeyondJurisdiction = nDetails.ethnicMinoritiesCrBeyondJurisdiction;
		this.janajatiCrBeyondJurisdiction = nDetails.janajatiCrBeyondJurisdiction;
		this.madhesiCrBeyondJurisdiction = nDetails.madhesiCrBeyondJurisdiction;
		this.brahminCrBeyondJurisdiction = nDetails.brahminCrBeyondJurisdiction;
		this.crBeyondJurisdictionSource = nDetails.crBeyondJurisdictionSource;
		this.crBeyondJurisdictionSourceOthers = nDetails.crBeyondJurisdictionSourceOthers;
		this.maleCrRelevantInstitutions = nDetails.maleCrRelevantInstitutions;
		this.femaleCrRelevantInstitutions = nDetails.femaleCrRelevantInstitutions;
		this.dalitCrRelevantInstitutions = nDetails.dalitCrRelevantInstitutions;
		this.ethnicMinoritiesCrRelevantInstitutions = nDetails.ethnicMinoritiesCrRelevantInstitutions;
		this.janajatiCrRelevantInstitutions = nDetails.janajatiCrRelevantInstitutions;
		this.madhesiCrRelevantInstitutions = nDetails.madhesiCrRelevantInstitutions;
		this.brahminCrRelevantInstitutions = nDetails.brahminCrRelevantInstitutions;
		this.crRelevantInstitutionsSource = nDetails.crRelevantInstitutionsSource;
		this.crRelevantInstitutionsSourceOthers = nDetails.crRelevantInstitutionsSourceOthers;
		this.maleCrToLegalAidService = nDetails.maleCrToLegalAidService;
		this.femaleCrToLegalAidService = nDetails.femaleCrToLegalAidService;
		this.dalitCrToLegalAidService = nDetails.dalitCrToLegalAidService;
		this.ethnicMinoritiesCrToLegalAidService = nDetails.ethnicMinoritiesCrToLegalAidService;
		this.janajatiCrToLegalAidService = nDetails.janajatiCrToLegalAidService;
		this.madhesiCrToLegalAidService = nDetails.madhesiCrToLegalAidService;
		this.brahminCrToLegalAidService = nDetails.brahminCrToLegalAidService;
		this.crToLegalAidServiceSource = nDetails.crToLegalAidServiceSource;
		this.crToLegalAidServiceSourceOthers = nDetails.crToLegalAidServiceSourceOthers;
		this.maleCrToPsychoSocioCounselling = nDetails.maleCrToPsychoSocioCounselling;
		this.femaleCrToPsychoSocioCounselling = nDetails.femaleCrToPsychoSocioCounselling;
		this.dalitCrToPsychoSocioCounselling = nDetails.dalitCrToPsychoSocioCounselling;
		this.ethnicMinoritiesCrToPsychoSocioCounselling = nDetails.ethnicMinoritiesCrToPsychoSocioCounselling;
		this.janajatiCrToPsychoSocioCounselling = nDetails.janajatiCrToPsychoSocioCounselling;
		this.madhesiCrToPsychoSocioCounselling = nDetails.madhesiCrToPsychoSocioCounselling;
		this.brahminCrToPsychoSocioCounselling = nDetails.brahminCrToPsychoSocioCounselling;
		this.crToPsychoSocioCounsellingSource = nDetails.crToPsychoSocioCounsellingSource;
		this.crToPsychoSocioCounsellingSourceOthers = nDetails.crToPsychoSocioCounsellingSourceOthers;
		this.maleCrToMedicalInstitutions = nDetails.maleCrToMedicalInstitutions;
		this.femaleCrToMedicalInstitutions = nDetails.femaleCrToMedicalInstitutions;
		this.dalitCrToMedicalInstitutions = nDetails.dalitCrToMedicalInstitutions;
		this.ethnicMinoritiesCrToMedicalInstitutions = nDetails.ethnicMinoritiesCrToMedicalInstitutions;
		this.janajatiCrToMedicalInstitutions = nDetails.janajatiCrToMedicalInstitutions;
		this.madhesiCrToMedicalInstitutions = nDetails.madhesiCrToMedicalInstitutions;
		this.brahminCrToMedicalInstitutions = nDetails.brahminCrToMedicalInstitutions;
		this.crToMedicalInstitutionsSource = nDetails.crToMedicalInstitutionsSource;
		this.crToMedicalInstitutionsSourceOthers = nDetails.crToMedicalInstitutionsSourceOthers;
		this.maleCrAboutDisabilityCard = nDetails.maleCrAboutDisabilityCard;
		this.femaleCrAboutDisabilityCard = nDetails.femaleCrAboutDisabilityCard;
		this.dalitCrAboutDisabilityCard = nDetails.dalitCrAboutDisabilityCard;
		this.ethnicMinoritiesCrAboutDisabilityCard = nDetails.ethnicMinoritiesCrAboutDisabilityCard;
		this.janajatiCrAboutDisabilityCard = nDetails.janajatiCrAboutDisabilityCard;
		this.madhesiCrAboutDisabilityCard = nDetails.madhesiCrAboutDisabilityCard;
		this.brahminCrAboutDisabilityCard = nDetails.brahminCrAboutDisabilityCard;
		this.crAboutDisabilityCardSource = nDetails.crAboutDisabilityCardSource;
		this.crAboutDisabilityCardSourceOthers = nDetails.crAboutDisabilityCardSourceOthers;
		this.firRegisteredByMale = nDetails.firRegisteredByMale;
		this.firRegisteredByFemale = nDetails.firRegisteredByFemale;
		this.firRegisteredByDalit = nDetails.firRegisteredByDalit;
		this.firRegisteredByEthnicMinorities = nDetails.firRegisteredByEthnicMinorities;
		this.firRegisteredByJanajati = nDetails.firRegisteredByJanajati;
		this.firRegisteredByMadhesi = nDetails.firRegisteredByMadhesi;
		this.firRegisteredByBrahmin = nDetails.firRegisteredByBrahmin;
		this.firRegisteredSource = nDetails.firRegisteredSource;
		this.firRegisteredSourceOthers = nDetails.firRegisteredSourceOthers;
		this.gbvCaseProsecutedByCourt = nDetails.gbvCaseProsecutedByCourt;
		this.gbvCaseProsecutedByCourt = nDetails.gbvCaseProsecutedByCourt;
		this.otherCaseProsecutedByCourt = nDetails.otherCaseProsecutedByCourt;
		this.caseProsecutedByCourtSource = nDetails.caseProsecutedByCourtSource;
		this.caseProsecutedByCourtSourceOthers = nDetails.caseProsecutedByCourtSourceOthers;
		this.gbvCaseDecidedByCourt = nDetails.gbvCaseDecidedByCourt;
		this.tipCaseDecidedByCourt = nDetails.tipCaseDecidedByCourt;
		this.otherCaseDecidedByCourt = nDetails.otherCaseDecidedByCourt;
		this.caseDecidedByCourtSource = nDetails.caseDecidedByCourtSource;
		this.caseDecidedByCourtSourceOthers = nDetails.caseDecidedByCourtSourceOthers;
		this.status = nDetails.status;

		this.othersCrToWages = nDetails.othersCrToWages;
		this.othersCrToSeniorCitizen = nDetails.othersCrToSeniorCitizen;
		this.othersCrToMinors = nDetails.othersCrToMinors;
		this.othersCrUnder47Part2 = nDetails.othersCrUnder47Part2;
		this.othersCrToDivorce = nDetails.othersCrToDivorce;
		this.othersCrToBattery = nDetails.othersCrToBattery;
		this.othersCrToDefamation = nDetails.othersCrToDefamation;
		this.othersDsUnder47Part1 = nDetails.othersDsUnder47Part1;
		this.othersDsMedicationUnder47Part2 = nDetails.othersDsMedicationUnder47Part2;
		this.othersCrBeyondJurisdiction = nDetails.othersCrBeyondJurisdiction;
		this.othersCrRelevantInstitutions = nDetails.othersCrRelevantInstitutions;
		this.othersCrToLegalAidService = nDetails.othersCrToLegalAidService;
		this.othersCrToPsychoSocioCounselling = nDetails.othersCrToPsychoSocioCounselling;
		this.othersCrToMedicalInstitutions = nDetails.othersCrToMedicalInstitutions;
		this.othersCrAboutDisabilityCard = nDetails.othersCrAboutDisabilityCard;
		this.firRegisteredByOthers = nDetails.firRegisteredByOthers;

		this.muslimCrToWages = nDetails.muslimCrToWages;
		this.muslimCrToSeniorCitizen = nDetails.muslimCrToSeniorCitizen;
		this.muslimCrToMinors = nDetails.muslimCrToMinors;
		this.muslimCrUnder47Part2 = nDetails.muslimCrUnder47Part2;
		this.muslimCrToDivorce = nDetails.muslimCrToDivorce;
		this.muslimCrToBattery = nDetails.muslimCrToBattery;
		this.muslimCrToDefamation = nDetails.muslimCrToDefamation;
		this.muslimDsUnder47Part1 = nDetails.muslimDsUnder47Part1;
		this.muslimDsMedicationUnder47Part2 = nDetails.muslimDsMedicationUnder47Part2;
		this.muslimCrBeyondJurisdiction = nDetails.muslimCrBeyondJurisdiction;
		this.muslimCrRelevantInstitutions = nDetails.muslimCrRelevantInstitutions;
		this.muslimCrToLegalAidService = nDetails.muslimCrToLegalAidService;
		this.muslimCrToPsychoSocioCounselling = nDetails.muslimCrToPsychoSocioCounselling;
		this.muslimCrToMedicalInstitutions = nDetails.muslimCrToMedicalInstitutions;
		this.muslimCrAboutDisabilityCard = nDetails.muslimCrAboutDisabilityCard;
		this.firRegisteredByMuslim = nDetails.firRegisteredByMuslim;

		this.crAboutTip = nDetails.crAboutTip;
		this.crAboutPolygamy = nDetails.crAboutPolygamy;
		this.crAboutChildMarriage = nDetails.crAboutChildMarriage;
		this.crAboutForcedAction = nDetails.crAboutForcedAction;
		this.crAboutForcedActionIndustry = nDetails.crAboutForcedActionIndustry;
		this.crAboutUnnaturalIntercourse = nDetails.crAboutUnnaturalIntercourse;
		this.crAboutChildSexualAbuse = nDetails.crAboutChildSexualAbuse;
		this.crAboutSexualAbuse = nDetails.crAboutSexualAbuse;
		this.crAboutAccusedOfWitchcraft = nDetails.crAboutAccusedOfWitchcraft;
		this.crAboutDomesticViolence = nDetails.crAboutDomesticViolence;
		this.otherCrAboutWomenAndChildren = nDetails.otherCrAboutWomenAndChildren;
		this.crToWomenAndChildrenSource = nDetails.crToWomenAndChildrenSource;
		this.crToWomenAndChildrenSourceOthers = nDetails.crToWomenAndChildrenSourceOthers;
		
		this.crAboutTipHumanOrganTransplantation = nDetails.crAboutTipHumanOrganTransplantation;
		this.crAboutForcedTip = nDetails.crAboutForcedTip;
		this.crAboutBeatenAndMiscarried = nDetails.crAboutBeatenAndMiscarried;
		this.crAboutThrowingAliveChild = nDetails.crAboutThrowingAliveChild;
		this.crAboutKidnappingAndRape = nDetails.crAboutKidnappingAndRape;
		this.crAboutDutyByForce = nDetails.crAboutDutyByForce;
		this.crAboutAbductionAndDuty = nDetails.crAboutAbductionAndDuty;
		this.otherCrMiscellaneous = nDetails.otherCrMiscellaneous;
		this.crMiscellaneousSource = nDetails.crMiscellaneousSource;
		this.crMiscellaneousSourceOthers = nDetails.crMiscellaneousSourceOthers;
		
		this.otherEthnicityCrToWages = nDetails.otherEthnicityCrToWages;
		this.otherEthnicityCrToSeniorCitizen = nDetails.otherEthnicityCrToSeniorCitizen;
		this.otherEthnicityCrToMinors = nDetails.otherEthnicityCrToMinors;
		this.otherEthnicityCrUnder47Part2 = nDetails.otherEthnicityCrUnder47Part2;
		this.otherEthnicityCrToDivorce = nDetails.otherEthnicityCrToDivorce;
		this.otherEthnicityCrToBattery = nDetails.otherEthnicityCrToBattery;
		this.otherEthnicityCrToDefamation = nDetails.otherEthnicityCrToDefamation;
		this.otherEthnicityDsUnder47Part1 = nDetails.otherEthnicityDsUnder47Part1;
		this.otherEthnicityDsMedicationUnder47Part2 = nDetails.otherEthnicityDsMedicationUnder47Part2;
		this.otherEthnicityCrBeyondJurisdiction = nDetails.otherEthnicityCrBeyondJurisdiction;
		this.otherEthnicityCrRelevantInstitutions = nDetails.otherEthnicityCrRelevantInstitutions;
		this.otherEthnicityCrToLegalAidService = nDetails.otherEthnicityCrToLegalAidService;
		this.otherEthnicityCrToPsychoSocioCounselling = nDetails.otherEthnicityCrToPsychoSocioCounselling;
		this.otherEthnicityCrToMedicalInstitutions = nDetails.otherEthnicityCrToMedicalInstitutions;
		this.otherEthnicityCrAboutDisabilityCard = nDetails.otherEthnicityCrAboutDisabilityCard;
		this.firRegisteredByOtherEthnicity = nDetails.firRegisteredByOtherEthnicity;
		
	}

	private LocalDate synchronizedDate;
}
