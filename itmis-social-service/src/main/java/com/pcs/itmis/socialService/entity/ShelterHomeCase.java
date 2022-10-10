package com.pcs.itmis.socialService.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SHELTER_HOME_CASE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShelterHomeCase {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long shelterHomeCaseId;

	private String tipCase;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "shelterHomeCase")
	@PrimaryKeyJoinColumn
	private ShelterHomeTip tipDetails;
	private String gbvCase;

	private String homeName;
	private String homeProvince;
	private String homeDistrict;
	private String homeMunicipality;
	private String homeWardNo;

	private String firstName;
	private String middleName;
	private String lastName;

	private String permanentProvince;
	private String permanentDistrict;
	private String permanentMunicipality;
	private String permanentWardNo;

	private String gender;
	private String ageGroup;
	private String age;
	private String caste;

	// disability
	private String disability;
	private String typesOfDisability;

	private String educationLevel;
	private String maritalStatus;

	// No of children
	private String noOfSon;
	private String noOfDaughter;

	private String occupation;
	private String yearsOfExperience;

	// rescued from
	private String rescuedFromProvince;
	private String rescuedFromDistrict;
	private String rescuedFromMunicipality;
	private String rescuedFromWardNo;

	// rescued by
	private String rescuedByName;
	private String rescuedByOrganization;
	private String rescuedByCase;

	// in case of rescued
	private String dateOfEntry;
	private String dateOfExit;
	private String period;
	private String rescuedShelterService;
	private String rescuedCaseType;

	// in case of vulnerable
	private String vulnerableShelterService;
	private String suspects;
	private String reasonForLeavingHome;
	private String serviceProvider;
	private String physicalState;
	private String mentalStatus;
	private String vulnerableCase;

	private String status;
	private String entryBy;
	private LocalDate entryDate;

	private String violenceType;
	private String violenceTypeDetail;
	private Long userOrganization;

	public void copyData(ShelterHomeCase nDetails) {
		this.homeName = nDetails.homeName;
		this.homeProvince = nDetails.homeProvince;
		this.homeDistrict = nDetails.homeDistrict;
		this.homeMunicipality = nDetails.homeMunicipality;
		this.homeWardNo = nDetails.homeWardNo;
		this.firstName = nDetails.firstName;
		this.middleName = nDetails.middleName;
		this.lastName = nDetails.lastName;
		this.permanentProvince = nDetails.permanentProvince;
		this.permanentDistrict = nDetails.permanentDistrict;
		this.permanentMunicipality = nDetails.permanentMunicipality;
		this.permanentWardNo = nDetails.permanentWardNo;
		this.tipCase = nDetails.tipCase;
		this.gbvCase = nDetails.gbvCase;
		this.gender = nDetails.gender;
		this.ageGroup = nDetails.ageGroup;
		this.age = nDetails.age;
		this.caste = nDetails.caste;
		this.disability = nDetails.disability;
		this.typesOfDisability = nDetails.typesOfDisability;
		this.educationLevel = nDetails.educationLevel;
		this.maritalStatus = nDetails.maritalStatus;
		this.noOfSon = nDetails.noOfSon;
		this.noOfDaughter = nDetails.noOfDaughter;
		this.occupation = nDetails.occupation;
		this.yearsOfExperience = nDetails.yearsOfExperience;
		this.rescuedFromProvince = nDetails.rescuedFromProvince;
		this.rescuedFromDistrict = nDetails.rescuedFromDistrict;
		this.rescuedFromMunicipality = nDetails.rescuedFromMunicipality;
		this.rescuedFromWardNo = nDetails.rescuedFromWardNo;
		this.rescuedByName = nDetails.rescuedByName;
		this.rescuedByOrganization = nDetails.rescuedByOrganization;
		this.rescuedByCase = nDetails.rescuedByCase;
		this.dateOfEntry = nDetails.dateOfEntry;
		this.dateOfExit = nDetails.dateOfExit;
		this.period = nDetails.period;
		this.rescuedShelterService = nDetails.rescuedShelterService;
		this.rescuedCaseType = nDetails.rescuedCaseType;
		this.vulnerableShelterService = nDetails.vulnerableShelterService;
		this.suspects = nDetails.suspects;
		this.reasonForLeavingHome = nDetails.reasonForLeavingHome;
		this.serviceProvider = nDetails.serviceProvider;
		this.physicalState = nDetails.physicalState;
		this.mentalStatus = nDetails.mentalStatus;
		this.vulnerableCase = nDetails.vulnerableCase;
		this.tipDetails = nDetails.tipDetails;
		this.status = nDetails.status;

		this.violenceType = nDetails.violenceType;
		this.violenceTypeDetail = nDetails.violenceTypeDetail;
	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;
}
