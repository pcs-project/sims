package com.pcs.itmis.lookupservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.pcs.itmis.lookupservice.entity.LookupMunicipality;

@Repository
public interface MunicipalityRepository extends JpaRepository<LookupMunicipality, Integer>{

	@Query(value="select m from LookupMunicipality m where m.districtId=?1")
	List<LookupMunicipality> getMunicipalityByDistrict(Integer id);

	List<LookupMunicipality> findByDistrictId(int districtId);

	LookupMunicipality findByIdAndDistrictId(Integer id, Integer districtId);

	@Query(value="select m.totalWard from LookupMunicipality m where m.id=?1")
	Integer getTotalWard(Integer municipalityId);
	


}
