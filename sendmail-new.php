<?php

if(isset($_POST['regName']) && isset($_POST['regSurname']) && isset($_POST['regMobile']) && isset($_POST['regEmail'])){

    //$to      = 'info@prymetherevolution.com';
    $to      = 'info@porjaigroup.com';
    $subject = 'อีเมลล์ทะเบียนนัดหมายเข้าชมโครงการ';
    $message = 'ทะเบียนนัดหมายเข้าชมโครงการ' . "\r\n";
    $message .= 'ชื่อ: '.$_POST['regName'] . "\r\n";
    $message .= 'นามสกุล: '.$_POST['regSurname'] . "\r\n";
    $message .= 'หมายเลขโทรศัพท์: '.$_POST['regMobile'] . "\r\n";
    $message .= 'อีเมลล์: '.$_POST['regEmail'] . "\r\n";
    $message .= 'จังหวัดที่อยู่ปัจจุบัน: '.$_POST['regStayProvince'] . "\r\n";
    $message .= 'อำเภอที่อยู่ปัจจุบัน: '.$_POST['regStayState'] . "\r\n";
    $message .= 'จังหวัดที่ทำงานปัจจุบัน: '.$_POST['regWorkProvince'] . "\r\n";
    $message .= 'อำเภอที่ทำงานปัจจุบัน: '.$_POST['regWorkState'] . "\r\n";
    $headers = 'From: '.$_POST['regEmail'] . "\r\n" .
        'Reply-To: '.$_POST['regEmail'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        //print $message;

    $a = mail($to, $subject, $message, $headers);

    header("Content-Type: application/json");
    echo json_encode(array("Status" => "Success"));
}

?>