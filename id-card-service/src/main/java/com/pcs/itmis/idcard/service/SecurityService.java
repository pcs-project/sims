package com.pcs.itmis.idcard.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pcs.itmis.idcard.dto.Organization;
import com.pcs.itmis.idcard.dto.ResponseWrapperClass;
import com.pcs.itmis.idcard.dto.User;
import com.pcs.itmis.idcard.utilities.IdCardConstants;
import com.pcs.itmis.idcard.utilities.RestTemplateConfiguration;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SecurityService {

	@Autowired
	private RestTemplateConfiguration restTemplateConfiguration;
	
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private ObjectMapper objectMapper;


	public User getUserDetails() throws Exception {
		log.info("Inside getUserDetails  method of  SecurityService");
		
		HttpEntity<String> entity = new HttpEntity<>(restTemplateConfiguration.getHeaders());
		ResponseEntity<ResponseWrapperClass> responseEntity = restTemplate.exchange(IdCardConstants.SECURITY_SERVICE + "users/1" ,
				HttpMethod.GET, entity, ResponseWrapperClass.class);
	
		ResponseWrapperClass response = responseEntity.getBody();
		if (response.getMsg().equals("success") && response.getHttpStatus().equals("OK")
				&& response.getData() != null) {
			User user = new User();
			user = objectMapper.readValue(objectMapper.writeValueAsBytes(responseEntity.getBody().getData()), User.class);
			return user;
		
		} else {
			throw new Exception("User Not Found .");
		}
		
	}
	
	
	public Organization getOrganizationOfLogInUser() throws Exception {
		log.info("Inside getOrganizationOfLogInUser  method of  SecurityService");
		
		HttpEntity<String> entity = new HttpEntity<>(restTemplateConfiguration.getHeaders());
		ResponseEntity<ResponseWrapperClass> responseEntity = restTemplate.exchange(IdCardConstants.SECURITY_SERVICE + "organizations/by-logged-in-user" ,
				HttpMethod.GET, entity, ResponseWrapperClass.class);
	
		ResponseWrapperClass response = responseEntity.getBody();
		if (response.getMsg().equals("success") && response.getHttpStatus().equals("OK")
				&& response.getData() != null) {
			Organization organization = new Organization();
			organization = objectMapper.readValue(objectMapper.writeValueAsBytes(responseEntity.getBody().getData()), Organization.class);
			return organization;
		
		} else {
			throw new Exception("User Not Found .");
		}

		
		

		
	}
	
}
