package com.pcs.itmis.lookupservice.utils;


public class Success extends ResponseMessage {

    public Success(){
        super(ResponseMsg.success);
    }

    public Success(Object data){
        super(ResponseMsg.success, data);
    }
}

