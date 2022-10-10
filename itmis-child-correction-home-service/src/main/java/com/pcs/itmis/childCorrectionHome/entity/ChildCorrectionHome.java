package com.pcs.itmis.childCorrectionHome.entity;

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

import com.pcs.itmis.childCorrectionHome.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CHILD_CORRECTION_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChildCorrectionHome {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long childCorrectionHomeId;

	private String fiscalYear;
	private String quarter;

	private Long totChildCorrectionHome;
	@Convert(converter = StringListConverter.class)
	private List<String> totChildCorrectionHomeSource;
	private String totChildCorrectionHomeSourceOthers;

	private Long boysReceivingServicesInCch;
	private Long girlsReceivingServicesInCch;
	private Long othersReceivingServicesInCch;
	private Long dalitReceivingServicesInCch;
	private Long ethnicMinoritiesReceivingServicesInCch;
	private Long janajatiReceivingServicesInCch;
	private Long madhesiReceivingServicesInCch;
	private Long brahminReceivingServicesInCch;
	private Long muslimReceivingServicesInCch;
	private Long othersEthnicityReceivingServicesInCch;
	@Convert(converter = StringListConverter.class)
	private List<String> childReceivingServicesInCchSource;
	private String childReceivingServicesInCchSourceOthers;

	private Long boysRehabilitatedFromCch;
	private Long girlsRehabilitatedFromCch;
	private Long othersRehabilitatedFromCch;
	private Long rehabilitatedFromHome;
	private Long rehabilitatedFromOjt;
	private Long rehabilitatedFromOutOfCommunity;
	private Long rehabilitatedFromAdoption;
	private Long rehabilitatedFromFosterHome;
	@Convert(converter = StringListConverter.class)
	private List<String> childRehabilitatedSource;
	private String childRehabilitatedSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal budgetForChildCorrectionHome;
	@Convert(converter = StringListConverter.class)
	private List<String> budgetForChildCorrectionHomeSource;
	private String budgetForChildCorrectionHomeSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;

	private LocalDate entryDate;

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;
	private String remarks;


	public void copyData(ChildCorrectionHome nDetails) {
		this.totChildCorrectionHome = nDetails.totChildCorrectionHome;
		this.totChildCorrectionHomeSource = nDetails.totChildCorrectionHomeSource;
		this.totChildCorrectionHomeSourceOthers = nDetails.totChildCorrectionHomeSourceOthers;
		this.boysReceivingServicesInCch = nDetails.boysReceivingServicesInCch;
		this.girlsReceivingServicesInCch = nDetails.girlsReceivingServicesInCch;
		this.othersReceivingServicesInCch = nDetails.othersReceivingServicesInCch;
		this.dalitReceivingServicesInCch = nDetails.dalitReceivingServicesInCch;
		this.ethnicMinoritiesReceivingServicesInCch = nDetails.ethnicMinoritiesReceivingServicesInCch;
		this.janajatiReceivingServicesInCch = nDetails.janajatiReceivingServicesInCch;
		this.madhesiReceivingServicesInCch = nDetails.madhesiReceivingServicesInCch;
		this.brahminReceivingServicesInCch = nDetails.brahminReceivingServicesInCch;
		this.muslimReceivingServicesInCch = nDetails.muslimReceivingServicesInCch;
		this.othersEthnicityReceivingServicesInCch = nDetails.othersEthnicityReceivingServicesInCch;
		this.childReceivingServicesInCchSource = nDetails.childReceivingServicesInCchSource;
		this.childReceivingServicesInCchSourceOthers = nDetails.childReceivingServicesInCchSourceOthers;
		this.boysRehabilitatedFromCch = nDetails.boysRehabilitatedFromCch;
		this.girlsRehabilitatedFromCch = nDetails.girlsRehabilitatedFromCch;
		this.othersRehabilitatedFromCch = nDetails.othersRehabilitatedFromCch;
		this.rehabilitatedFromHome = nDetails.rehabilitatedFromHome;
		this.rehabilitatedFromOjt = nDetails.rehabilitatedFromOjt;
		this.rehabilitatedFromOutOfCommunity = nDetails.rehabilitatedFromOutOfCommunity;
		this.rehabilitatedFromAdoption = nDetails.rehabilitatedFromAdoption;
		this.rehabilitatedFromFosterHome = nDetails.rehabilitatedFromFosterHome;
		this.childRehabilitatedSource = nDetails.childRehabilitatedSource;
		this.childRehabilitatedSourceOthers = nDetails.childRehabilitatedSourceOthers;
		this.budgetForChildCorrectionHome = nDetails.budgetForChildCorrectionHome;
		this.budgetForChildCorrectionHomeSource = nDetails.budgetForChildCorrectionHomeSource;
		this.budgetForChildCorrectionHomeSourceOthers = nDetails.budgetForChildCorrectionHomeSourceOthers;
		this.status = nDetails.status;
	}
}
