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
import com.pcs.itmis.report.entity.OldAgeHomeReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.OldAgeHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/old-age-home")
@Slf4j
public class OldAgeHomeController {

	@Autowired
	private OldAgeHomeService reportService;
	
	@PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside old age home indicator report");
		List<OldAgeHomeReport> list = new ArrayList();
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
