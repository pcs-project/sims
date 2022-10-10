package com.pcs.itmis.idcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pcs.itmis.idcard.entity.DisabledIdCardView;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCardView;

public interface SeniorCitizenIdCardViewRepository extends JpaRepository<SeniorCitizenIdCardView, String>{

	List<SeniorCitizenIdCardView> findByFullNameContainingAndDistrictOrCitizenshipNo(String fullName ,String district,String citizenshipNo);

	List<SeniorCitizenIdCardView> findByOrganization(Long organization);
	

}
