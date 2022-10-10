package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.ShelterHomeReport;
import com.pcs.itmis.report.repository.ShelterHomeReportRepository;

@Service
public class ShelterHomeReportService {
	@Autowired
	private ShelterHomeReportRepository reportRepository;

	public List<ShelterHomeReport> getCumulativeReport() {
		return reportRepository.getCumulativeReport();
	}
	
	public List<ShelterHomeReport> getProvinceWiseReport() {
		return reportRepository.getProvinceWiseReport();
	}

	public List<ShelterHomeReport> getDistrictWiseReport(String provinceId) {
		return reportRepository.getDistrictWiseReport(provinceId);
	}

	public List<ShelterHomeReport> getMunicipalityWiseReport(String districtId) {
		return reportRepository.getMunicipalityWiseReport(districtId);
	}

	public List<ShelterHomeReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

}
