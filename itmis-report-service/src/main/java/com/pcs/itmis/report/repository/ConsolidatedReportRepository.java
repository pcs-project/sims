package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ConsolidatedReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface ConsolidatedReportRepository  extends JpaRepository<ReportEntity, Long>{

	@Query(nativeQuery = true, value = "select "
//			+ "c.user_organization,\n"
			+ "c.module,\n"
//			+ "c.fiscal_year,\n"
//			+ "c.quarter,\n"
			+ "SUM(c.male_count) AS male_count, \n"
			+ "SUM(c.female_count) AS female_count,\n"
			+ "SUM(c.others_count) AS others_count,\n"
			+ "SUM(c.total_count) AS total_count \n"
//			+ "c.province_id,\n"
//			+ "c.district_id,\n"
//			+ "c.municipality_id "
			+ "from consolidated_report_view c "
			+ "where c.fiscal_year = COALESCE(:fiscalYear,c.fiscal_year) "
			+ "AND (c.quarter = COALESCE(:quarter,c.quarter) OR c.quarter = '-') "
			+ "and c.province_id = COALESCE(:provinceId,c.province_id) "
			+ "and c.district_id = COALESCE(:districtId,c.district_id) "
			+ "and c.municipality_id = COALESCE(:localLevelId,c.municipality_id) "
			+ " GROUP BY c.module")
	List<ConsolidatedReport> getReportGenderWise(@Param("fiscalYear") String fiscalYear, 
			@Param("quarter") String quarter, @Param("provinceId") String provinceId,
			@Param("districtId") String districtId, @Param("localLevelId") String localLevelId);

	@Query(nativeQuery = true, value = "select "
		//	+ "c.user_organization,\n"
			+ "c.module,\n"
//			+ "c.fiscal_year,\n"
//			+ "c.quarter,\n"
			+ "SUM(c.total_count) AS total_count \n"
//			+ "c.province_id,\n"
//			+ "c.district_id,\n"
//			+ "c.municipality_id "
			+ "from consolidated_total_report_view c "
			+ "where c.fiscal_year = COALESCE(:fiscalYear,c.fiscal_year) "
			+ "AND (c.quarter = COALESCE(:quarter,c.quarter) OR c.quarter = '-') "
			+ "and c.province_id = COALESCE(:provinceId,c.province_id) "
			+ "and c.district_id = COALESCE(:districtId,c.district_id) "
			+ "and c.municipality_id = COALESCE(:localLevelId,c.municipality_id) "
			+ " GROUP BY c.module")
	List<ConsolidatedReport> getTotalConsolidatedReport(String fiscalYear, String quarter, String provinceId,
			String districtId, String localLevelId);

	@Query(nativeQuery = true, value = "select "
		//	+ "c.user_organization,\n"
			+ "c.module,\n"
			+ "SUM(c.total_count) AS total_count \n"
			+ "from total_social_service_report_view c "
			+ " GROUP BY c.module")
	List<ConsolidatedReport> getSocialServiceHomesCountReport();
	

}
