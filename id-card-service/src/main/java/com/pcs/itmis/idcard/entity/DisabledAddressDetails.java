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
@Table(name = "disabled_address_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "disabledIdCard")
public class DisabledAddressDetails {
	
		@Id 
	    @Column(name = "id")
	    private String id;


	    @OneToOne
	    @MapsId  
	    @JoinColumn(name = "id")
	    @JsonBackReference
	    private DisabledIdCard disabledIdCard;
		
		
	 	private String province;
		
		private String district;
		
		private String municipality;
		
		private String wardNo;
		
		private String entryBy;
		
		private LocalDate entryDate;
		
		
		public void copyData(DisabledAddressDetails nDisabledAddressDetails) {
			this.province = nDisabledAddressDetails.province;
			this.district = nDisabledAddressDetails.district;
			this.municipality = nDisabledAddressDetails.municipality;
			this.wardNo = nDisabledAddressDetails.wardNo;
			
		}

		
		
		

}
