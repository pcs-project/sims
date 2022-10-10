package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.LabourMigrationReport;
import com.pcs.itmis.report.entity.ReportEntity;

@Repository
public interface LabourMigrationReportRepository extends JpaRepository<ReportEntity, Long> {
	@Query(nativeQuery = true, value = "SELECT \n" + "	SUM(l.male_migrant_labour) AS male_migrant_labour,\n"
			+ "	SUM(l.female_migrant_labour) AS female_migrant_labour,\n"
			+ "	SUM(l.other_migrant_labour) AS other_migrant_labour\n" + "	FROM labour_migration_report_view l \n"
			+ " where l.fiscal_year = '2078-79' ")
	List<LabourMigrationReport> getCumulativeReport();

	@Query(nativeQuery = true, value = "SELECT l.fiscal_year, l.province_id, l.province_desc_eng, \n"
			+ "	l.province_desc_nep, \n" + "	SUM(l.male_migrant_labour) AS male_migrant_labour,\n"
			+ "	SUM(l.female_migrant_labour) AS female_migrant_labour,\n"
			+ "	SUM(l.other_migrant_labour) AS other_migrant_labour\n" + "	FROM labour_migration_report_view l \n"
			+ " where l.fiscal_year = '2078-79' " + "	GROUP BY l.province_id")
	List<LabourMigrationReport> getProvinceWiseReport();

	@Query(nativeQuery = true, value = "select  l.fiscal_year, l.province_id, l.province_desc_eng, "
			+ " l.province_desc_nep, l.district_id, l.district_desc_eng, " + "l.district_desc_nep, "
			+ "	SUM(l.male_migrant_labour) AS male_migrant_labour,\n"
			+ "	SUM(l.female_migrant_labour) AS female_migrant_labour,\n"
			+ "	SUM(l.other_migrant_labour) AS other_migrant_labour\n" + "	FROM labour_migration_report_view l \n"
			+ "WHERE l.province_id =:provinceId" + " AND l.fiscal_year = '2078-79' " + " GROUP BY l.district_id")
	List<LabourMigrationReport> getDistrictWiseReport(@Param("provinceId") String provinceId);

	@Query(nativeQuery = true, value = "select  l.fiscal_year, l.province_id, l.province_desc_eng, "
			+ "l.province_desc_nep, l.district_id, l.district_desc_eng, "
			+ "l.district_desc_nep, l.municipality_id, l.municipality_desc_eng, l.municipality_desc_nep, "
			+ "	SUM(l.male_migrant_labour) AS male_migrant_labour,\n"
			+ "	SUM(l.female_migrant_labour) AS female_migrant_labour,\n"
			+ "	SUM(l.other_migrant_labour) AS other_migrant_labour\n" + "	FROM labour_migration_report_view l \n"
			+ "WHERE l.district_id =:districtId" + " AND l.fiscal_year = '2078-79' " + " GROUP BY l.municipality_id")
	List<LabourMigrationReport> getMunicipalityWiseReport(@Param("districtId") String districtId);

	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.male_returnee_migrant) AS male_returnee_migrant,"
			+ "SUM(v.female_returnee_migrant) AS female_returnee_migrant,"
			+ " SUM(v.other_returnee_migrant) AS other_returnee_migrant,"
			+ " SUM(v.dalit_returnee_migrant) AS dalit_returnee_migrant, "
			+ "SUM(v.ethnic_minorities_returnee_migrant) AS ethnic_minorities_returnee_migrant,"
			+ " SUM(v.janajati_returnee_migrant) AS janajati_returnee_migrant,"
			+ " SUM(v.madhesi_returnee_migrant) AS madhesi_returnee_migrant, "
			+ "SUM(v.brahmin_chettri_returnee_migrant) AS brahmin_chettri_returnee_migrant,"
			+ "SUM(v.muslim_returnee_migrant) AS muslim_returnee_migrant,"
			+ "SUM(v.others_ethnicity_returnee_migrant) AS others_ethnicity_returnee_migrant,"
			+ " SUM(v.internal_migrant_labour) AS internal_migrant_labour,"
			+ " SUM(v.external_migrant_labour) AS external_migrant_labour, "
			+ "SUM(v.male_migrant_labour) AS male_migrant_labour,"
			+ "SUM(v.female_migrant_labour) AS female_migrant_labour,"
			+ " SUM(v.other_migrant_labour) AS other_migrant_labour,"
			+ " SUM(v.dalit_migrant_labour) AS dalit_migrant_labour, "
			+ "SUM(v.ethnic_minorities_migrant_labour) AS ethnic_minorities_migrant_labour,"
			+ "SUM(v.janajati_migrant_labour) AS janajati_migrant_labour,"
			+ "SUM(v.madhesi_migrant_labour) AS madhesi_migrant_labour,"
			+ "SUM(v.brahmin_chettri_migrant_labour) AS brahmin_chettri_migrant_labour,"
			+ "SUM(v.muslim_migrant_labour) AS muslim_migrant_labour,"
			+ "SUM(v.others_ethnicity_migrant_labour) AS others_ethnicity_migrant_labour,"
			+ "SUM(v.male_migrant_to_india) AS male_migrant_to_india,"
			+ "SUM(v.female_migrant_to_india) AS female_migrant_to_india,"
			+ "SUM(v.other_migrant_to_india) AS other_migrant_to_india,"
			+ "SUM(v.dalit_migrant_to_india) AS dalit_migrant_to_india,"
			+ "SUM(v.ethnic_minorities_migrant_to_india) AS ethnic_minorities_migrant_to_india,"
			+ "SUM(v.janajati_migrant_to_india) AS janajati_migrant_to_india,"
			+ "SUM(v.madhesi_migrant_to_india) AS madhesi_migrant_to_india,"
			+ "SUM(v.brahmin_chettri_migrant_to_india) AS brahmin_chettri_migrant_to_india,"
			+ "SUM(v.others_ethnicity_migrant_to_india) AS others_ethnicity_migrant_to_india,"
			+ "SUM(v.muslim_migrant_to_india) AS muslim_migrant_to_india" + " from labour_migration_report_view v "
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<LabourMigrationReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
