package com.pcs.itmis.idcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pcs.itmis.idcard.entity.DisabledIdCard;

public interface DisabledIdCardRepository extends JpaRepository<DisabledIdCard, String> {
	
	List<DisabledIdCard> findByFirstNameEngContainingIgnoreCaseAndDisabledAddressDetailsDistrictAndCitizenshipNoContainingIgnoreCase(String name, String district, String citizenshipNo);

	List<DisabledIdCard> findByFirstNameEngContainingIgnoreCase(String name);
}
