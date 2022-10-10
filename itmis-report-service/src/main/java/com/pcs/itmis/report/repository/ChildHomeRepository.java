package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ChildHomeReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface ChildHomeRepository  extends JpaRepository<ReportEntity, Long>{

	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.boys_receiving_services) AS boys_receiving_services," 
			+ "SUM(v.girls_receiving_services) AS girls_receiving_services,"
			+ " SUM(v.others_receiving_services) AS others_receiving_services,"
			+ " SUM(v.dalit_receiving_services) AS dalit_receiving_services, " 
			+ "SUM(v.ethnic_minorities_receiving_services) AS ethnic_minorities_receiving_services,"
			+ " SUM(v.janajati_receiving_services) AS janajati_receiving_services," 
			+ " SUM(v.madhesi_receiving_services) AS madhesi_receiving_services, "
			+ "SUM(v.brahmin_receiving_services) AS brahmin_receiving_services," 
			+ "SUM(v.muslim_receiving_services) AS muslim_receiving_services," 
			+ "SUM(v.others_ethnicity_receiving_services) AS others_ethnicity_receiving_services," 
			+ " SUM(v.gbv_receiving_services) AS gbv_receiving_services,"
			+ " SUM(v.tip_receiving_services) AS tip_receiving_services, " 
			+ " SUM(v.trapped_in_addiction_receiving_services) AS trapped_in_addiction_receiving_services," 
			+ " SUM(v.drug_addict_receiving_services) AS drug_addict_receiving_services," 
			+ " SUM(v.street_children_receiving_services) AS street_children_receiving_services," 
			+ "SUM(v.tot_child_home) AS tot_child_home,"
			+ "SUM(v.rehabilitated_from_home) AS rehabilitated_from_home," 
			+ " SUM(v.rehabilitated_from_adoption) AS rehabilitated_from_adoption,"
			+ " SUM(v.rehabilitated_from_foster_home) AS rehabilitated_from_foster_home, " 
			+ "SUM(v.rehabilitated_from_ojt) AS rehabilitated_from_ojt,"
			+ "SUM(v.rehabilitated_from_out_of_community) AS rehabilitated_from_out_of_community,"
			+ "AVG(v.budget_for_child_home) AS budget_for_child_home"
			+ " from child_home_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<ChildHomeReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
