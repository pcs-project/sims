package com.pcs.itmis.seniorCitizen.entity;

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

import com.pcs.itmis.seniorCitizen.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SENIOR_CITIZEN")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeniorCitizen {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long seniorCitizenId;

	private String fiscalYear;
	private String quarter;

	private Long seniorCitizenMale;
	private Long seniorCitizenFemale;
	private Long seniorCitizenOthers;
	private Long seniorCitizenAge60To68;
	private Long seniorCitizenAge68To80;
	private Long seniorCitizenAge81To99;
	private Long seniorCitizenAgeAbove99;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenSource;
	private String seniorCitizenSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal maleSeniorWithNoCare;
	@Digits(integer=3, fraction=2)
	private BigDecimal femaleSeniorWithNoCare;
	@Digits(integer=3, fraction=2)
	private BigDecimal othersSeniorWithNoCare;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenWithNoCareSource;
	private String seniorCitizenWithNoCareSourceOthers;

	private Long maleSeniorGettingSpa;
	private Long femaleSeniorGettingSpa;
	private Long othersSeniorGettingSpa;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenGettingSpaSource;
	private String seniorCitizenGettingSpaSourceOthers;

	private Long seniorCitizenRecevingPension;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenRecevingPensionSource;
	private String seniorCitizenRecevingPensionSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal seniorCitizenBudgetAllocated;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenBudgetAllocatedSource;
	private String seniorCitizenBudgetAllocatedSourceOthers;
	
	private Long seniorCitizenAffectedByCalamities;
	@Convert(converter = StringListConverter.class)
	private List<String> seniorCitizenAffectedByCalamitiesSource;
	private String seniorCitizenAffectedByCalamitiesSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;

	// @Temporal(TemporalType.DATE)
	private LocalDate entryDate;
	private String remarks;

	public void copyData(SeniorCitizen nDetails) {
		this.seniorCitizenMale = nDetails.seniorCitizenMale;
		this.seniorCitizenFemale = nDetails.seniorCitizenFemale;
		this.seniorCitizenOthers = nDetails.seniorCitizenOthers;
		this.seniorCitizenAge60To68 = nDetails.seniorCitizenAge60To68;
		this.seniorCitizenAge68To80 = nDetails.seniorCitizenAge68To80;
		this.seniorCitizenAge81To99 = nDetails.seniorCitizenAge81To99;
		this.seniorCitizenAgeAbove99 = nDetails.seniorCitizenAgeAbove99;
		this.seniorCitizenSource = nDetails.seniorCitizenSource;
		this.seniorCitizenSourceOthers = nDetails.seniorCitizenSourceOthers;
		this.maleSeniorWithNoCare = nDetails.maleSeniorWithNoCare;
		this.femaleSeniorWithNoCare = nDetails.femaleSeniorWithNoCare;
		this.othersSeniorWithNoCare = nDetails.othersSeniorWithNoCare;
		this.seniorCitizenWithNoCareSource = nDetails.seniorCitizenWithNoCareSource;
		this.seniorCitizenWithNoCareSourceOthers = nDetails.seniorCitizenWithNoCareSourceOthers;
		this.maleSeniorGettingSpa = nDetails.maleSeniorGettingSpa;
		this.femaleSeniorGettingSpa = nDetails.femaleSeniorGettingSpa;
		this.othersSeniorGettingSpa = nDetails.othersSeniorGettingSpa;
		this.seniorCitizenGettingSpaSource = nDetails.seniorCitizenGettingSpaSource;
		this.seniorCitizenGettingSpaSourceOthers = nDetails.seniorCitizenGettingSpaSourceOthers;
		this.seniorCitizenRecevingPension = nDetails.seniorCitizenRecevingPension;
		this.seniorCitizenRecevingPensionSource = nDetails.seniorCitizenRecevingPensionSource;
		this.seniorCitizenRecevingPensionSourceOthers = nDetails.seniorCitizenRecevingPensionSourceOthers;
		this.seniorCitizenBudgetAllocated = nDetails.seniorCitizenBudgetAllocated;
		this.seniorCitizenBudgetAllocatedSource = nDetails.seniorCitizenBudgetAllocatedSource;
		this.seniorCitizenBudgetAllocatedSourceOthers = nDetails.seniorCitizenBudgetAllocatedSourceOthers;
		
		this.seniorCitizenAffectedByCalamities = nDetails.seniorCitizenAffectedByCalamities;
		this.seniorCitizenAffectedByCalamitiesSource = nDetails.seniorCitizenAffectedByCalamitiesSource;
		this.seniorCitizenAffectedByCalamitiesSourceOthers = nDetails.seniorCitizenAffectedByCalamitiesSourceOthers;
		
		this.status = nDetails.status;

	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;

}
