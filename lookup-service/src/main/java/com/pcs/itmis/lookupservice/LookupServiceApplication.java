package com.pcs.itmis.lookupservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.client.RestTemplate;

@EnableEurekaClient
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication
public class LookupServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LookupServiceApplication.class, args);
	}
	
	
	@LoadBalanced
	  public RestTemplate restTemplate() {
	    return new RestTemplate();
	  }

}
