

const token = localStorage.getItem("token");
  
 
    
const Allapi= {


    // Login 
    login:'user/login',
    
    token:token,
    port:'http://192.168.29.70:3000/',
    otpapi:'user/otp',
    addmoney:'users/add_money',
    add_money_otp:'users/add_money/otp',
    userread:'users/read',
    dmtotp:'users/dmt/otp',
    dmtcreate:'users/dmt/create',
    dmtread_one:'users/dmt/read_one',
    verify_bank:'users/verify_bank',
    add_bank_account:'users/dmt/add_bank_account/',
    list_section:'users/withdraw/list_section',
    account_list_section:'users/withdraw/account_list_section',
    withdraw_gayway:'users/withdraw/gayway',
    verify_upi:'users/verify_upi',

    delete_bank_account:'users/dmt/delete_bank_account/',

    // CC BILL PAYMENT ....

    send_otp:'users/cc_bill/send_otp',
    crdit_card:'users/cc_bill/credit_card',
    cc_bill_list:'users/cc_bill/list',
    read_one_ccbill:'users/cc_bill/read_one/',

    // Account 
    change_tpin:'users/chnage_tpin',
    change_password:'users/chnage_password',
    user_read:'users/read',
    
    
    // Last Tranction Page 
    tranction_list:'users/transaction/list',
    transction_readone:'users/transaction/read_one/',

    // Transfer
    search:'users/withdraw/search?q=',
    search_fillter:'users/withdraw/list_section?',
    search_benifilist:'users/withdraw/account_list_section',

    // CC Bil Reports 
    email:'users/transaction/mail',
}
export default Allapi