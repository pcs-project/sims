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
@Table(name = "CHILD_HOME_CASE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChildHomeCase {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long childHomeCaseId;

	private String tipCase;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "childHomeCase")
	@PrimaryKeyJoinColumn
	private ChildHomeTip tipDetails;

	private String gbvCase;

	private String homeName;
	private String homeProvince;
	private String homeDistrict;
	private String homeMunicipality;
	private String homeWardNo;
	
	private String firstName;
	private String middleName;
	private String lastName;
	private String gender;
	private String ageGroup;
	private String age;
	private String caste;

	private String permanentProvince;
	private String permanentDistrict;
	private String permanentMunicipality;
	private String permanentWardNo;
	private String temporaryProvince;
	private String temporaryDistrict;
	private String temporaryMunicipality;
	private String temporaryWardNo;

	private String educationLevel;
	private String schoolName;
	private String admissionDate;

	// disability
	private String disability;
	private String typesOfDisability;

	// disease
	private String disease;
	private String diseaseDetail;

	private String parentGuardian;

	// rehabilitation
	private String rehabilitation;
	private String rehabilitatedTo;
	private String rehabilitatedToDetail;

	private String recommendedBy;
	private String orphanOrSingleParent;

//  private String investigationStatus;
//  private String investigationStatusDetail;
//  private String referralStatus;

	private String status;
	private String entryBy;
	private LocalDate entryDate;

	private String violenceType;
	private String violenceTypeDetail;
	private Long userOrganization;

	public void copyData(ChildHomeCase nDetails) {
		this.homeName = nDetails.homeName;
		this.homeProvince = nDetails.homeProvince;
		this.homeDistrict = nDetails.homeDistrict;
		this.homeMunicipality = nDetails.homeMunicipality;
		this.homeWardNo = nDetails.homeWardNo;
		this.tipCase = nDetails.tipCase;
		this.gbvCase = nDetails.gbvCase;
		this.firstName = nDetails.firstName;
		this.middleName = nDetails.middleName;
		this.lastName = nDetails.lastName;
		this.gender = nDetails.gender;
		this.ageGroup = nDetails.ageGroup;
		this.age = nDetails.age;
		this.caste = nDetails.caste;
		this.permanentProvince = nDetails.permanentProvince;
		this.permanentDistrict = nDetails.permanentDistrict;
		this.permanentMunicipality = nDetails.permanentMunicipality;
		this.permanentWardNo = nDetails.permanentWardNo;
		this.temporaryProvince = nDetails.temporaryProvince;
		this.temporaryDistrict = nDetails.temporaryDistrict;
		this.temporaryMunicipality = nDetails.temporaryMunicipality;
		this.temporaryWardNo = nDetails.temporaryWardNo;
		this.educationLevel = nDetails.educationLevel;
		this.schoolName = nDetails.schoolName;
		this.admissionDate = nDetails.admissionDate;
		this.disability = nDetails.disability;
		this.typesOfDisability = nDetails.typesOfDisability;
		this.disease = nDetails.disease;
		this.diseaseDetail = nDetails.diseaseDetail;
		this.parentGuardian = nDetails.parentGuardian;
		this.rehabilitation = nDetails.rehabilitation;
		this.rehabilitatedTo = nDetails.rehabilitatedTo;
		this.rehabilitatedToDetail = nDetails.rehabilitatedToDetail;
		this.recommendedBy = nDetails.recommendedBy;
		this.orphanOrSingleParent = nDetails.orphanOrSingleParent;
//    this.investigationStatus = nDetails.investigationStatus;
//    this.investigationStatusDetail = nDetails.investigationStatusDetail;
//    this.referralStatus = nDetails.referralStatus;
		this.violenceType = nDetails.violenceType;
		this.violenceTypeDetail = nDetails.violenceTypeDetail;
		this.tipDetails = nDetails.tipDetails;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;

}
