package com.pcs.itmis.idcard.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.pcs.itmis.idcard.utilities.DisabledIdCardNoGenerator;
import com.pcs.itmis.idcard.utilities.SeniorCitizenIdCardGenerator;
import com.pcs.itmis.idcard.utilities.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name ="senior_citizen_id_card")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeniorCitizenIdCard {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "senior_citizen_id_card_seq")
	@GenericGenerator(
		        name = "senior_citizen_id_card_seq", 
		        strategy = "com.pcs.itmis.idcard.utilities.SeniorCitizenIdCardGenerator", 
		        parameters = {@Parameter(name = SeniorCitizenIdCardGenerator.INCREMENT_PARAM, value = "1")})
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
	
	
	private String age;
	
	private String citizenshipNo;
	
	private String gender;
	
	private String bloodGroup;
	
	//private String availableConcessionEng;
	
	//private String availableConcessionNep;
	
//	private String availableConcession;
	@Convert(converter = StringListConverter.class)
	private List<String> availableConcession;
	private String husbandWifefNameEng;
	private String husbandWifemNameEng;
	private String husbandWifelNameEng;
	private String husbandWifefNameNep;
	private String husbandWifemNameNep;
	private String husbandWifelNameNep;
	private String careTakerSenCitHomeEng;
	private String careTakerSenCitHomeNep;
	private String contactPersonfNameEng;
	private String contactPersonmNameEng;
	private String contactPersonlNameEng;
	private String contactPersonfNameNep;
	private String contactPersonmNameNep;
	private String contactPersonlNameNep;
	private String nameOfDrugsEng;
	private String nameOfDrugsNep;
	private String disease;
	
	private String entryBy;
	
	private LocalDate entryDate;
	
	private String organization;
	
	
	private String pleaseSpDetails;
	
	private String nationalIdentificationNo;
	
	@OneToOne(mappedBy = "seniorCitizenIdCard", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private SeniorCitizenAddressDetails seniorCitizenAddressDetails;
	
	@OneToOne(mappedBy = "seniorCitizenIdCard", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private SeniorCitizenApprovedDetails  seniorCitizenApprovedDetails;
	
	@OneToOne(mappedBy = "seniorCitizenIdCard", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private SeniorCitizenIdCardPhotoInformation seniorCitizenIdCardPhotoInformation;
	
	public void copyData(SeniorCitizenIdCard nSeniorCitizenIdCard) {
		this.oldIdCardNo =nSeniorCitizenIdCard.oldIdCardNo ;
		this.firstNameEng =nSeniorCitizenIdCard.firstNameEng ;
		this.middleNameEng =nSeniorCitizenIdCard.middleNameEng ;
		this.lastNameEng =nSeniorCitizenIdCard.lastNameEng ;
		this.firstNameNep =nSeniorCitizenIdCard.firstNameNep ;
		this.middleNameNep =nSeniorCitizenIdCard.middleNameNep ;
		this.lastNameNep =nSeniorCitizenIdCard.lastNameNep ;
		this.idCardNo =nSeniorCitizenIdCard.idCardNo ;
		this.citizenshipNo =nSeniorCitizenIdCard.citizenshipNo ;
		this.gender =nSeniorCitizenIdCard.gender ;
		this.bloodGroup =nSeniorCitizenIdCard.bloodGroup ;
		this.age =nSeniorCitizenIdCard.age ;
		this.citizenshipNo =nSeniorCitizenIdCard.citizenshipNo ;
		this.gender =nSeniorCitizenIdCard.gender ;
		this.bloodGroup =nSeniorCitizenIdCard.bloodGroup ;
		//this.availableConcessionEng =nSeniorCitizenIdCard.availableConcessionEng ;
		//this.availableConcessionNep =nSeniorCitizenIdCard.age ;
		this.availableConcession =nSeniorCitizenIdCard.availableConcession ;
		this.husbandWifefNameEng =nSeniorCitizenIdCard.husbandWifefNameEng ;
		this.husbandWifemNameEng =nSeniorCitizenIdCard.husbandWifemNameEng ;
		this.husbandWifelNameEng =nSeniorCitizenIdCard.husbandWifelNameEng ;	
		this.husbandWifefNameNep =nSeniorCitizenIdCard.husbandWifefNameNep ;
		this.husbandWifemNameNep =nSeniorCitizenIdCard.husbandWifemNameNep ;
		this.husbandWifelNameNep =nSeniorCitizenIdCard.husbandWifelNameNep ;
		
		this.careTakerSenCitHomeEng =nSeniorCitizenIdCard.careTakerSenCitHomeEng ;
		this.careTakerSenCitHomeNep =nSeniorCitizenIdCard.careTakerSenCitHomeNep ;
		this.contactPersonfNameEng =nSeniorCitizenIdCard.contactPersonfNameEng ;	
		this.contactPersonmNameEng =nSeniorCitizenIdCard.contactPersonmNameEng ;
		this.contactPersonlNameEng =nSeniorCitizenIdCard.contactPersonlNameEng ;
		this.contactPersonfNameNep =nSeniorCitizenIdCard.contactPersonfNameNep ;
		this.contactPersonmNameNep =nSeniorCitizenIdCard.contactPersonmNameNep ;
		this.contactPersonlNameNep =nSeniorCitizenIdCard.contactPersonlNameNep ;
		this.nameOfDrugsEng =nSeniorCitizenIdCard.nameOfDrugsEng ;
		this.nameOfDrugsNep =nSeniorCitizenIdCard.nameOfDrugsNep ;
		this.disease =nSeniorCitizenIdCard.disease ;
		this.pleaseSpDetails =nSeniorCitizenIdCard.pleaseSpDetails ;
		this.nationalIdentificationNo = nSeniorCitizenIdCard.nationalIdentificationNo;
	}
}
