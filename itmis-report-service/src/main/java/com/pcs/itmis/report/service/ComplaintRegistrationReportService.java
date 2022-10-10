package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ComplaintRegistrationReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.ComplaintRegistrationReportRepository;

@Service
public class ComplaintRegistrationReportService {

	@Autowired
	private ComplaintRegistrationReportRepository reportRepository;
	
	public List<ComplaintRegistrationReport> getCumulativeReport() {
		return reportRepository.getCumulativeReport();
	}
	
	public List<ComplaintRegistrationReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

	public List<ComplaintRegistrationReport> getProvinceWiseReport() {
		return reportRepository.getProvinceWiseReport();
	}

	public List<ComplaintRegistrationReport> getDistrictWiseReport(String provinceId) {
		return reportRepository.getDistrictWiseReport(provinceId);
	}

	public List<ComplaintRegistrationReport> getMunicipalityWiseReport(String districtId) {
		return reportRepository.getMunicipalityWiseReport(districtId);
	}

}
