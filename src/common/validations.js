export const formValidations = {
    Min5Chars: {
      regex: /.{5,}/,
      errorMsg: "Should Min 5 chars",
    },
    Exact10Digits: {
      regex: /^[0-9]{10}$/,
      errorMsg: "Exactly 10 digits",
    },
    OnlyAlpha: {
      regex: /^[a-zA-Z]+$/,
      errorMsg: "Alphabets Only",
    },
    EmailFormat: {
      regex: /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]{2,5}\.[a-z]{2,3}$/,
      errorMsg: "Should be in the Email format",
    },
    OnlyDigits: {
      regex: /^[0-9]+$/,
      errorMsg: "Enter Digits Only",
    },
    SpecialCharsNotAllowed: {
      regex: /^[a-zA-Z0-9]+$/,
      errorMsg: "Special Chars not allowed",
    },
    SholdNotAllowSpaces: {
      regex: /^\S*$/,
      errorMsg: "Should not allow spaces",
    },
    Required: {
      regex: /./,
      errorMsg: "Required!!!",
    },
    Password: {
      regex: /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      errorMsg: "Min 8 chars(min 1L,1U,1S,1D)",
    },
  };

export const fnValidateForm=(inputControlsArr)=>{
    let isFormValid = true;
    const dataObj = {}
    inputControlsArr.forEach((inputControlObj)=>{
        const {isRequired,criteria,value,model} = inputControlObj;
        dataObj[model] = value;
        if(isRequired){ 
            for(let i=0;i<criteria.length;i++){
                const validationObj = formValidations[criteria[i]]
                
                if(!validationObj.regex.test(value)){
                    isFormValid=false;
                  inputControlObj.errorMsg=validationObj.errorMsg;
                  break;
                } 
                if(model=='confirmPwd'){
                  const pwdObj = inputControlsArr.find(({model})=>model=='pwd')
                  if(value !== pwdObj.value){
                    isFormValid=false;
                    inputControlObj.errorMsg="Password Not Match"
                    break;
                  }
                }
              }    
        }

    })
    return[isFormValid,dataObj]
}

export const fnValidate=(inputControlsArr,eve)=>{
    const {name,value,type,checked}=eve.target;
    const inputControlObj = inputControlsArr.find((obj)=>{
      return obj.model==name
    })
    if(type=='checkbox'){
      const checkedItems = inputControlObj.value ? inputControlObj.value.split(",") : []
      if(checked){
        checkedItems.push(value)
      }else{
        checkedItems.splice(checkedItems.indexOf(value),1)
      }
      inputControlObj.value = checkedItems.join()
    }else{
      inputControlObj.value=value;
    }
    
    const {isRequired,criteria} = inputControlObj;
    if(isRequired){
      inputControlObj.errorMsg="";
      for(let i=0;i<criteria.length;i++){
        const validationObj = formValidations[criteria[i]]
        if(!validationObj.regex.test(inputControlObj.value)){
          inputControlObj.errorMsg=validationObj.errorMsg;
          break;
        } 
      }
      if(inputControlObj.model=='confirmPwd'){
        const pwdObj = inputControlsArr.find(({model})=>model=='pwd')
        if(value !== pwdObj.value){
          inputControlObj.errorMsg="Password Not Match"
        }
      }
    }  
  }

export const fnFormReset=(inputControlsArr)=>{
  inputControlsArr.forEach((obj)=>{
    obj.value=""
  })
} 