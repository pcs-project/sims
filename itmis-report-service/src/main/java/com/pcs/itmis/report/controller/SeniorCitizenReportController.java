package com.pcs.itmis.report.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.report.dto.ResponseMessage;
import com.pcs.itmis.report.entity.ChildrenReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.SeniorCitizenReport;
import com.pcs.itmis.report.service.SeniorCitizenReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/senior-citizen")
@Slf4j
public class SeniorCitizenReportController {

  @Autowired
  private SeniorCitizenReportService reportService;
  
  @GetMapping("/cumulative")
  public ResponseEntity<?> getSeniorCitizenCumulativeReport(){
    log.info("Inside SeniorCitizen report");
    List<SeniorCitizenReport> list =  new ArrayList();
    try {
      list = reportService.getSeniorCitizenCumulativeReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/province-wise")
  public ResponseEntity<?> getProvinceWiseSeniorCitizenReport(){
    log.info("Inside SeniorCitizen report");
    List<SeniorCitizenReport> list =  new ArrayList();
    try {
      list = reportService.getProvinceWiseSeniorCitizenReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/district-wise/{provinceId}")
  public ResponseEntity<?> getDistrictWiseSeniorCitizenReport(
      @PathVariable("provinceId") String provinceId){
    log.info("Inside SeniorCitizen report");
    List<SeniorCitizenReport> list =  new ArrayList();
    try {
      list = reportService.getDistrictWiseSeniorCitizenReport(provinceId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/municipality-wise/{districtId}")
  public ResponseEntity<?> getMunicipalityWiseSeniorCitizenReport(
      @PathVariable("districtId") String districtId){
    log.info("Inside SeniorCitizen report");
    List<SeniorCitizenReport> list =  new ArrayList();
    try {
      list = reportService.getMunicipalityWiseSeniorCitizenReport(districtId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside SeniorCitizen indicator report");
		List<SeniorCitizenReport> list = new ArrayList();
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
