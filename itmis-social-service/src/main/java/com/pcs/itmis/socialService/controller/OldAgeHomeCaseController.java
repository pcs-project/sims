package com.pcs.itmis.socialService.controller;

import java.util.List;

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

import com.pcs.itmis.socialService.entity.OldAgeHomeCase;
import com.pcs.itmis.socialService.service.OldAgeHomeCaseService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/social-service/old-age-home")
@Slf4j
public class OldAgeHomeCaseController {

	@Autowired
	private OldAgeHomeCaseService oldAgeHomeCaseService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody OldAgeHomeCase details) {
		try {
			oldAgeHomeCaseService.save(details);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(HttpStatus.OK);
	}

	@GetMapping("/")
	public List<OldAgeHomeCase> getAllList() {
		log.info("Inside get all list");
		return oldAgeHomeCaseService.getAllList();
	}

	@GetMapping("/list-by-organization")
	public List<OldAgeHomeCase> getAllListByOrganization() {
		log.info("Inside get all list by organization");
		return oldAgeHomeCaseService.getAllListByOrganization();
	}

	@GetMapping("/{oldAgeHomeCaseId}")
	public OldAgeHomeCase getById(@PathVariable("oldAgeHomeCaseId") Long oldAgeHomeCaseId) {
		log.info("Inside get OldAgeHomeCaseId details");
		return oldAgeHomeCaseService.getById(oldAgeHomeCaseId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody OldAgeHomeCase details) {
		log.info("Inside edit OldAgeHomeCase details");
		oldAgeHomeCaseService.update(details);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
