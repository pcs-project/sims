package com.pcs.itmis.idcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcs.itmis.idcard.entity.DisabledIdCard;
import com.pcs.itmis.idcard.entity.DisabledIdCardView;

public interface DisabilityIdCardViewRepository extends JpaRepository<DisabledIdCardView, String>{

	
	List<DisabledIdCardView> findByFullNameContainingAndDistrictOrCitizenshipNo(String fullName ,String district,String citizenshipNo);

	List<DisabledIdCardView> findByOrganization(Long organization);
}
