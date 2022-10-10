package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ChildCorrectionHomeReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.ChildCorrectionHomeRepository;

@Service
public class ChildCorrectionHomeService {

	@Autowired
	private ChildCorrectionHomeRepository reportRepository;

	public List<ChildCorrectionHomeReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}
}
