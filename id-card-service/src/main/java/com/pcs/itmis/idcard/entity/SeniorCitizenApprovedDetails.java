package com.pcs.itmis.idcard.entity;

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
@Table(name = "senior_citizen_approved_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "seniorCitizenIdCard")
public class SeniorCitizenApprovedDetails {

	@Id
	@Column(name = "id")
	private String id;

	@OneToOne
	@MapsId
	@JoinColumn(name = "id")
	@JsonBackReference
	private SeniorCitizenIdCard seniorCitizenIdCard;

	private String nameEng;

	private String nameNep;

	private String designationNep;

	private String designationEng;

	private String officeEng;

	private String officeNep;

	private String signature;

	private String entryBy;

	private LocalDate entryDate;
	
	public void copyData(SeniorCitizenApprovedDetails nSeniorCitizenApprovedDetails) {
		this.nameEng  =nSeniorCitizenApprovedDetails.nameEng;
		this.nameNep  =nSeniorCitizenApprovedDetails.nameNep;
		this.designationNep  =nSeniorCitizenApprovedDetails.nameEng;
		this.designationEng  =nSeniorCitizenApprovedDetails.designationEng;
		this.officeEng  =nSeniorCitizenApprovedDetails.officeEng;
		this.officeNep  =nSeniorCitizenApprovedDetails.officeNep;		
		this.signature  =nSeniorCitizenApprovedDetails.signature;
		
	}

}
