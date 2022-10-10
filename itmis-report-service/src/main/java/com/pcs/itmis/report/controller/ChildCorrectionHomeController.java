package com.pcs.itmis.report.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.report.dto.ResponseMessage;
import com.pcs.itmis.report.entity.ChildCorrectionHomeReport;
import com.pcs.itmis.report.entity.ChildHomeReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.ChildCorrectionHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/child-correction-home")
@Slf4j
public class ChildCorrectionHomeController {

	@Autowired
	private ChildCorrectionHomeService reportService;
	
	@PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside Child correction home indicator report");
		List<ChildCorrectionHomeReport> list = new ArrayList();
		try {
			list = reportService.getIndicatorReport(reportParam);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}
}
