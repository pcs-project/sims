package com.pcs.itmis.idcard.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Immutable
@Table(name = "`senior_citizen_id_view`")
@Subselect("select  s.* from senior_citizen_id_view s")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeniorCitizenIdCardView {

	
	@Id
	private String id;
	
	private String citizenshipNo;

	private String gender;

	private String bloodGroup;
	
	private String fullName;
	
	private String district;
	
	private Long organization;
	
	private String age;


}
