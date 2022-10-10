package com.pcs.itmis.labourMigration.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.ISBN;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "DURATION_OF_STAY")
@Data
@AllArgsConstructor
@NoArgsConstructor 
@IdClass(DurationOfStayPK.class)
@EqualsAndHashCode(exclude = "labourMigrationCaseForm")
public class DurationOfStay {
	

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long durationOfStayId;
	
	@Id
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "labourMigrationCaseFormId",referencedColumnName = "labourMigrationCaseFormId", nullable = false)
	private LabourMigrationCaseForm labourMigrationCaseForm;
	
	
	private String countryName;

	private String stayYear;

	private String stayMonth;
	
	private String entryBy;
	
	private LocalDate  entryDate;
	
	
	public void copyData(DurationOfStay nDurationOfStay) {
		
		this.countryName = nDurationOfStay.countryName;
		this.stayYear = nDurationOfStay.stayYear;
		this.stayMonth = nDurationOfStay.stayMonth;
		
	}
	
	

}
