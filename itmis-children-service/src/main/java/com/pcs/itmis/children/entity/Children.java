package com.pcs.itmis.children.entity;

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

import com.pcs.itmis.children.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CHILDREN")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Children {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long childrenId;

	private String fiscalYear;
	private String quarter;

	private Long boysPopulation;
	private Long girlsPopulation;
	@Convert(converter = StringListConverter.class)
	private List<String> childrenPopSource;
	private String childrenPopSourceOthers;

	private Long boysBirthCertIsssued;
	private Long girlsBirthCertIsssued;
	@Convert(converter = StringListConverter.class)
	private List<String> birthCertIsssuedSource;
	private String birthCertIsssuedSourceOthers;

	private Long boysReceivingSSA;
	private Long girlsReceivingSSA;
	// private Long orphanReceivingSSA;
	private Long disabledReceivingSSA;
	@Convert(converter = StringListConverter.class)
	private List<String> childrenReceivingSSASource;
	private String childrenReceivingSSASourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal primarySchoolBoys;
	@Digits(integer=3, fraction=2)
	private BigDecimal primarySchoolGirls;
	@Convert(converter = StringListConverter.class)
	private List<String> primarySchoolEnrollSource;
	private String primarySchoolEnrollSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutBoys;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutGirls;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutDalit;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutEthnic;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutJanajati;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutMadhesi;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutBrahmin;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutMuslim;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutEthnicityOthers;
	@Convert(converter = StringListConverter.class)
	private List<String> secondaryDropoutSource;
	private String secondaryDropoutSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal outOfSchoolChildren;
	@Convert(converter = StringListConverter.class)
	private List<String> outOfSchoolChildrenSource;
	private String outOfSchoolChildrenSourceOthers;

	private Long boysEarlyMarriage;
	private Long girlsEarlyMarriage;
	private Long earlyElopedMarriage;
	private Long earlyArrangedMarriage;
	private Long totalEarlyMarriageByCase;
	@Convert(converter = StringListConverter.class)
	private List<String> earlyMarriageSource;
	private String earlyMarriageSourceOthers;

	private Long boysChildAbuse;
	private Long girlsChildAbuse;
	@Convert(converter = StringListConverter.class)
	private List<String> childAbuseSource;
	private String childAbuseSourceOthers;

	private Long orphanBoys;
	private Long orphanGirls;
	@Convert(converter = StringListConverter.class)
	private List<String> orphanChildrenSource;
	private String orphanChildrenSourceOthers;

	private Long streetBoys;
	private Long streetGirls;
	@Convert(converter = StringListConverter.class)
	private List<String> streetChildrenSource;
	private String streetChildrenSourceOthers;

	private Long boysMissing;
	private Long girlsMissing;
	@Convert(converter = StringListConverter.class)
	private List<String> missingChildrenSource;
	private String missingChildrenSourceOthers;

	private Long boysFound;
	private Long girlsFound;
	@Convert(converter = StringListConverter.class)
	private List<String> foundChildrenSource;
	private String foundChildrenSourceOthers;

	private Long childrenDevCenter;
	@Convert(converter = StringListConverter.class)
	private List<String> childDevCenterSource;
	private String childDevCenterSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal childrenBudgetAllocated;
	@Convert(converter = StringListConverter.class)
	private List<String> childBudgetAllocatedSource;
	private String childBudgetAllocatedSourceOthers;

	// Added later
	private Long othersPopulation;
	private Long othersBirthCertIsssued;
	private Long othersReceivingSSA;
	@Digits(integer=3, fraction=2)
	private BigDecimal primarySchoolOthers;
	@Digits(integer=3, fraction=2)
	private BigDecimal secondaryDropoutOthers;
	private Long othersEarlyMarriage;
	private Long othersChildAbuse;
	private Long orphanOthers;
	private Long streetOthers;
	private Long othersMissing;
	private Long othersFound;

	private Long childrenAffectedByCalamities;
	@Convert(converter = StringListConverter.class)
	private List<String> childrenAffectedByCalamitiesSource;
	private String childrenAffectedByCalamitiesSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;
	// @Temporal(TemporalType.DATE)
	private LocalDate entryDate;

	private String remarks;
	private LocalDate lastModifiedDate;


	public void copyData(Children nDetails) {
		this.boysPopulation = nDetails.boysPopulation;
		this.girlsPopulation = nDetails.girlsPopulation;
		this.childrenPopSource = nDetails.childrenPopSource;
		this.childrenPopSourceOthers = nDetails.childrenPopSourceOthers;
		this.boysBirthCertIsssued = nDetails.boysBirthCertIsssued;
		this.girlsBirthCertIsssued = nDetails.girlsBirthCertIsssued;
		this.birthCertIsssuedSource = nDetails.birthCertIsssuedSource;
		this.birthCertIsssuedSourceOthers = nDetails.birthCertIsssuedSourceOthers;
		this.boysReceivingSSA = nDetails.boysReceivingSSA;
		this.girlsReceivingSSA = nDetails.girlsReceivingSSA;
		// this.orphanReceivingSSA = nDetails.orphanReceivingSSA;
		this.disabledReceivingSSA = nDetails.disabledReceivingSSA;
		this.childrenReceivingSSASource = nDetails.childrenReceivingSSASource;
		this.childrenReceivingSSASourceOthers = nDetails.childrenReceivingSSASourceOthers;
		this.primarySchoolBoys = nDetails.primarySchoolBoys;
		this.primarySchoolGirls = nDetails.primarySchoolGirls;
		this.primarySchoolEnrollSource = nDetails.primarySchoolEnrollSource;
		this.primarySchoolEnrollSourceOthers = nDetails.primarySchoolEnrollSourceOthers;
		this.secondaryDropoutBoys = nDetails.secondaryDropoutBoys;
		this.secondaryDropoutGirls = nDetails.secondaryDropoutGirls;
		this.secondaryDropoutDalit = nDetails.secondaryDropoutDalit;
		this.secondaryDropoutEthnic = nDetails.secondaryDropoutEthnic;
		this.secondaryDropoutJanajati = nDetails.secondaryDropoutJanajati;
		this.secondaryDropoutMadhesi = nDetails.secondaryDropoutMadhesi;
		this.secondaryDropoutBrahmin = nDetails.secondaryDropoutBrahmin;
		this.secondaryDropoutSource = nDetails.secondaryDropoutSource;
		this.secondaryDropoutSourceOthers = nDetails.secondaryDropoutSourceOthers;
		this.outOfSchoolChildren = nDetails.outOfSchoolChildren;
		this.outOfSchoolChildrenSource = nDetails.outOfSchoolChildrenSource;
		this.outOfSchoolChildrenSourceOthers = nDetails.outOfSchoolChildrenSourceOthers;
		this.boysEarlyMarriage = nDetails.boysEarlyMarriage;
		this.girlsEarlyMarriage = nDetails.girlsEarlyMarriage;
		this.earlyElopedMarriage = nDetails.earlyElopedMarriage;
		this.earlyArrangedMarriage = nDetails.earlyArrangedMarriage;
		this.totalEarlyMarriageByCase = nDetails.totalEarlyMarriageByCase;
		this.earlyMarriageSource = nDetails.earlyMarriageSource;
		this.earlyMarriageSourceOthers = nDetails.earlyMarriageSourceOthers;
		this.boysChildAbuse = nDetails.boysChildAbuse;
		this.girlsChildAbuse = nDetails.girlsChildAbuse;
		this.childAbuseSource = nDetails.childAbuseSource;
		this.childAbuseSourceOthers = nDetails.childAbuseSourceOthers;
		this.orphanBoys = nDetails.orphanBoys;
		this.orphanGirls = nDetails.orphanGirls;
		this.orphanChildrenSource = nDetails.orphanChildrenSource;
		this.orphanChildrenSourceOthers = nDetails.orphanChildrenSourceOthers;
		this.streetBoys = nDetails.streetBoys;
		this.streetGirls = nDetails.streetGirls;
		this.streetChildrenSource = nDetails.streetChildrenSource;
		this.streetChildrenSourceOthers = nDetails.streetChildrenSourceOthers;
		this.boysMissing = nDetails.boysMissing;
		this.girlsMissing = nDetails.girlsMissing;
		this.missingChildrenSource = nDetails.missingChildrenSource;
		this.missingChildrenSourceOthers = nDetails.missingChildrenSourceOthers;
		this.boysFound = nDetails.boysFound;
		this.girlsFound = nDetails.girlsFound;
		this.foundChildrenSource = nDetails.foundChildrenSource;
		this.foundChildrenSourceOthers = nDetails.foundChildrenSourceOthers;
		this.childrenDevCenter = nDetails.childrenDevCenter;
		this.childDevCenterSource = nDetails.childDevCenterSource;
		this.childDevCenterSourceOthers = nDetails.childDevCenterSourceOthers;
		this.childrenBudgetAllocated = nDetails.childrenBudgetAllocated;
		this.childBudgetAllocatedSource = nDetails.childBudgetAllocatedSource;
		this.childBudgetAllocatedSourceOthers = nDetails.childBudgetAllocatedSourceOthers;
		this.status = nDetails.status;

		this.othersPopulation = nDetails.othersPopulation;
		this.othersBirthCertIsssued = nDetails.othersBirthCertIsssued;
		this.othersReceivingSSA = nDetails.othersReceivingSSA;
		this.primarySchoolOthers = nDetails.primarySchoolOthers;
		this.secondaryDropoutOthers = nDetails.secondaryDropoutOthers;
		this.othersEarlyMarriage = nDetails.othersEarlyMarriage;
		this.othersChildAbuse = nDetails.othersChildAbuse;
		this.orphanOthers = nDetails.orphanOthers;
		this.streetOthers = nDetails.streetOthers;
		this.othersMissing = nDetails.othersMissing;
		this.othersFound = nDetails.othersFound;
		this.secondaryDropoutMuslim = nDetails.secondaryDropoutMuslim;
		this.secondaryDropoutEthnicityOthers = nDetails.secondaryDropoutEthnicityOthers;
		this.childrenAffectedByCalamities = nDetails.childrenAffectedByCalamities;
		this.childrenAffectedByCalamitiesSource = nDetails.childrenAffectedByCalamitiesSource;
		this.childrenAffectedByCalamitiesSourceOthers = nDetails.childrenAffectedByCalamitiesSourceOthers;
	}

	private LocalDate synchronizedDate;
}
