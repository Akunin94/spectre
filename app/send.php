<?php

    $phone = $_POST['phone'];
    
    mail('gromovs1989@gmail.com', 'Заявка с сайта: СПЕКТР', "Телефон: {$phone}");

    header("Location: /");
    die();