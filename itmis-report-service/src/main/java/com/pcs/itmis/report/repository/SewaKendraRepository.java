package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ReportEntity;
import com.pcs.itmis.report.entity.SewaKendraReport;

@Repository
public interface SewaKendraRepository extends JpaRepository<ReportEntity, Long> {

	@Query(nativeQuery = true, value = "select v.fiscal_year, v.quarter, v.province_id,  v.district_id, v.municipality_id,"
			+ "SUM(v.male_survivors) AS male_survivors,"
			+ "SUM(v.female_survivors) AS female_survivors,"
			+ "SUM(v.others_survivors) AS others_survivors,"
			+ "SUM(v.male_gbv_victims) AS male_gbv_victims,"
			+ "SUM(v.female_gbv_victims) AS female_gbv_victims,"
			+ "SUM(v.others_gbv_victims) AS others_gbv_victims,"
			+ "SUM(v.tot_sewa_kendra) AS tot_sewa_kendra"
			+ " from sewa_kendra_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<SewaKendraReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
