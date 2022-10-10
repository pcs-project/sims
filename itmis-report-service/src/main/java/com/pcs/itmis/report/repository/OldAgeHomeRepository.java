package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.OldAgeHomeReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface OldAgeHomeRepository extends JpaRepository<ReportEntity, Long> {
	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.male_citizen_receiving_services) AS male_citizen_receiving_services," 
			+ "SUM(v.female_citizen_receiving_services) AS female_citizen_receiving_services,"
			+ " SUM(v.others_citizen_receiving_services) AS others_citizen_receiving_services,"
			+ " SUM(v.dalit_receiving_services) AS dalit_receiving_services, " 
			+ "SUM(v.ethnic_minorities_receiving_services) AS ethnic_minorities_receiving_services,"
			+ " SUM(v.janajati_receiving_services) AS janajati_receiving_services," 
			+ " SUM(v.madhesi_receiving_services) AS madhesi_receiving_services, "
			+ "SUM(v.brahmin_receiving_services) AS brahmin_receiving_services," 
			+ "SUM(v.muslim_receiving_services) AS muslim_receiving_services," 
			+ "SUM(v.others_ethnicity_receiving_services) AS others_ethnicity_receiving_services," 
			+ "SUM(v.tot_old_age_home) AS tot_old_age_home,"
			+ "SUM(v.male_citizen_rehabilitated) AS male_citizen_rehabilitated," 
			+ " SUM(v.female_citizen_rehabilitated) AS female_citizen_rehabilitated,"
			+ " SUM(v.others_citizen_rehabilitated) AS others_citizen_rehabilitated, " 
			+ "SUM(v.citizen_rehabilitated_by_home) AS citizen_rehabilitated_by_home,"
			+ "SUM(v.citizen_rehabilitated_by_relatives) AS citizen_rehabilitated_by_relatives,"
			+ "AVG(v.budget_for_old_age_home) AS budget_for_old_age_home"
			+ " from old_age_home_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<OldAgeHomeReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
