package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.DisabledReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.DisabledReportRepository;

@Service
public class DisabledReportService {

	@Autowired
	private DisabledReportRepository reportRepository;

	public List<DisabledReport> getProvinceWiseDisabledReport() {
		return reportRepository.getProvinceWiseDisabledReport();
	}

	public List<DisabledReport> getDistrictWiseDisabledReport(String provinceId) {
		return reportRepository.getDistrictWiseDisabledReport(provinceId);
	}

	public List<DisabledReport> getMunicipalityWiseDisabledReport(String districtId) {
		return reportRepository.getMunicipalityWiseDisabledReport(districtId);
	}

	public List<DisabledReport> getCumulativeDisabledReport() {
		return reportRepository.getCumulativeDisabledReport();
	}

	public List<DisabledReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(), 
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

}
