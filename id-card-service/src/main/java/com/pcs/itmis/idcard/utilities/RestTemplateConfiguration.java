package com.pcs.itmis.idcard.utilities;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class RestTemplateConfiguration {
	
	
	@Autowired
	private HttpServletRequest httpServletRequest;

	
	public HttpHeaders getHeaders() {
		log.info("inside HttpHeaders Method  of RestTemplateConfiguration" );
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", httpServletRequest.getHeader("Authorization"));
        return headers;
	}


}
