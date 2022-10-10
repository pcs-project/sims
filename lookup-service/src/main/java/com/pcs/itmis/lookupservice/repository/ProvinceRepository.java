package com.pcs.itmis.lookupservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.lookupservice.entity.LookupProvince;


@Repository
public interface ProvinceRepository extends JpaRepository<LookupProvince, Integer>{

	
	LookupProvince findById(int id);
}
