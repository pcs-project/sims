package com.pcs.itmis.socialService.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.pcs.itmis.socialService.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "OLD_AGE_HOME_CASE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OldAgeHomeCase {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long oldAgeHomeCaseId;

	private String homeName;
	private String homeProvince;
	private String homeDistrict;
	private String homeMunicipality;
	private String homeWardNo;

	private String firstName;
	private String middleName;
	private String lastName;

	private String photo;

	private String citizenshipNumber;
	private String nationalIdentificationNo;

	private String province;
	private String district;
	private String municipality;
	private String wardNo;

	private String gender;
	private String ageGroup;
	private String age;
	private String caste;
	private String educationLevel;

	// disability
	private String disability;
	private String typesOfDisability;

	// disease
	private String disease;
	private String diseaseDetail;

	private String caseType;
	private String fundedBy;
	private String reasonForStay;
	private String admissionDate;
	private String timeSpent;
	private String relatives;
	private String relativesDetail;

	private String dead;
	private String dateOfDeath;

	private String rehabilitatedToHome;
	private String receivingSocialAllowance;

	private String livingWithFamily;
	@Convert(converter = StringListConverter.class)
	private List<String> livingWithFamilyRelation;

	private String status;
	private String entryBy;
	private LocalDate entryDate;
	private Long userOrganization;

	public void copyData(OldAgeHomeCase nDetails) {
		this.homeName = nDetails.homeName;
		this.homeProvince = nDetails.homeProvince;
		this.homeDistrict = nDetails.homeDistrict;
		this.homeMunicipality = nDetails.homeMunicipality;
		this.homeWardNo = nDetails.homeWardNo;
		this.firstName = nDetails.firstName;
		this.middleName = nDetails.middleName;
		this.lastName = nDetails.lastName;
		this.citizenshipNumber = nDetails.citizenshipNumber;
		this.nationalIdentificationNo = nDetails.nationalIdentificationNo;
		this.province = nDetails.province;
		this.district = nDetails.district;
		this.municipality = nDetails.municipality;
		this.wardNo = nDetails.wardNo;
		this.gender = nDetails.gender;
		this.ageGroup = nDetails.ageGroup;
		this.age = nDetails.age;
		this.caste = nDetails.caste;
		this.educationLevel = nDetails.educationLevel;
		this.disability = nDetails.disability;
		this.typesOfDisability = nDetails.typesOfDisability;
		this.disease = nDetails.disease;
		this.diseaseDetail = nDetails.diseaseDetail;
		this.caseType = nDetails.caseType;
		this.fundedBy = nDetails.fundedBy;
		this.reasonForStay = nDetails.reasonForStay;
		this.admissionDate = nDetails.admissionDate;
		this.timeSpent = nDetails.timeSpent;
		this.relatives = nDetails.relatives;
		this.relativesDetail = nDetails.relativesDetail;
		this.dead = nDetails.dead;
		this.dateOfDeath = nDetails.dateOfDeath;
		this.rehabilitatedToHome = nDetails.rehabilitatedToHome;
		this.receivingSocialAllowance = nDetails.receivingSocialAllowance;
		this.livingWithFamily = nDetails.livingWithFamily;
		this.livingWithFamilyRelation = nDetails.livingWithFamilyRelation;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;
}
