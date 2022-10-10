package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ChildrenReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface ChildrenReportRepository extends JpaRepository<ReportEntity, Long> {
	@Query(nativeQuery = true, value = "select "
			+ "SUM(c.boys_population) AS boys_population,"
			+ "SUM(c.girls_population) AS girls_population, " + "SUM(c.others_population) AS others_population, "
			+ "SUM(c.boys_birth_cert_isssued) AS boys_birth_cert_isssued,"
			+ "SUM(c.girls_birth_cert_isssued) AS girls_birth_cert_isssued, "
			+ "SUM(c.others_birth_cert_isssued) AS others_birth_cert_isssued " + "from children_report_view c "
			+ "where c.fiscal_year = '2078-79' ")
	List<ChildrenReport> getChildrenCumulativeReport();

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, " + "SUM(c.boys_population) AS boys_population,"
			+ "SUM(c.girls_population) AS girls_population, " + "SUM(c.others_population) AS others_population, "
			+ "SUM(c.boys_birth_cert_isssued) AS boys_birth_cert_isssued,"
			+ "SUM(c.girls_birth_cert_isssued) AS girls_birth_cert_isssued, "
			+ "SUM(c.others_birth_cert_isssued) AS others_birth_cert_isssued " + "from children_report_view c "
			+ "where c.fiscal_year = '2078-79' "
			+ "GROUP BY c.province_id")
	List<ChildrenReport> getProvinceWiseChildrenReport();

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, c.district_id, c.district_desc_eng, " + "c.district_desc_nep, "
			+ "SUM(c.boys_population) AS boys_population," + "SUM(c.girls_population) AS girls_population, "
			+ "SUM(c.others_population) AS others_population, "
			+ "SUM(c.boys_birth_cert_isssued) AS boys_birth_cert_isssued,"
			+ "SUM(c.girls_birth_cert_isssued) AS girls_birth_cert_isssued, "
			+ "SUM(c.others_birth_cert_isssued) AS others_birth_cert_isssued " + " from children_report_view c "
			+ "WHERE c.province_id =:provinceId" 
			+ " AND c.fiscal_year = '2078-79' "
			+ " GROUP BY c.district_id")
	List<ChildrenReport> getDistrictWiseChildrenReport(@Param("provinceId") String provinceId);

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, c.district_id, c.district_desc_eng, "
			+ "c.district_desc_nep, c.municipality_id, c.municipality_desc_eng," + "c.municipality_desc_nep, "
			+ "SUM(c.boys_population) AS boys_population," + "SUM(c.girls_population) AS girls_population, "
			+ "SUM(c.others_population) AS others_population, "
			+ "SUM(c.boys_birth_cert_isssued) AS boys_birth_cert_isssued,"
			+ "SUM(c.girls_birth_cert_isssued) AS girls_birth_cert_isssued, "
			+ "SUM(c.others_birth_cert_isssued) AS others_birth_cert_isssued " + " from children_report_view c "
			+ "WHERE c.district_id =:districtId" 
			+ " AND c.fiscal_year = '2078-79' "
			+ " GROUP BY c.municipality_id")
	List<ChildrenReport> getMunicipalityWiseChildrenReport(@Param("districtId") String districtId);

	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.boys_population) AS boys_population," 
			+ "SUM(v.girls_population) AS girls_population,"
			+ " SUM(v.others_population) AS others_population,"
			+ " SUM(v.boys_birth_cert_isssued) AS boys_birth_cert_isssued, " 
			+ "SUM(v.girls_birth_cert_isssued) AS girls_birth_cert_isssued,"
			+ " SUM(v.others_birth_cert_isssued) AS others_birth_cert_isssued," 
			+ " SUM(v.boys_child_abuse) AS boys_child_abuse, "
			+ "SUM(v.boys_early_marriage) AS boys_early_marriage," 
			+ " SUM(v.boys_missing) AS boys_missing,"
			+ " SUM(v.boys_found) AS boys_found,"
			+ " SUM(v.boys_receivingssa) AS boys_receivingssa, " 
			+ "AVG(v.children_budget_allocated) AS children_budget_allocated,"
			+ "SUM(v.children_dev_center) AS children_dev_center," 
			+ " SUM(v.disabled_receivingssa) AS disabled_receivingssa,"
			+ " SUM(v.early_arranged_marriage) AS early_arranged_marriage, " 
			+ "SUM(v.early_eloped_marriage) AS early_eloped_marriage,"
			+ "SUM(v.total_early_marriage_by_case) AS total_early_marriage_by_case,"
			+ "SUM(v.girls_child_abuse) AS girls_child_abuse,"
			+ "SUM(v.girls_early_marriage) AS girls_early_marriage,"
			+ "SUM(v.girls_missing) AS girls_missing,"
			+ "SUM(v.girls_found) AS girls_found,"
			+ "SUM(v.girls_receivingssa) AS girls_receivingssa,"
			+ "SUM(v.orphan_boys) AS orphan_boys,"
			+ "SUM(v.orphan_girls) AS orphan_girls,"
			+ "AVG(v.out_of_school_children) AS out_of_school_children,"
			+ "AVG(v.primary_school_boys) AS primary_school_boys,"
			+ "AVG(v.primary_school_girls) AS primary_school_girls,"
			+ "AVG(v.secondary_dropout_boys) AS secondary_dropout_boys,"
			+ "AVG(v.secondary_dropout_brahmin) AS secondary_dropout_brahmin,"
			+ "AVG(v.secondary_dropout_dalit) AS secondary_dropout_dalit,"
			+ "AVG(v.secondary_dropout_ethnic) AS secondary_dropout_ethnic,"
			+ "AVG(v.secondary_dropout_girls) AS secondary_dropout_girls,"
			+ "AVG(v.secondary_dropout_janajati) AS secondary_dropout_janajati,"
			+ "AVG(v.secondary_dropout_madhesi) AS secondary_dropout_madhesi,"
			+ "AVG(v.secondary_dropout_muslim) AS secondary_dropout_muslim,"
			+ "AVG(v.secondary_dropout_ethnicity_others) AS secondary_dropout_ethnicity_others,"
			+ "SUM(v.street_boys) AS street_boys,"
			+ "SUM(v.street_girls) AS street_girls,"
			+ "SUM(v.orphan_others) AS orphan_others,"
			+ "SUM(v.others_child_abuse) AS others_child_abuse,"
			+ "SUM(v.others_early_marriage) AS others_early_marriage,"
			+ "SUM(v.others_missing) AS others_missing,"
			+ "SUM(v.others_found) AS others_found,"
			+ "SUM(v.others_receivingssa) AS others_receivingssa,"
			+ "AVG(v.primary_school_others) AS primary_school_others,"
			+ "AVG(v.secondary_dropout_others) AS secondary_dropout_others,"
			+ "SUM(v.children_affected_by_calamities) AS children_affected_by_calamities,"
			+ "SUM(v.street_others) AS street_others"
			+ " from children_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<ChildrenReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
