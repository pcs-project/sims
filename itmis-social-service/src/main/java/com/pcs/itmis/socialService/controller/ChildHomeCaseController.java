package com.pcs.itmis.socialService.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.socialService.entity.ChildHomeCase;
import com.pcs.itmis.socialService.model.ResponseMessage;
import com.pcs.itmis.socialService.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.socialService.service.ChildHomeCaseService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/social-service/child-home")
@Slf4j
public class ChildHomeCaseController {

	@Autowired
	private ChildHomeCaseService childHomeCaseService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody ChildHomeCase details) {
		try {
			childHomeCaseService.save(details);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(HttpStatus.OK);
	}

	@GetMapping("/")
	public List<ChildHomeCase> getAllList() {
		log.info("Inside get all list");
		return childHomeCaseService.getAllList();
	}

	@GetMapping("/list-by-organization")
	public List<ChildHomeCase> getAllListByOrganization() {
		log.info("Inside get all list by organization");
		return childHomeCaseService.getAllListByOrganization();
	}

	@GetMapping("/{childHomeCaseId}")
	public ChildHomeCase getById(@PathVariable("childHomeCaseId") Long childHomeCaseId) {
		log.info("Inside get childHomeCaseId details");
		return childHomeCaseService.getById(childHomeCaseId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody ChildHomeCase details) {
		log.info("Inside edit ChildHomeCase details");
		childHomeCaseService.update(details);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, childHomeCaseService.getLastSynnchronizedDate()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> getAllDataFromTo(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, childHomeCaseService.getAllDataFromTo(fromDate, toDate)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> updateSynchronizedDate(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside edit Disabled details");

		try {
			childHomeCaseService.updateSynchronizedDate(fromDate, toDate);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	}

}
