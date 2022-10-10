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
@Table(name = "disabled_approved_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "disabledIdCard")
public class DisabledApprovedDetails {

	@Id 
    @Column(name = "id")
    private String id;


    @OneToOne
    @MapsId  
    @JoinColumn(name = "id")
    @JsonBackReference
    private DisabledIdCard disabledIdCard;
    
    private String nameEng;
    
    private String nameNep;
    
    private String designationNep;
    
    
    private String designationEng;
    
    private LocalDate dateEng;
    
    private String dateNep;
    
    private String signature;
    
	private String entryBy;
	
	private LocalDate entryDate;

	
	public void copyData(DisabledApprovedDetails nDisabledApprovedDetails) {
		this.nameEng  =nDisabledApprovedDetails.nameEng;
		this.nameNep  =nDisabledApprovedDetails.nameNep;
		this.designationNep  =nDisabledApprovedDetails.designationNep;
		this.designationEng  =nDisabledApprovedDetails.designationEng;
		this.dateEng  =nDisabledApprovedDetails.dateEng;
		this.dateNep  =nDisabledApprovedDetails.dateNep;
		this.signature  =nDisabledApprovedDetails.signature;
		
	}
	
	
}
