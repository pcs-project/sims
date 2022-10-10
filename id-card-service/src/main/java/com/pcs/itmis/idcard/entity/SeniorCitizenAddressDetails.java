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
@Table(name = "senior_citizen_address_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "seniorCitizenIdCard")
public class SeniorCitizenAddressDetails {

	@Id
	@Column(name = "id")
	private String id;

	@OneToOne
	@MapsId
	@JoinColumn(name = "id")
	@JsonBackReference
	private SeniorCitizenIdCard seniorCitizenIdCard;

	private String province;

	private String district;

	private String municipality;

	private String wardNo;

	private String entryBy;

	private LocalDate entryDate;
	

	public void copyData(SeniorCitizenAddressDetails nSeniorCitizenAddressDetails) {
		this.province = nSeniorCitizenAddressDetails.province;
		this.district = nSeniorCitizenAddressDetails.district;
		this.municipality = nSeniorCitizenAddressDetails.municipality;
		this.wardNo = nSeniorCitizenAddressDetails.wardNo;
		
	}

}
