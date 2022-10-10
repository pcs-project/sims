package com.pcs.itmis.idcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcs.itmis.idcard.entity.DisabledIdCard;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCard;

public interface SeniorCitizenIdCardRepository extends JpaRepository<SeniorCitizenIdCard,String>{
	
	List<SeniorCitizenIdCard> findByFirstNameEngContainingIgnoreCaseAndSeniorCitizenAddressDetailsAndCitizenshipNoContainingIgnoreCase(String name, String district, String citizenshipNo);


}
