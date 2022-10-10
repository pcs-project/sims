package com.pcs.itmis.childHome.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage {
	
	public enum ResponseMsg { success, error}
	
	private String msg;
	private HttpStatus httpStatus;
	private Object data;
	
	public ResponseMessage() {
		this.msg = ResponseMsg.success.toString();
		this.httpStatus = HttpStatus.OK;
	}
	
	public ResponseMessage(ResponseMsg msg) {
		this.msg = msg.toString();
		this.httpStatus = HttpStatus.OK;
	}

	public ResponseMessage(ResponseMsg msg, Object data) {
		this.msg = msg.toString();
		this.httpStatus = HttpStatus.OK;
		this.data = data;
	}
	
	public ResponseMessage(String msg) {
		this.msg = msg;
		this.httpStatus = HttpStatus.OK;
	}
	
	public ResponseMessage(String msg, HttpStatus httpStatus) {
		this.msg = msg;
		this.httpStatus = httpStatus;
	}
	
	public ResponseMessage(ResponseMsg msg, HttpStatus httpStatus) {
		this.msg = msg.toString();
		this.httpStatus = httpStatus;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	
}