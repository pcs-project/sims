package com.pcs.itmis.idcard.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.pcs.itmis.idcard.utilities.DisabledIdCardNoGenerator;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DISABLED_ID_CARD")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisabledIdCard {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "disabled_id_card_seq")
	@GenericGenerator(name = "disabled_id_card_seq", strategy = "com.pcs.itmis.idcard.utilities.DisabledIdCardNoGenerator", parameters = {
			@Parameter(name = DisabledIdCardNoGenerator.INCREMENT_PARAM, value = "1") })
	private String id;

	private String oldIdCardNo;

	@Lob
	private byte[] oldIdCardImage;

	private String firstNameEng;

	private String middleNameEng;

	private String lastNameEng;

	private String firstNameNep;

	private String middleNameNep;

	private String lastNameNep;

	private String idCardNo;

	private String oldIdCardType;
	private String idCardType;

	private LocalDate dobEng;

	private String dobNep;

	private String citizenshipNo;

	private String gender;

	private String bloodGroup;

	private String typeOfDisabilityByNature;

	private String typeOfDisabilityBySeverity;

//	private String fatherMotherGaurdianNameEng;
//
//	private String fatherMotherGaurdianNameNep;

	private String entryBy;

	private LocalDate entryDate;

	private Long organization;

	private String nationalIdentificationNo;

	private String birthCertificateNo;

	@OneToOne(mappedBy = "disabledIdCard", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private DisabledAddressDetails disabledAddressDetails;

	@OneToOne(mappedBy = "disabledIdCard", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private DisabledApprovedDetails disabledApprovedDetails;

	@OneToOne(mappedBy = "disabledIdCard", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private DisabledIdCardPhotoInformation disabledIdCardPhotoInformation;

	// private Long userOrganization;

	private String fatherMotherGaurdianfNameEng;

	private String fatherMotherGaurdianfNameNep;

	private String fatherMotherGaurdianmNameEng;

	private String fatherMotherGaurdianmNameNep;
	private String fatherMotherGaurdianlNameEng;

	private String fatherMotherGaurdianlNameNep;

	public void copyData(DisabledIdCard nDisabledIdCard) {
		this.oldIdCardNo = nDisabledIdCard.oldIdCardNo;
		this.firstNameEng = nDisabledIdCard.firstNameEng;
		this.middleNameEng = nDisabledIdCard.middleNameEng;
		this.lastNameEng = nDisabledIdCard.lastNameEng;
		this.firstNameNep = nDisabledIdCard.firstNameNep;
		this.middleNameNep = nDisabledIdCard.middleNameNep;
		this.lastNameNep = nDisabledIdCard.lastNameNep;
		this.idCardNo = nDisabledIdCard.idCardNo;
		this.idCardType = nDisabledIdCard.idCardType;
		this.dobEng = nDisabledIdCard.dobEng;
		this.dobNep = nDisabledIdCard.dobNep;
		this.citizenshipNo = nDisabledIdCard.citizenshipNo;
		this.gender = nDisabledIdCard.gender;
		this.bloodGroup = nDisabledIdCard.bloodGroup;
		this.typeOfDisabilityByNature = nDisabledIdCard.typeOfDisabilityByNature;
		this.typeOfDisabilityBySeverity = nDisabledIdCard.typeOfDisabilityBySeverity;
//		this.fatherMotherGaurdianNameEng =nDisabledIdCard.fatherMotherGaurdianNameEng ;
//		this.fatherMotherGaurdianNameNep =nDisabledIdCard.fatherMotherGaurdianNameNep ;

		this.fatherMotherGaurdianfNameEng = nDisabledIdCard.fatherMotherGaurdianfNameEng;
		this.fatherMotherGaurdianfNameNep = nDisabledIdCard.fatherMotherGaurdianfNameNep;
		this.fatherMotherGaurdianmNameEng = nDisabledIdCard.fatherMotherGaurdianmNameEng;
		this.fatherMotherGaurdianmNameNep = nDisabledIdCard.fatherMotherGaurdianmNameNep;
		this.fatherMotherGaurdianlNameEng = nDisabledIdCard.fatherMotherGaurdianlNameEng;
		this.fatherMotherGaurdianlNameNep = nDisabledIdCard.fatherMotherGaurdianlNameNep;
		this.nationalIdentificationNo = nDisabledIdCard.nationalIdentificationNo;
		this.birthCertificateNo = nDisabledIdCard.birthCertificateNo;

	}

}
