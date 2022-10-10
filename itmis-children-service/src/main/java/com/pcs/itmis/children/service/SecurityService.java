package com.pcs.itmis.children.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pcs.itmis.children.model.Organization;
import com.pcs.itmis.children.model.ResponseWrapperClass;
import com.pcs.itmis.children.utils.RestTemplateConfiguration;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SecurityService {
  @Autowired
  private RestTemplateConfiguration restTemplateConfiguration;

  @Autowired
  private ObjectMapper objectMapper;
  
  @Autowired
  private RestTemplate restTemplate;

  private final String SECURITY_SERVICE_URL = "http://SECURITY-SERVICE/security/";

  public Organization getOrganizationOfLogInUser() throws Exception {
    log.info("Inside getOrganizationOfLogInUser  method of  SecurityService");

    HttpEntity<String> entity = new HttpEntity<>(restTemplateConfiguration.getHeaders());
    ResponseEntity<ResponseWrapperClass> responseEntity = restTemplate.exchange(
        SECURITY_SERVICE_URL + "organizations/by-logged-in-user", HttpMethod.GET, entity, ResponseWrapperClass.class);

    ResponseWrapperClass response = responseEntity.getBody();
    if (response.getMsg().equals("success") && response.getHttpStatus().equals("OK") && response.getData() != null) {
      Organization organization = new Organization();
      organization = objectMapper.readValue(objectMapper.writeValueAsBytes(responseEntity.getBody().getData()),
          Organization.class);
      return organization;

    } else {
      throw new Exception("User Not Found .");
    }
  }
}
