package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.SewaKendraReport;
import com.pcs.itmis.report.repository.SewaKendraRepository;

@Service
public class SewaKendraService {

	@Autowired
	private SewaKendraRepository reportRepository;
	
	public List<SewaKendraReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

}
