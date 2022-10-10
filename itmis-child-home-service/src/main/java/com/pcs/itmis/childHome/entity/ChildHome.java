package com.pcs.itmis.childHome.entity;

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

import com.pcs.itmis.childHome.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CHILD_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChildHome {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long childHomeId;

	private String fiscalYear;
	private String quarter;

	private Long totChildHome;
	@Convert(converter = StringListConverter.class)
	private List<String> childHomeSource;
	private String childHomeSourceOthers;

	private Long boysReceivingServices;
	private Long girlsReceivingServices;
	private Long othersReceivingServices;
	private Long tipReceivingServices;
	private Long gbvReceivingServices;
	private Long trappedInAddictionReceivingServices;
	private Long drugAddictReceivingServices;
	private Long streetChildrenReceivingServices;
	private Long dalitReceivingServices;
	private Long ethnicMinoritiesReceivingServices;
	private Long janajatiReceivingServices;
	private Long madhesiReceivingServices;
	private Long brahminReceivingServices;
	private Long muslimReceivingServices;
	private Long othersEthnicityReceivingServices;
	@Convert(converter = StringListConverter.class)
	private List<String> childReceivingServicesSource;
	private String childReceivingServicesSourceOthers;

	private Long rehabilitatedFromHome;
	private Long rehabilitatedFromOjt;
	private Long rehabilitatedFromOutOfCommunity;
	private Long rehabilitatedFromAdoption;
	private Long rehabilitatedFromFosterHome;
	@Convert(converter = StringListConverter.class)
	private List<String> childRehabilitatedSource;
	private String childRehabilitatedSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal budgetForChildHome;
	@Convert(converter = StringListConverter.class)
	private List<String> budgetForChildHomeSource;
	private String budgetForChildHomeSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;

	private LocalDate entryDate;
	private LocalDate lastModifiedDate;
	private String remarks;

	public void copyData(ChildHome nDetails) {
		this.totChildHome = nDetails.totChildHome;
		this.childHomeSource = nDetails.childHomeSource;
		this.childHomeSourceOthers = nDetails.childHomeSourceOthers;
		this.boysReceivingServices = nDetails.boysReceivingServices;
		this.girlsReceivingServices = nDetails.girlsReceivingServices;
		this.othersReceivingServices = nDetails.othersReceivingServices;
		this.tipReceivingServices = nDetails.tipReceivingServices;
		this.gbvReceivingServices = nDetails.gbvReceivingServices;
		this.trappedInAddictionReceivingServices = nDetails.trappedInAddictionReceivingServices;
		this.drugAddictReceivingServices = nDetails.drugAddictReceivingServices;
		this.streetChildrenReceivingServices = nDetails.streetChildrenReceivingServices;
		this.dalitReceivingServices = nDetails.dalitReceivingServices;
		this.ethnicMinoritiesReceivingServices = nDetails.ethnicMinoritiesReceivingServices;
		this.janajatiReceivingServices = nDetails.janajatiReceivingServices;
		this.madhesiReceivingServices = nDetails.madhesiReceivingServices;
		this.brahminReceivingServices = nDetails.brahminReceivingServices;
		this.muslimReceivingServices = nDetails.muslimReceivingServices;
		this.othersEthnicityReceivingServices = nDetails.othersEthnicityReceivingServices;
		this.childReceivingServicesSource = nDetails.childReceivingServicesSource;
		this.childReceivingServicesSourceOthers = nDetails.childReceivingServicesSourceOthers;
		this.rehabilitatedFromHome = nDetails.rehabilitatedFromHome;
		this.rehabilitatedFromOjt = nDetails.rehabilitatedFromOjt;
		this.rehabilitatedFromOutOfCommunity = nDetails.rehabilitatedFromOutOfCommunity;
		this.rehabilitatedFromAdoption = nDetails.rehabilitatedFromAdoption;
		this.rehabilitatedFromFosterHome = nDetails.rehabilitatedFromFosterHome;
		this.childRehabilitatedSource = nDetails.childRehabilitatedSource;
		this.childRehabilitatedSourceOthers = nDetails.childRehabilitatedSourceOthers;
		this.budgetForChildHome = nDetails.budgetForChildHome;
		this.budgetForChildHomeSource = nDetails.budgetForChildHomeSource;
		this.budgetForChildHomeSourceOthers = nDetails.budgetForChildHomeSourceOthers;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;
}
