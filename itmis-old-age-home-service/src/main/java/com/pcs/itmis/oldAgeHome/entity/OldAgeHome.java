package com.pcs.itmis.oldAgeHome.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Digits;

import com.pcs.itmis.oldAgeHome.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "OLD_AGE_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OldAgeHome {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long oldAgeHomeId;

	private String fiscalYear;
	private String quarter;

	private Long totOldAgeHome;
	@Convert(converter = StringListConverter.class)
	private List<String> totOldAgeHomeSource;
	private String totOldAgeHomeSourceOthers;

	private Long maleCitizenReceivingServices;
	private Long femaleCitizenReceivingServices;
	private Long othersCitizenReceivingServices;
	private Long dalitReceivingServices;
	private Long ethnicMinoritiesReceivingServices;
	private Long janajatiReceivingServices;
	private Long madhesiReceivingServices;
	private Long brahminReceivingServices;
	private Long muslimReceivingServices;
	private Long othersEthnicityReceivingServices;
	@Convert(converter = StringListConverter.class)
	private List<String> citizenReceivingServicesSource;
	private String citizenReceivingServicesSourceOthers;

	private Long maleCitizenRehabilitated;
	private Long femaleCitizenRehabilitated;
	private Long othersCitizenRehabilitated;
	private Long citizenRehabilitatedByHome;
	private Long citizenRehabilitatedByRelatives;
	@Convert(converter = StringListConverter.class)
	private List<String> citizenRehabilitatedSource;
	private String citizenRehabilitatedSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal budgetForOldAgeHome;
	@Convert(converter = StringListConverter.class)
	private List<String> budgetForOldAgeHomeSource;
	private String budgetForOldAgeHomeSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;
	// @Temporal(TemporalType.DATE)
	private LocalDate entryDate;
	private String remarks;

	public void copyData(OldAgeHome nDetails) {
		this.totOldAgeHome = nDetails.totOldAgeHome;
		this.totOldAgeHomeSource = nDetails.totOldAgeHomeSource;
		this.totOldAgeHomeSourceOthers = nDetails.totOldAgeHomeSourceOthers;
		this.maleCitizenReceivingServices = nDetails.maleCitizenReceivingServices;
		this.femaleCitizenReceivingServices = nDetails.femaleCitizenReceivingServices;
		this.othersCitizenReceivingServices = nDetails.othersCitizenReceivingServices;
		this.dalitReceivingServices = nDetails.dalitReceivingServices;
		this.ethnicMinoritiesReceivingServices = nDetails.ethnicMinoritiesReceivingServices;
		this.janajatiReceivingServices = nDetails.janajatiReceivingServices;
		this.madhesiReceivingServices = nDetails.madhesiReceivingServices;
		this.brahminReceivingServices = nDetails.brahminReceivingServices;
		this.muslimReceivingServices = nDetails.muslimReceivingServices;
		this.othersEthnicityReceivingServices = nDetails.othersEthnicityReceivingServices;
		this.citizenReceivingServicesSource = nDetails.citizenReceivingServicesSource;
		this.citizenReceivingServicesSourceOthers = nDetails.citizenReceivingServicesSourceOthers;
		this.maleCitizenRehabilitated = nDetails.maleCitizenRehabilitated;
		this.femaleCitizenRehabilitated = nDetails.femaleCitizenRehabilitated;
		this.othersCitizenRehabilitated = nDetails.othersCitizenRehabilitated;
		this.citizenRehabilitatedByHome = nDetails.citizenRehabilitatedByHome;
		this.citizenRehabilitatedByRelatives = nDetails.citizenRehabilitatedByRelatives;
		this.citizenRehabilitatedSource = nDetails.citizenRehabilitatedSource;
		this.citizenRehabilitatedSourceOthers = nDetails.citizenRehabilitatedSourceOthers;
		this.budgetForOldAgeHome = nDetails.budgetForOldAgeHome;
		this.budgetForOldAgeHomeSource = nDetails.budgetForOldAgeHomeSource;
		this.budgetForOldAgeHomeSourceOthers = nDetails.budgetForOldAgeHomeSourceOthers;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;
}
