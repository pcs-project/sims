package com.pcs.itmis.labourMigration.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "agent_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "labourMigrationCaseForm")
public class AgentDetails {
	
	@Id
	@Column(name = "labourMigrationCaseFormId")
	private Long labourMigrationCaseFormId;

	@OneToOne
	@MapsId
	@JoinColumn(name = "labourMigrationCaseFormId")
	@JsonBackReference
	private LabourMigrationCaseForm labourMigrationCaseForm;
	
	private String firstName;

	private String middleName;

	private String lastName;
	
	private String contactNumber;
	
	private String recAgencyName;
	
	private String recAgencyContactNo;
	
	private String recAgencyEmail;
	
	private String recAgencyWebsite;
	
	private String chgAmtFLM;
	
	private String receiptAmtPaid;
	
	private LocalDate departureDate;
	
	private LocalDate arrivalDate;
	
	private String documentation;
	
//	Destination Company Details
	
	private String destinationCompanyName;
	
	private String destinationCompanyphoneNo;
	
	private String destinationCompanyEmail;
	
	private String destinationCompanyWebsite;
	
	private String destinationCompanyAddress;
	
//	
	
	private String formalContract;
	
	private String workingSector;
	
	private String salaryAmt;
	
	private String salaryCurrency;
	
	
	private String workingHours;
	
	private String receivingShelterSupport;
	
	private String relWithAgent;
	
	private String rehabProvAfterDisability;
	
	private String receivedHelpFromWelfareFunds;
	
	private String caseStatus;
	
	private String recAgencyProvince;
	
	private String recAgencyDistrict;
	
	private String recAgencyMunicipality;
	
	private String recAgencyWardNo;
	
	
	private String entryBy;

	private LocalDate entryDate;

	public void copyData(AgentDetails nAgentDetails) {
		this.firstName = nAgentDetails.firstName;
		this.middleName = nAgentDetails.middleName;
		this.lastName = nAgentDetails.lastName;
		this.contactNumber = nAgentDetails.contactNumber;
		this.recAgencyName = nAgentDetails.recAgencyName;
		this.recAgencyContactNo = nAgentDetails.recAgencyContactNo;
		this.recAgencyEmail = nAgentDetails.recAgencyEmail;
		this.recAgencyWebsite = nAgentDetails.recAgencyWebsite;
		this.chgAmtFLM = nAgentDetails.chgAmtFLM;
		this.receiptAmtPaid = nAgentDetails.receiptAmtPaid;
		this.departureDate = nAgentDetails.departureDate;
		this.arrivalDate = nAgentDetails.arrivalDate;
		this.documentation = nAgentDetails.documentation;
		this.destinationCompanyName = nAgentDetails.destinationCompanyName;
		this.destinationCompanyphoneNo = nAgentDetails.destinationCompanyphoneNo;
		this.destinationCompanyEmail = nAgentDetails.destinationCompanyEmail;
		this.destinationCompanyWebsite = nAgentDetails.destinationCompanyWebsite;
		this.destinationCompanyAddress = nAgentDetails.destinationCompanyAddress;
		this.formalContract = nAgentDetails.formalContract;
		this.workingSector = nAgentDetails.workingSector;
		this.salaryAmt = nAgentDetails.salaryAmt;
		this.salaryCurrency = nAgentDetails.salaryCurrency;
		this.workingHours = nAgentDetails.workingHours;
		this.receivingShelterSupport = nAgentDetails.documentation;
		this.relWithAgent = nAgentDetails.relWithAgent;
		this.rehabProvAfterDisability = nAgentDetails.rehabProvAfterDisability;
		this.receivedHelpFromWelfareFunds = nAgentDetails.receivedHelpFromWelfareFunds;
		this.caseStatus = nAgentDetails.caseStatus;
		this.recAgencyProvince = nAgentDetails.recAgencyProvince;
		this.recAgencyDistrict = nAgentDetails.recAgencyDistrict;
		this.recAgencyMunicipality = nAgentDetails.recAgencyMunicipality;
		this.recAgencyWardNo = nAgentDetails.documentation;
		this.receivingShelterSupport = nAgentDetails.documentation;
		
	

	}
}
