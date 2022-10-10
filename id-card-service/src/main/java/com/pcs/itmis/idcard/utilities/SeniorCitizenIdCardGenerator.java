package com.pcs.itmis.idcard.utilities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.LongType;
import org.hibernate.type.Type;

import com.pcs.itmis.idcard.entity.DisabledIdCard;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCard;

public class SeniorCitizenIdCardGenerator extends SequenceStyleGenerator{
	public static final String DATE_FORMAT_PARAMETER = "dateFormat";
    public static final String DATE_FORMAT_DEFAULT = "%tY";
     
    public static final String NUMBER_FORMAT_PARAMETER = "numberFormat";
    public static final String NUMBER_FORMAT_DEFAULT = "%07d";
     
    public static final String DATE_NUMBER_SEPARATOR_PARAMETER = "dateNumberSeparator";
    public static final String DATE_NUMBER_SEPARATOR_DEFAULT = "_";
    

     
    private String dateNumberSeparator;
    private String dateFormat;
    private String numberFormat;
   

	@Override
	public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
		// TODO Auto-generated method stub
	    super.configure(LongType.INSTANCE, params, serviceRegistry);
	    
	   
	    dateFormat = ConfigurationHelper.getString(DATE_FORMAT_PARAMETER, params, DATE_FORMAT_DEFAULT).replace("%", "%1"); 
        numberFormat = ConfigurationHelper.getString(NUMBER_FORMAT_PARAMETER, params, NUMBER_FORMAT_DEFAULT); 
        dateNumberSeparator = ConfigurationHelper.getString(DATE_NUMBER_SEPARATOR_PARAMETER, params, DATE_NUMBER_SEPARATOR_DEFAULT); 
      //  this.format = dateFormat+dateNumberSeparator+numberFormat; 	 
	}

	@Override
	public Serializable generate(SharedSessionContractImplementor session,
            Object object) throws HibernateException {
	       
		return String.format(dateFormat, LocalDate.now(), super.generate(session, object))   + DATE_NUMBER_SEPARATOR_DEFAULT +
				((SeniorCitizenIdCard)object).getSeniorCitizenAddressDetails().getDistrict() +DATE_NUMBER_SEPARATOR_DEFAULT +((SeniorCitizenIdCard)object).getSeniorCitizenAddressDetails().getMunicipality() +	 dateNumberSeparator+
				String.format(numberFormat, super.generate(session, object))  ;
    }
    
    
    
     


}