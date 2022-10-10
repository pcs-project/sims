package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ChildCorrectionHomeReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface ChildCorrectionHomeRepository extends JpaRepository<ReportEntity, Long> {
	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.boys_receiving_services_in_cch) AS boys_receiving_services_in_cch," 
			+ " SUM(v.girls_receiving_services_in_cch) AS girls_receiving_services_in_cch,"
			+ " SUM(v.others_receiving_services_in_cch) AS others_receiving_services_in_cch,"
			+ " SUM(v.dalit_receiving_services_in_cch) AS dalit_receiving_services_in_cch, " 
			+ " SUM(v.ethnic_minorities_receiving_services_in_cch) AS ethnic_minorities_receiving_services_in_cch,"
			+ " SUM(v.janajati_receiving_services_in_cch) AS janajati_receiving_services_in_cch," 
			+ " SUM(v.madhesi_receiving_services_in_cch) AS madhesi_receiving_services_in_cch, "
			+ " SUM(v.brahmin_receiving_services_in_cch) AS brahmin_receiving_services_in_cch," 
			+ " SUM(v.muslim_receiving_services_in_cch) AS muslim_receiving_services_in_cch," 
			+ " SUM(v.others_ethnicity_receiving_services_in_cch) AS others_ethnicity_receiving_services_in_cch," 
			+ " SUM(v.tot_child_correction_home) AS tot_child_correction_home,"
			+ " SUM(v.boys_rehabilitated_from_cch) AS boys_rehabilitated_from_cch," 
			+ " SUM(v.girls_rehabilitated_from_cch) AS girls_rehabilitated_from_cch,"
			+ " SUM(v.others_rehabilitated_from_cch) AS others_rehabilitated_from_cch,"
			+ " SUM(v.rehabilitated_from_home) AS rehabilitated_from_home," 
			+ " SUM(v.rehabilitated_from_adoption) AS rehabilitated_from_adoption,"
			+ " SUM(v.rehabilitated_from_foster_home) AS rehabilitated_from_foster_home, " 
			+ " SUM(v.rehabilitated_from_ojt) AS rehabilitated_from_ojt,"
			+ " SUM(v.rehabilitated_from_out_of_community) AS rehabilitated_from_out_of_community,"
			+ " AVG(v.budget_for_child_correction_home) AS budget_for_child_correction_home"
			+ " from correction_home_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<ChildCorrectionHomeReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId,
			String districtId, String localLevelId);

}
