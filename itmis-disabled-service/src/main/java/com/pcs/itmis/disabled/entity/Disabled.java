package com.pcs.itmis.disabled.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Digits;

import com.pcs.itmis.disabled.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DISABLED")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Disabled {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long disabledId;

	private String fiscalYear;
	private String quarter;

	private Long maleRecSkillTraining;
	private Long femaleRecSkillTraining;
	private Long othersRecSkillTraining;
	@Convert(converter = StringListConverter.class)
	private List<String> disabledPeopleRecSkillSource;
	private String disabledPeopleRecSkillSourceOthers;

	private Long totDisabledRehabCenter;
	@Convert(converter = StringListConverter.class)
	private List<String> totDisabledRehabCenterSource;
	private String totDisabledRehabCenterSourceOthers;

	private Long disabledMaleReceivingServices;
	private Long disabledFemaleReceivingServices;
	private Long disabledOthersReceivingServices;
	private Long disabledChildrenReceivingServices;
	private Long disabledAdultReceivingServices;
	private Long disabledSeniorCitizenReceivingServices;
	private Long visuallyImpairedReceivingServices;
	private Long hearingImpairedReceivingServices;
	private Long physicallyDisabledReceivingServices;
//	private Long partiallyVisuallyImpairedReceivingServices;
//	private Long fullyVisuallyImpairedReceivingServices;
//	private Long partiallyDeafReceivingServices;
//	private Long deafReceivingServices;
	private Long deafBlindReceivingServices;
	private Long speechAndHearingReceivingServices;
	private Long mentalDisabilityReceivingServices;
	private Long intellectuallyDisabledReceivingServices;
	private Long hemopheliaReceivingServices;
	private Long autismReceivingServices;
	private Long multipleReceivingServices;
	@Convert(converter = StringListConverter.class)
	private List<String> disabledReceivingServicesSource;
	private String disabledReceivingServicesSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal budgetAllocatedForDisabled;
	@Convert(converter = StringListConverter.class)
	private List<String> budgetAllocatedForDisabledSource;
	private String budgetAllocatedForDisabledSourceOthers;

//	private Long disabledJobByEthnicity;
//	private Long disabledJobByAge;
//	private Long disabledJobByGender;
//	private Long disabledJobByType;
	@Digits(integer=3, fraction=2)
	private BigDecimal perOfDisPeopJob;
	@Convert(converter = StringListConverter.class)
	private List<String> disabledJobSource;
	private String disabledJobSourceOthers;
	

	private String status;
	private String entryBy;
	private Long userOrganization;
	
	private LocalDate entryDate;
	
	private LocalDate lastModifiedDate;
	private String remarks;

	@OneToOne(mappedBy = "disabled", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private CategoryKa categoryKa;
	
	@OneToOne(mappedBy = "disabled", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private CategoryKha categoryKha;
	
	
	@OneToOne(mappedBy = "disabled", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private CategoryGa categoryGa;
	
	
	@OneToOne(mappedBy = "disabled", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private CategoryGha categoryGha;

	private Long disabledAffectedByCalamities;
	@Convert(converter = StringListConverter.class)
	private List<String> disabledAffectedByCalamitiesSource;
	private String disabledAffectedByCalamitiesSourceOthers;

	public void copyData(Disabled nDetails) {
//    this.disabledMale = nDetails.disabledMale;
//    this.disabledFemale = nDetails.disabledFemale;
//    this.disableddisabled = nDetails.disableddisabled;
//    this.disabledAdult = nDetails.disabledAdult;
//    this.disabledSeniorCitizen = nDetails.disabledSeniorCitizen;
//    this.physicallyDisabled = nDetails.physicallyDisabled;
//    this.partiallyVisuallyImpaired = nDetails.partiallyVisuallyImpaired;
//    this.fullyVisuallyImpaired = nDetails.fullyVisuallyImpaired;
//    this.partiallyDeaf = nDetails.partiallyDeaf;
//    this.deaf = nDetails.deaf;
//    this.deafBlind = nDetails.deafBlind;
//    this.speechAndHearing = nDetails.speechAndHearing;
//    this.mentalDisability = nDetails.mentalDisability;
//    this.intellectuallyDisabled = nDetails.intellectuallyDisabled;
//    this.hemophelia = nDetails.hemophelia;
//    this.autism = nDetails.autism;
//    this.multiple = nDetails.multiple;
//    this.totDisabledPeopleSource = nDetails.totDisabledPeopleSource;
		this.maleRecSkillTraining = nDetails.maleRecSkillTraining;
		this.femaleRecSkillTraining = nDetails.femaleRecSkillTraining;
		this.disabledPeopleRecSkillSource = nDetails.disabledPeopleRecSkillSource;
		this.disabledPeopleRecSkillSourceOthers = nDetails.disabledPeopleRecSkillSourceOthers;
		this.othersRecSkillTraining=nDetails.othersRecSkillTraining;
//    this.disabledMaleReceivingSSA = nDetails.disabledMaleReceivingSSA;
//    this.disabledFemaleReceivingSSA = nDetails.disabledFemaleReceivingSSA;
//    this.disableddisabledReceivingSSA = nDetails.disableddisabledReceivingSSA;
//    this.disabledAdultReceivingSSA = nDetails.disabledAdultReceivingSSA;
//    this.disabledSeniorCitizenReceivingSSA = nDetails.disabledSeniorCitizenReceivingSSA;
//    this.physicallyDisabledReceivingSSA = nDetails.physicallyDisabledReceivingSSA;
//    this.partiallyVisuallyImpairedReceivingSSA = nDetails.partiallyVisuallyImpairedReceivingSSA;
//    this.fullyVisuallyImpairedReceivingSSA = nDetails.fullyVisuallyImpairedReceivingSSA;
//    this.partiallyDeafReceivingSSA = nDetails.partiallyDeafReceivingSSA;
//    this.deafReceivingSSA = nDetails.deafReceivingSSA;
//    this.deafBlindReceivingSSA = nDetails.deafBlindReceivingSSA;
//    this.speechAndHearingReceivingSSA = nDetails.speechAndHearingReceivingSSA;
//    this.mentalDisabilityReceivingSSA = nDetails.mentalDisabilityReceivingSSA;
//    this.intellectuallyDisabledReceivingSSA = nDetails.intellectuallyDisabledReceivingSSA;
//    this.hemopheliaReceivingSSA = nDetails.hemopheliaReceivingSSA;
//    this.autismReceivingSSA = nDetails.autismReceivingSSA;
//    this.multipleReceivingSSA = nDetails.multipleReceivingSSA;
//    this.disabledReceivingSSASource = nDetails.disabledReceivingSSASource;
		this.totDisabledRehabCenter = nDetails.totDisabledRehabCenter;
		this.totDisabledRehabCenterSource = nDetails.totDisabledRehabCenterSource;
		this.totDisabledRehabCenterSourceOthers = nDetails.totDisabledRehabCenterSourceOthers;
		this.disabledMaleReceivingServices = nDetails.disabledMaleReceivingServices;
		this.disabledFemaleReceivingServices = nDetails.disabledFemaleReceivingServices;
		this.disabledOthersReceivingServices = nDetails.disabledOthersReceivingServices;
		this.disabledChildrenReceivingServices = nDetails.disabledChildrenReceivingServices;
		this.disabledAdultReceivingServices = nDetails.disabledAdultReceivingServices;
		this.disabledSeniorCitizenReceivingServices = nDetails.disabledSeniorCitizenReceivingServices;
		this.physicallyDisabledReceivingServices = nDetails.physicallyDisabledReceivingServices;
//		this.partiallyVisuallyImpairedReceivingServices = nDetails.partiallyVisuallyImpairedReceivingServices;
//		this.fullyVisuallyImpairedReceivingServices = nDetails.fullyVisuallyImpairedReceivingServices;
//		this.partiallyDeafReceivingServices = nDetails.partiallyDeafReceivingServices;
//		this.deafReceivingServices = nDetails.deafReceivingServices;
		this.deafBlindReceivingServices = nDetails.deafBlindReceivingServices;
		this.speechAndHearingReceivingServices = nDetails.speechAndHearingReceivingServices;
		this.mentalDisabilityReceivingServices = nDetails.mentalDisabilityReceivingServices;
		this.intellectuallyDisabledReceivingServices = nDetails.intellectuallyDisabledReceivingServices;
		this.hemopheliaReceivingServices = nDetails.hemopheliaReceivingServices;
		this.autismReceivingServices = nDetails.autismReceivingServices;
		this.multipleReceivingServices = nDetails.multipleReceivingServices;
		this.disabledReceivingServicesSource = nDetails.disabledReceivingServicesSource;
		this.disabledReceivingServicesSourceOthers = nDetails.disabledReceivingServicesSourceOthers;
		this.budgetAllocatedForDisabled = nDetails.budgetAllocatedForDisabled;
		this.budgetAllocatedForDisabledSource = nDetails.budgetAllocatedForDisabledSource;
		this.budgetAllocatedForDisabledSourceOthers = nDetails.budgetAllocatedForDisabledSourceOthers;
//		this.disabledJobByEthnicity = nDetails.disabledJobByEthnicity;
//		this.disabledJobByAge = nDetails.disabledJobByAge;
//		this.disabledJobByGender = nDetails.disabledJobByGender;
//		this.disabledJobByType = nDetails.disabledJobByType;
		this.disabledJobSource = nDetails.disabledJobSource;
		this.disabledJobSourceOthers = nDetails.disabledJobSourceOthers;
		this.status = nDetails.status;
		this.perOfDisPeopJob= nDetails.perOfDisPeopJob;
		this.visuallyImpairedReceivingServices= nDetails.visuallyImpairedReceivingServices;
		this.hearingImpairedReceivingServices= nDetails.hearingImpairedReceivingServices;
		
		this.disabledAffectedByCalamities = nDetails.disabledAffectedByCalamities;
		this.disabledAffectedByCalamitiesSource = nDetails.disabledAffectedByCalamitiesSource;
		this.disabledAffectedByCalamitiesSourceOthers = nDetails.disabledAffectedByCalamitiesSourceOthers;
	}

	
	
	private LocalDate synchronizedDate;
}
