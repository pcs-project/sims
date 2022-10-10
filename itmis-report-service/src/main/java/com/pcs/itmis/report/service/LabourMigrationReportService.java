package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.LabourMigrationReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.LabourMigrationReportRepository;

@Service
public class LabourMigrationReportService {

	@Autowired
	private LabourMigrationReportRepository reportRepository;
	
	public List<LabourMigrationReport> getCumulativeReport() {
		return reportRepository.getCumulativeReport();
	}

	public List<LabourMigrationReport> getProvinceWiseReport() {
		return reportRepository.getProvinceWiseReport();
	}

	public List<LabourMigrationReport> getDistrictWiseReport(String provinceId) {
		return reportRepository.getDistrictWiseReport(provinceId);
	}

	public List<LabourMigrationReport> getMunicipalityWiseReport(String districtId) {
		return reportRepository.getMunicipalityWiseReport(districtId);
	}

	public List<LabourMigrationReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(), 
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

}
