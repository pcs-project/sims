package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.IdCardReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface IdCardReportRepository extends JpaRepository<ReportEntity, Long> {

	@Query(nativeQuery = true, value = "select SUM(v.disabled) AS disabled, SUM(v.senior_citizen) AS senior_citizen, "
			+ "v.province_id, v.province_desc_eng, v.province_desc_nep " + "from idcard_report_view v"
			+ " GROUP BY v.province_id")
	List<IdCardReport> getProvinceWiseReport();

	@Query(nativeQuery = true, value = "select SUM(v.disabled) AS disabled, SUM(v.senior_citizen) AS senior_citizen, "
			+ " v.province_id, v.province_desc_eng, " + "v.province_desc_nep, v.district_id, v.district_desc_eng, "
			+ "v.district_desc_nep " + "from idcard_report_view v " + "WHERE v.province_id =:provinceId"
			+ " GROUP BY v.district_id")
	List<IdCardReport> getDistrictWiseReport(String provinceId);

	@Query(nativeQuery = true, value = "select SUM(v.disabled) AS disabled, SUM(v.senior_citizen) AS senior_citizen, "
			+ " v.province_id, v.province_desc_eng, " + "v.province_desc_nep, v.district_id, v.district_desc_eng, "
			+ "v.district_desc_nep, v.municipality_id, v.municipality_desc_eng," + "v.municipality_desc_nep "
			+ " from idcard_report_view v " + " WHERE v.district_id =:districtId" + " GROUP BY v.municipality_id")
	List<IdCardReport> getMunicipalityWiseReport(String districtId);

}
