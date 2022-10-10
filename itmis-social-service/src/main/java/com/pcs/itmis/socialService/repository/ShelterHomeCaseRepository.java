package com.pcs.itmis.socialService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.socialService.entity.ShelterHomeCase;

@Repository
public interface ShelterHomeCaseRepository extends JpaRepository<ShelterHomeCase, Long>{

	List<ShelterHomeCase> findByUserOrganization(Long organizationId);

}
