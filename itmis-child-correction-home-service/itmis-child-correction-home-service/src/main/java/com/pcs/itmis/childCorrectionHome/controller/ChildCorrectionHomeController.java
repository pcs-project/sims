package com.pcs.itmis.childCorrectionHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.childCorrectionHome.entity.ChildCorrectionHome;
import com.pcs.itmis.childCorrectionHome.service.ChildCorrectionHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/child-correction-home")
@Slf4j
public class ChildCorrectionHomeController {

  @Autowired
  private ChildCorrectionHomeService childCorrectionHomeService;
  
  @PostMapping("/")
  public ResponseEntity<?> save(@RequestBody ChildCorrectionHome childCorrectionHome){
    log.info("Inside save ChildCorrectionHome details");
    childCorrectionHomeService.save(childCorrectionHome);
    return new ResponseEntity<>(HttpStatus.OK);
  }
  
  @GetMapping("/{fiscalYear}/{quarter}")
  public ChildCorrectionHome getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
      @PathVariable("quarter") String quarter){
    log.info("Inside get ChildCorrectionHome details");
    return childCorrectionHomeService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
  }
  
  @GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
  public ChildCorrectionHome getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
      @PathVariable("quarter") String quarter,
      @PathVariable("organizationId") Long organizationId){
    log.info("Inside get ChildCorrectionHome details");
    return childCorrectionHomeService.getDataByOrganization(fiscalYear, quarter,organizationId);
  }
  
  @PutMapping("/")
  public ResponseEntity<?> update(@RequestBody ChildCorrectionHome nDetails){
    log.info("Inside edit ChildCorrectionHome details");
    childCorrectionHomeService.update(nDetails);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
