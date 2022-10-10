package com.pcs.itmis.socialService.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.pcs.itmis.socialService.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "JUVENIAL_CORRECTION_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JuvenileCorrectionHome {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long juvenileCorrectionHomeId;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "juvenileCorrectionHome")
	@PrimaryKeyJoinColumn
	private JuvenileCorrectionHomeTip tipDetails;

	private String homeName;
	private String homeProvince;
	private String homeDistrict;
	private String homeMunicipality;
	private String homeWardNo;

	private String firstName;
	private String middleName;
	private String lastName;

	private String photo;

	private String birthCertificateNumber;
	private String birthCertificateIssuedDate;
	private String birthCertificateIssuedDistrict;
	private String birthCertificateIssuedMunicipality;

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

	@Convert(converter = StringListConverter.class)
	private List<String> caseType;
	private String sentenced;
	private String spentInJchFromDate;
	private String spentInJchToDate;

	private String parentGuardian;
	private String offenderType;

	private String tipCase;
	private String gbvCase;

	// rehabilitation
	private String rehabilitation;
	private String rehabilitatedTo;
	private String rehabilitatedToDetail;

	private String investigationStatus;
	private String investigationStatusDetail;
	private String referralStatus;

	private String status;
	private String entryBy;
	private LocalDate entryDate;

	private String violenceType;
	private String violenceTypeDetail;
	private Long userOrganization;

	public void copyData(JuvenileCorrectionHome nDetails) {
		this.homeName = nDetails.homeName;
		this.homeProvince = nDetails.homeProvince;
		this.homeDistrict = nDetails.homeDistrict;
		this.homeMunicipality = nDetails.homeMunicipality;
		this.homeWardNo = nDetails.homeWardNo;
		this.firstName = nDetails.firstName;
		this.middleName = nDetails.middleName;
		this.lastName = nDetails.lastName;
		this.birthCertificateNumber = nDetails.birthCertificateNumber;
		this.birthCertificateIssuedDate = nDetails.birthCertificateIssuedDate;
		this.birthCertificateIssuedDistrict = nDetails.birthCertificateIssuedDistrict;
		this.birthCertificateIssuedMunicipality = nDetails.birthCertificateIssuedMunicipality;
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
		this.sentenced = nDetails.sentenced;
		this.spentInJchFromDate = nDetails.spentInJchFromDate;
		this.spentInJchToDate = nDetails.spentInJchToDate;
		this.parentGuardian = nDetails.parentGuardian;
		this.offenderType = nDetails.offenderType;
		this.rehabilitation = nDetails.rehabilitation;
		this.rehabilitatedTo = nDetails.rehabilitatedTo;
		this.rehabilitatedToDetail = nDetails.rehabilitatedToDetail;
		this.tipCase = nDetails.tipCase;
		this.gbvCase = nDetails.gbvCase;
		this.tipDetails = nDetails.tipDetails;
		this.status = nDetails.status;

		this.investigationStatus = nDetails.investigationStatus;
		this.investigationStatusDetail = nDetails.investigationStatusDetail;
		this.referralStatus = nDetails.referralStatus;

		this.violenceType = nDetails.violenceType;
		this.violenceTypeDetail = nDetails.violenceTypeDetail;
	}

	private LocalDate synchronizedDate;

	private LocalDate lastModifiedDate;
}
