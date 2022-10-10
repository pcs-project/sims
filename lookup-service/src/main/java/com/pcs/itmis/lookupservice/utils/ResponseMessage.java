package com.pcs.itmis.lookupservice.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

/**
 * @author Saman
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage {

	public enum ResponseMsg { success, error}

	private String msg;
	private String error_description;
	private HttpStatus httpStatus;
	private Object data;
	private String code;

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
	
	public ResponseMessage(String msg, HttpStatus httpStatus,String error_description) {
		this.msg = msg;
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getError_description() {
		return msg;
	}
}

