package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ChildHomeReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.ChildHomeRepository;

@Service
public class ChildHomeService {

	@Autowired
	private ChildHomeRepository reportRepository;

	public List<ChildHomeReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}
}
