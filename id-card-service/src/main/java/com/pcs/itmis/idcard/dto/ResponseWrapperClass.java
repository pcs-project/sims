package com.pcs.itmis.idcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseWrapperClass<T> {
	
	

	private String msg;
	
	private String httpStatus;
	
	private T data;


}
