package com.pcs.itmis.lookupservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.lookupservice.entity.LookupDistrict;



@Repository
public interface DistrictRepository extends JpaRepository<LookupDistrict, Integer> {

	@Query(value="select d from LookupDistrict d where d.provinceId=?1")
	List<LookupDistrict> getDistrictByProvince(Integer id);

	List<LookupDistrict> findByProvinceId(int provinceCd);

	LookupDistrict findByIdAndProvinceId(int districtCd, int provinceCd);

}
