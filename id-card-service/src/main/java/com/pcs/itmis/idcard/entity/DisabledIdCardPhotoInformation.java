package com.pcs.itmis.idcard.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "disabled_photo_information")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "disabledIdCard")
public class DisabledIdCardPhotoInformation {
	
	@Id 
    @Column(name = "id")
    private String id;


    @OneToOne
    @MapsId  
    @JoinColumn(name = "id")
    @JsonBackReference
    private DisabledIdCard disabledIdCard;
    
    private String fileName;
    
    @Lob
    private byte[] fileData;
    
    private String fileType;
    
	private String entryBy;
	
	private LocalDate entryDate;

	public DisabledIdCardPhotoInformation(DisabledIdCard disabledIdCard, String fileName, byte[] fileData,
			String fileType, String entryBy, LocalDate entryDate) {
		super();
		this.disabledIdCard = disabledIdCard;
		this.fileName = fileName;
		this.fileData = fileData;
		this.fileType = fileType;
		this.entryBy = entryBy;
		this.entryDate = entryDate;
	}
	
	
	



	
	
	

}
