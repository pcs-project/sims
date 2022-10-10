package com.pcs.itmis.labourMigration.entity;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LABOUR_MIGRATION_CASE_FORM")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabourMigrationCaseForm {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long labourMigrationCaseFormId;

	private String firstName;

	private String middleName;

	private String lastName;

	private String gender;

	private String ageGroup;
	private String age;

	private String maritalStatus;

	private String noOfDaughter;

	private String noOfSon;

	private String educationLevel;

	private String skills;

	private String certificates;

	private String haveReceivedLoanForReIntegration;

	private String destOfMigration;

	private String reasonForMigration;

//	private String countryName;
//
//	private String stayYear;
//
//	private String stayMonth;

	private String empBeforeFLM;

	private String empBeforeFLMPlace;

	private LocalDate empBeforeFLMDate;

	private String empAfterFLM;

	private String empAfterFLMPlace;

	private LocalDate empAfterFLMDate;

	private String noDependentFamily;

	private String incomeRange;

	private String remittanceTransferMethod;

	private String issuesDuringMigration;

	private String salaryRangeDuringMigration;

	private String remittance;

	private String amtPaidToManpower;

	private String visaType;

	private String futurePlans;

	private String occFamily;

	private String transitRoutes;

	private String entryBy;

	private LocalDate entryDate;

	@OneToOne(mappedBy = "labourMigrationCaseForm", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private MigrantAddress migrantAddress;

	@OneToOne(mappedBy = "labourMigrationCaseForm", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private AgentDetails agentDetails;

	public void copyData(LabourMigrationCaseForm labourMigrationCaseForm) {
		this.firstName = labourMigrationCaseForm.firstName;
		this.middleName = labourMigrationCaseForm.middleName;
		this.lastName = labourMigrationCaseForm.lastName;
		this.gender = labourMigrationCaseForm.gender;
		this.ageGroup = labourMigrationCaseForm.ageGroup;
		this.age = labourMigrationCaseForm.age;
		this.maritalStatus = labourMigrationCaseForm.maritalStatus;
		this.noOfDaughter = labourMigrationCaseForm.noOfDaughter;
		this.noOfSon = labourMigrationCaseForm.noOfSon;
		this.educationLevel = labourMigrationCaseForm.educationLevel;
		this.skills = labourMigrationCaseForm.skills;
		this.certificates = labourMigrationCaseForm.certificates;
		this.haveReceivedLoanForReIntegration = labourMigrationCaseForm.haveReceivedLoanForReIntegration;
		this.destOfMigration = labourMigrationCaseForm.destOfMigration;
		this.reasonForMigration = labourMigrationCaseForm.reasonForMigration;
//		this.countryName = labourMigrationCaseForm.countryName;
//		this.stayYear = labourMigrationCaseForm.stayYear;
//		this.stayMonth = labourMigrationCaseForm.stayMonth;
		this.empBeforeFLM = labourMigrationCaseForm.empBeforeFLM;
		this.empBeforeFLMPlace = labourMigrationCaseForm.empBeforeFLMPlace;
		this.empBeforeFLMDate = labourMigrationCaseForm.empBeforeFLMDate;
		this.empAfterFLM = labourMigrationCaseForm.empAfterFLM;
		this.empAfterFLMPlace = labourMigrationCaseForm.empAfterFLMPlace;
		this.empAfterFLMDate = labourMigrationCaseForm.empAfterFLMDate;
		this.noDependentFamily = labourMigrationCaseForm.noDependentFamily;
		this.incomeRange = labourMigrationCaseForm.incomeRange;
		this.remittanceTransferMethod = labourMigrationCaseForm.remittanceTransferMethod;
		this.issuesDuringMigration = labourMigrationCaseForm.issuesDuringMigration;
		this.salaryRangeDuringMigration = labourMigrationCaseForm.salaryRangeDuringMigration;
		this.remittance = labourMigrationCaseForm.remittance;
		this.amtPaidToManpower = labourMigrationCaseForm.amtPaidToManpower;
		this.visaType = labourMigrationCaseForm.visaType;
		this.futurePlans = labourMigrationCaseForm.futurePlans;
		this.occFamily = labourMigrationCaseForm.incomeRange;
		this.transitRoutes = labourMigrationCaseForm.occFamily;


	}
	
	private LocalDate synchronizedDate;
	
	 private LocalDate lastModifiedDate;
	 
	 @OneToMany(fetch=FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "labourMigrationCaseForm", orphanRemoval = true)
	 private Set<DurationOfStay> durationOfStayList;
	 

}
