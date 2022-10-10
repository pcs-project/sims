package com.pcs.itmis.idcard.entity;

import java.io.Serializable;
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
@Table(name = "`disabled_id_view`")
@Subselect("select  d.* from disabled_id_view d")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisabledIdCardView implements  Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	
	private String citizenshipNo;

	private String gender;

	private String bloodGroup;
	
	private String fullName;
	
	private String district;
	
	private Long organization;
	
	private String idCardType;

	private LocalDate dobEng;

}
