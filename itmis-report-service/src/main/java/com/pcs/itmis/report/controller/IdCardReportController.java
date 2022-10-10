package com.pcs.itmis.report.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.report.dto.ResponseMessage;
import com.pcs.itmis.report.entity.IdCardReport;
import com.pcs.itmis.report.service.IdCardReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/id-card")
@Slf4j
public class IdCardReportController {
	@Autowired
	private IdCardReportService reportService;
	
	@GetMapping("/province-wise")
	public ResponseEntity<?> getProvinceWiseReport() {
		log.info("Inside children report");
		List<IdCardReport> list = new ArrayList();
		try {
			list = reportService.getProvinceWiseReport();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/district-wise/{provinceId}")
	public ResponseEntity<?> getDistrictWiseReport(@PathVariable("provinceId") String provinceId) {
		log.info("Inside complaint reg report");
		List<IdCardReport> list = new ArrayList();
		try {
			list = reportService.getDistrictWiseReport(provinceId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/municipality-wise/{districtId}")
	public ResponseEntity<?> getMunicipalityWiseReport(@PathVariable("districtId") String districtId) {
		log.info("Inside complaint reg report");
		List<IdCardReport> list = new ArrayList();
		try {
			list = reportService.getMunicipalityWiseReport(districtId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}
}
