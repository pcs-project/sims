package com.pcs.itmis.socialService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.socialService.entity.JuvenileCorrectionHome;

@Repository
public interface JuvenileCorrectionHomeRepository extends JpaRepository<JuvenileCorrectionHome, Long>{

	List<JuvenileCorrectionHome> findByUserOrganization(Long organizationId);

}
